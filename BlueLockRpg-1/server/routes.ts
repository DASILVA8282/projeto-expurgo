import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertUserSchema, insertCharacterSchema, updateCharacterSchema, insertWildCardInvitationSchema, updateWildCardInvitationSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import session from "express-session";
import connectPg from "connect-pg-simple";

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  const pgStore = connectPg(session);
  app.use(session({
    store: new pgStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "blue-lock-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }));

  // Authentication middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  const requireAdmin = async (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const user = await storage.getUser(req.session.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    
    next();
  };



  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }



      const user = await storage.createUser(userData);
      req.session.userId = user.id;
      
      // Don't send password back
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ message: "Invalid registration data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.userId = user.id;
      
      // Don't send password back
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/user", requireAuth, async (req, res) => {
    try {
      const user = await storage.getUserWithCharacter(req.session.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't send password back
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Character routes
  app.post("/api/characters", requireAuth, async (req, res) => {
    try {
      const characterData = insertCharacterSchema.parse({
        ...req.body,
        userId: req.session.userId,
      });

      // Check if user already has a character
      const existingCharacter = await storage.getCharacter(req.session.userId!);
      if (existingCharacter) {
        return res.status(400).json({ message: "Character already exists for this user" });
      }

      const character = await storage.createCharacter(characterData);
      res.json(character);
    } catch (error) {
      console.error("Create character error:", error);
      res.status(400).json({ message: "Invalid character data" });
    }
  });

  app.put("/api/characters", requireAuth, async (req, res) => {
    try {
      const updates = updateCharacterSchema.parse(req.body);
      
      // Check if character exists
      const existingCharacter = await storage.getCharacter(req.session.userId!);
      if (!existingCharacter) {
        return res.status(404).json({ message: "Character not found" });
      }

      const character = await storage.updateCharacter(req.session.userId!, updates);
      res.json(character);
    } catch (error) {
      console.error("Update character error:", error);
      res.status(400).json({ message: "Invalid character data" });
    }
  });

  app.get("/api/characters/me", requireAuth, async (req, res) => {
    try {
      const character = await storage.getCharacter(req.session.userId!);
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }
      res.json(character);
    } catch (error) {
      console.error("Get character error:", error);
      res.status(500).json({ message: "Failed to get character" });
    }
  });

  // Admin routes
  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsersWithCharacters();
      // Remove passwords from response
      const usersWithoutPasswords = users.map(({ password, ...user }) => user);
      res.json(usersWithoutPasswords);
    } catch (error) {
      console.error("Get all users error:", error);
      res.status(500).json({ message: "Failed to get users" });
    }
  });

  app.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsersWithCharacters();
      const activeUsers = users.filter(u => u.character);
      const totalMatches = users.reduce((sum, u) => sum + (u.character?.matches || 0), 0);
      const totalGoals = users.reduce((sum, u) => sum + (u.character?.goals || 0), 0);

      res.json({
        totalPlayers: users.length,
        activePlayers: activeUsers.length,
        matchesToday: Math.floor(Math.random() * 10) + 1, // Mock value
        totalGoals,
      });
    } catch (error) {
      console.error("Get admin stats error:", error);
      res.status(500).json({ message: "Failed to get stats" });
    }
  });

  // Admin rank management
  app.patch("/api/admin/character/:userId/rank", requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { newRank } = req.body;

      if (!newRank || newRank < 1 || newRank > 300) {
        return res.status(400).json({ message: "Rank deve ser entre 1 e 300" });
      }

      const character = await storage.updateCharacter(userId, { ranking: newRank });
      res.json(character);
    } catch (error) {
      console.error("Update rank error:", error);
      res.status(500).json({ message: "Failed to update rank" });
    }
  });

  // Auto-rank calculation based on stats
  app.post("/api/admin/character/:userId/calculate-rank", requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const character = await storage.getCharacter(userId);
      
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }

      // Calculate rank based on total stats, level, goals, etc.
      const totalStats = character.speed + character.strength + character.stamina + 
                        character.shooting + character.passing + character.dribbling;
      const levelBonus = character.level * 10;
      const goalBonus = character.goals * 5;
      const matchBonus = character.matches * 2;
      
      const score = totalStats + levelBonus + goalBonus + matchBonus;
      
      // Convert score to ranking (higher score = lower ranking number)
      let newRank = Math.max(1, Math.min(300, 300 - Math.floor(score / 20)));
      
      const updatedCharacter = await storage.updateCharacter(userId, { ranking: newRank });
      res.json(updatedCharacter);
    } catch (error) {
      console.error("Calculate rank error:", error);
      res.status(500).json({ message: "Failed to calculate rank" });
    }
  });

  // Wild Card routes
  app.get("/api/admin/eliminated-characters", requireAdmin, async (req, res) => {
    try {
      const eliminatedCharacters = await storage.getEliminatedCharacters();
      res.json(eliminatedCharacters);
    } catch (error) {
      console.error("Get eliminated characters error:", error);
      res.status(500).json({ message: "Failed to get eliminated characters" });
    }
  });

  app.post("/api/admin/wildcard/invite", requireAdmin, async (req, res) => {
    try {
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Check if user exists and has an eliminated character
      const user = await storage.getUserWithCharacter(userId);
      if (!user || !user.character || !user.character.isEliminated) {
        return res.status(400).json({ message: "User not found or character not eliminated" });
      }

      let invitation;
      
      // Check if invitation already exists
      const existingInvitation = await storage.getWildCardInvitation(userId);
      if (existingInvitation) {
        // Update existing invitation to pending status (resend)
        invitation = await storage.updateWildCardInvitation(userId, { 
          status: "pending",
          respondedAt: null 
        });
      } else {
        // Create new invitation
        invitation = await storage.createWildCardInvitation({ userId, status: "pending" });
      }
      
      // Send WebSocket notification to the user
      broadcastToUser(userId, {
        type: "wildcard_invitation",
        message: "Você foi convidado para o Wild Card!"
      });

      res.json(invitation);
    } catch (error) {
      console.error("Create wild card invitation error:", error);
      res.status(500).json({ message: "Failed to create invitation" });
    }
  });

  app.post("/api/wildcard/respond", requireAuth, async (req, res) => {
    try {
      const { response } = req.body; // "accepted" or "rejected"
      
      if (!response || !["accepted", "rejected"].includes(response)) {
        return res.status(400).json({ message: "Invalid response" });
      }

      const invitation = await storage.getWildCardInvitation(req.session.userId!);
      if (!invitation) {
        return res.status(404).json({ message: "No invitation found" });
      }

      if (invitation.status !== "pending") {
        return res.status(400).json({ message: "Invitation already responded to" });
      }

      const updatedInvitation = await storage.updateWildCardInvitation(req.session.userId!, { status: response });
      res.json(updatedInvitation);
    } catch (error) {
      console.error("Respond to wild card invitation error:", error);
      res.status(500).json({ message: "Failed to respond to invitation" });
    }
  });

  app.get("/api/wildcard/invitation", requireAuth, async (req, res) => {
    try {
      const invitation = await storage.getWildCardInvitation(req.session.userId!);
      res.json(invitation);
    } catch (error) {
      console.error("Get wild card invitation error:", error);
      res.status(500).json({ message: "Failed to get invitation" });
    }
  });

  app.get("/api/admin/wildcard/invitations", requireAdmin, async (req, res) => {
    try {
      const invitations = await storage.getAllWildCardInvitations();
      res.json(invitations);
    } catch (error) {
      console.error("Get all wild card invitations error:", error);
      res.status(500).json({ message: "Failed to get invitations" });
    }
  });

  app.patch("/api/admin/character/:userId/eliminate", requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      // Check if character exists
      const character = await storage.getCharacter(userId);
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }
      
      // Check if already eliminated
      if (character.isEliminated) {
        return res.status(400).json({ message: "Character already eliminated" });
      }
      
      const updatedCharacter = await storage.updateCharacter(userId, { isEliminated: true });
      res.json(updatedCharacter);
    } catch (error) {
      console.error("Eliminate character error:", error);
      res.status(500).json({ message: "Failed to eliminate character" });
    }
  });

  const httpServer = createServer(app);
  
  // WebSocket setup
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  // Store WebSocket connections by user ID
  const userConnections = new Map<number, WebSocket>();
  
  wss.on('connection', (ws, req) => {
    console.log('New WebSocket connection');
    
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        
        if (data.type === 'auth' && data.userId) {
          userConnections.set(data.userId, ws);
          console.log(`User ${data.userId} connected via WebSocket`);
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });
    
    ws.on('close', () => {
      // Remove connection from map when user disconnects
      for (const [userId, connection] of userConnections.entries()) {
        if (connection === ws) {
          userConnections.delete(userId);
          break;
        }
      }
    });
  });
  
  // Function to broadcast message to specific user
  function broadcastToUser(userId: number, message: any) {
    const connection = userConnections.get(userId);
    if (connection && connection.readyState === WebSocket.OPEN) {
      connection.send(JSON.stringify(message));
    }
  }
  
  return httpServer;
}
