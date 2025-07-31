import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import multer from "multer";
import path from "path";
import express from "express";
import fs from "fs";
import { storage } from "./storage";
import { insertUserSchema, insertCharacterSchema, updateCharacterSchema, insertWildCardInvitationSchema, updateWildCardInvitationSchema, insertMatchSchema, updateMatchSchema, insertGoalSchema } from "@shared/schema";
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
    secret: process.env.SESSION_SECRET || "expurgo-secret-key-2025",
    resave: false,
    saveUninitialized: false,
    rolling: true, // Reset expiry on activity
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: false, // Allow JavaScript access for debugging
      secure: false, // Set to true in production with HTTPS
      httpOnly: false, // Allow JavaScript access for debugging
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'lax', // Better cross-site support
      domain: undefined, // Don't set domain for localhost
    },
  }));

  // Ensure uploads directories exist
  const uploadsDir = 'public/uploads/avatars';
  const musicUploadsDir = 'public/uploads';
  
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log("Created uploads directory:", uploadsDir);
  }
  
  if (!fs.existsSync(musicUploadsDir)) {
    fs.mkdirSync(musicUploadsDir, { recursive: true });
    console.log("Created music uploads directory:", musicUploadsDir);
  }

  // Multer configuration for file uploads
  const storage_multer = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("Multer destination check - uploads dir exists:", fs.existsSync(uploadsDir));
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = 'avatar-' + uniqueSuffix + path.extname(file.originalname);
      console.log("Generated filename:", filename);
      cb(null, filename);
    }
  });

  const upload = multer({ 
    storage: storage_multer,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
      console.log("File filter check:", { mimetype: file.mimetype, originalname: file.originalname });
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
      } else {
        const error = new Error('Apenas imagens PNG e JPEG são permitidas');
        error.code = 'INVALID_FILE_TYPE';
        cb(error);
      }
    }
  });

  // Separate multer configuration for audio files
  const audioStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("Audio multer destination check - uploads dir exists:", fs.existsSync(musicUploadsDir));
      cb(null, musicUploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = 'music-' + uniqueSuffix + path.extname(file.originalname);
      console.log("Generated audio filename:", filename);
      cb(null, filename);
    }
  });

  const uploadAudio = multer({
    storage: audioStorage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for audio
    fileFilter: (req, file, cb) => {
      console.log("Audio file filter check:", { mimetype: file.mimetype, originalname: file.originalname });
      const allowedTypes = [
        'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 
        'audio/m4a', 'audio/aac', 'audio/flac', 'audio/webm'
      ];
      if (allowedTypes.includes(file.mimetype) || file.originalname.toLowerCase().endsWith('.mp3')) {
        cb(null, true);
      } else {
        const error = new Error('Apenas arquivos de áudio são permitidos (MP3, WAV, OGG, M4A, AAC, FLAC)');
        error.code = 'INVALID_FILE_TYPE';
        cb(error);
      }
    }
  });

  // Serve static files from uploads directory with proper MIME types
  app.use('/uploads', express.static('public/uploads', {
    setHeaders: (res, filePath) => {
      // Set proper MIME types for audio files
      if (filePath.endsWith('.mp3')) {
        res.setHeader('Content-Type', 'audio/mpeg');
      } else if (filePath.endsWith('.wav')) {
        res.setHeader('Content-Type', 'audio/wav');
      } else if (filePath.endsWith('.ogg')) {
        res.setHeader('Content-Type', 'audio/ogg');
      } else if (filePath.endsWith('.m4a')) {
        res.setHeader('Content-Type', 'audio/mp4');
      } else if (filePath.endsWith('.aac')) {
        res.setHeader('Content-Type', 'audio/aac');
      } else if (filePath.endsWith('.flac')) {
        res.setHeader('Content-Type', 'audio/flac');
      }
      
      // CORS headers for audio files
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Range, Content-Type');
      res.setHeader('Accept-Ranges', 'bytes');
      
      // Cache control for audio files
      if (filePath.match(/\.(mp3|wav|ogg|m4a|aac|flac)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
      }
    }
  }));

  // Authentication middleware
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  const requireAdmin = async (req: any, res: any, next: any) => {
    try {
      console.log("Admin check - Session userId:", req.session.userId);
      console.log("Admin check - Session data:", JSON.stringify(req.session, null, 2));

      if (!req.session.userId) {
        console.log("Admin check - No userId in session");
        return res.status(401).json({ message: "Unauthorized - No session" });
      }

      const user = await storage.getUser(req.session.userId);
      console.log("Admin check - User found:", user ? { id: user.id, username: user.username, isAdmin: user.isAdmin } : "not found");

      if (!user) {
        console.log("Admin check - User not found in database");
        return res.status(401).json({ message: "User not found" });
      }

      if (!user.isAdmin) {
        console.log("Admin check - User is not admin");
        return res.status(403).json({ message: "Admin access required" });
      }

      console.log("Admin check - Success, user is admin");
      next();
    } catch (error) {
      console.error("Admin check error:", error);
      return res.status(500).json({ message: "Authentication error" });
    }
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
      console.log("Get user - Session userId:", req.session.userId);
      const user = await storage.getUserWithCharacter(req.session.userId!);
      console.log("Get user - Found user:", user ? { id: user.id, username: user.username, isAdmin: user.isAdmin } : "not found");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Don't send password back
      const { password, ...userWithoutPassword } = user;
      console.log("Get user - Sending user data:", { id: userWithoutPassword.id, username: userWithoutPassword.username, isAdmin: userWithoutPassword.isAdmin });
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  app.post("/api/auth/mark-cesar-seen", requireAuth, async (req, res) => {
    try {
      await storage.markCesarMonitorSeen(req.session.userId!);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking César monitor as seen:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Avatar upload route
  app.post("/api/characters/avatar", upload.single('avatar'), async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const userId = req.session.userId;
      console.log(`Avatar upload request from user ${userId}`);

      // Check if character exists
      const character = await storage.getCharacter(userId);
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ 
          message: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed." 
        });
      }

      // Validate file size (5MB limit)
      if (req.file.size > 5 * 1024 * 1024) {
        return res.status(400).json({ 
          message: "File too large. Maximum size is 5MB." 
        });
      }

      console.log("File upload details:", {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        filename: req.file.filename
      });

      // Update character with avatar URL
      const avatarUrl = `/uploads/${req.file.filename}`;
      await storage.updateCharacter(userId, { avatar: avatarUrl });

      console.log(`Avatar updated successfully for user ${userId}: ${avatarUrl}`);

      res.json({ 
        message: "Avatar uploaded successfully",
        avatarUrl: avatarUrl
      });

    } catch (error) {
      console.error("Avatar upload error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Debug route to test audio file access
  app.get("/api/debug/audio/:filename", async (req, res) => {
    try {
      const filename = req.params.filename;
      const filePath = path.join('public/uploads', filename);
      
      console.log('🎵 Debug: Testing audio file access');
      console.log('🎵 Filename:', filename);
      console.log('🎵 Full path:', filePath);
      console.log('🎵 File exists:', fs.existsSync(filePath));
      
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        res.json({
          exists: true,
          size: stats.size,
          path: filePath,
          url: `/uploads/${filename}`
        });
      } else {
        res.status(404).json({
          exists: false,
          path: filePath,
          url: `/uploads/${filename}`
        });
      }
    } catch (error) {
      console.error('🎵 Debug audio error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Test route to serve MP3 directly
  app.get("/api/test-audio/:filename", async (req, res) => {
    try {
      const filename = req.params.filename;
      const filePath = path.join('public/uploads', filename);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
      }
      
      const stats = fs.statSync(filePath);
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', stats.size);
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    } catch (error) {
      console.error('🎵 Test audio error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Flow music upload endpoint
  app.post("/api/characters/flow-music", uploadAudio.single('flowMusic'), async (req, res) => {
    try {
      if (!req.session?.userId) {
        return res.status(401).json({ message: "Authentication required" });
      }

      const userId = req.session.userId;
      console.log(`Flow music upload request from user ${userId}`);

      // Check if character exists
      const character = await storage.getCharacter(userId);
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Validate file type
      const allowedTypes = [
        'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 
        'audio/m4a', 'audio/aac', 'audio/flac', 'audio/webm'
      ];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ 
          message: "Invalid file type. Only MP3, WAV, OGG, M4A, AAC, and FLAC are allowed." 
        });
      }

      // Validate file size (10MB limit)
      if (req.file.size > 10 * 1024 * 1024) {
        return res.status(400).json({ 
          message: "File too large. Maximum size is 10MB." 
        });
      }

      console.log("Flow music upload details:", {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        filename: req.file.filename
      });

      // Update character with flow music URL
      const flowMusicUrl = `/uploads/${req.file.filename}`;
      await storage.updateCharacter(userId, { flowMusicUrl: flowMusicUrl });

      console.log(`Flow music updated successfully for user ${userId}: ${flowMusicUrl}`);

      res.json({ 
        message: "Flow music uploaded successfully",
        flowMusicUrl: flowMusicUrl
      });

    } catch (error) {
      console.error("Flow music upload error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Public ranking route
  app.get("/api/ranking/public", requireAuth, async (req, res) => {
    try {
      const users = await storage.getAllUsersWithCharacters();
      // Filter only users with characters, exclude admins, and remove passwords
      const usersWithCharacters = users
        .filter(user => user.character && !user.isAdmin)
        .map(({ password, ...user }) => user)
        .sort((a, b) => (a.character?.ranking || 300) - (b.character?.ranking || 300));
      res.json(usersWithCharacters);
    } catch (error) {
      console.error("Get public ranking error:", error);
      res.status(500).json({ message: "Failed to get ranking" });
    }
  });

  // Character routes
  app.post("/api/characters", requireAuth, async (req, res) => {
    try {
      console.log("=== RENDER DEBUG: CHARACTER CREATION ===");
      console.log("Environment:", process.env.NODE_ENV);
      console.log("Database URL exists:", !!process.env.DATABASE_URL);
      console.log("User ID from session:", req.session.userId);
      console.log("Received character data:", req.body);

      // Check if user already has a character first
      const existingCharacter = await storage.getCharacter(req.session.userId!);
      if (existingCharacter) {
        console.log("RENDER DEBUG: Character already exists for user");
        return res.status(400).json({ message: "Character already exists for this user" });
      }

      const characterData = insertCharacterSchema.parse({
        ...req.body,
        userId: req.session.userId,
      });

      // Auto-assign random ranking between 250-300 ONLY for new characters
      const randomRanking = Math.floor(Math.random() * 51) + 250; // 250-300
      characterData.ranking = randomRanking;

      console.log("Parsed character data with auto-ranking:", characterData);
      console.log("RENDER DEBUG: Assigning random ranking:", randomRanking);

      console.log("RENDER DEBUG: Creating character in database...");
      const character = await storage.createCharacter(characterData);
      console.log("RENDER DEBUG: Character created successfully with ranking:", character.ranking);
      res.json(character);
    } catch (error) {
      console.error("=== RENDER DEBUG: CREATE CHARACTER ERROR ===");
      console.error("Create character error:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      res.status(400).json({ message: "Invalid character data", error: (error as Error)?.message || 'Unknown error' });
    }
  });

  app.patch("/api/characters/me", requireAuth, async (req, res) => {
    try {
      console.log("=== RENDER DEBUG: CHARACTER UPDATE ===");
      console.log("Environment:", process.env.NODE_ENV);
      console.log("User ID from session:", req.session.userId);
      console.log("Received update data:", req.body);

      const updates = updateCharacterSchema.parse(req.body);
      console.log("Parsed update data:", updates);

      // Check if character exists
      console.log("RENDER DEBUG: Checking if character exists...");
      const existingCharacter = await storage.getCharacter(req.session.userId!);
      if (!existingCharacter) {
        console.log("RENDER DEBUG: Character not found for user");
        return res.status(404).json({ message: "Character not found" });
      }

      console.log("RENDER DEBUG: Updating character in database...");
      const character = await storage.updateCharacter(req.session.userId!, updates);
      console.log("RENDER DEBUG: Character updated successfully:", character);
      res.json(character);
    } catch (error) {
      console.error("=== RENDER DEBUG: UPDATE CHARACTER ERROR ===");
      console.error("Update character error:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      res.status(400).json({ message: "Invalid character data", error: (error as Error)?.message || 'Unknown error' });
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

  // Get all matches for admin
  app.get("/api/admin/matches", requireAdmin, async (req, res) => {
    try {
      const matches = await storage.getAllMatches();
      res.json(matches);
    } catch (error) {
      console.error("Get all matches error:", error);
      res.status(500).json({ message: "Failed to get matches" });
    }
  });

  // Get users with characters only (for match player selection)
  app.get("/api/admin/users-with-characters", requireAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsersWithCharacters();
      // Filter only users with characters and remove passwords
      const usersWithCharacters = users
        .filter(user => user.character)
        .map(({ password, ...user }) => user);
      res.json(usersWithCharacters);
    } catch (error) {
      console.error("Get users with characters error:", error);
      res.status(500).json({ message: "Failed to get users with characters" });
    }
  });

  // Get users connected to match page (Admin only)
  app.get("/api/admin/match-page-users", requireAdmin, async (req, res) => {
    try {
      const connectedUserIds = Array.from(matchPageConnections.keys());
      const users = [];

      console.log("Connected user IDs:", connectedUserIds);

      for (const userId of connectedUserIds) {
        const user = await storage.getUserWithCharacter(userId);
        console.log(`User ${userId}:`, user ? { id: user.id, username: user.username, hasCharacter: !!user.character } : "not found");
        if (user) {
          users.push(user);
        }
      }

      console.log("Final users array:", users.length);
      res.json(users);
    } catch (error) {
      console.error("Get match page users error:", error);
      res.status(500).json({ message: "Failed to fetch match page users" });
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
          status: "pending"
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

  // Admin route to update character ranking
  app.patch("/api/admin/character/:userId/rank", requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { newRank } = req.body;

      if (!newRank || newRank < 1 || newRank > 300) {
        return res.status(400).json({ message: "Invalid rank. Must be between 1 and 300" });
      }

      // Check if character exists
      const character = await storage.getCharacter(userId);
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }

      const updatedCharacter = await storage.updateCharacter(userId, { ranking: newRank });
      res.json(updatedCharacter);
    } catch (error) {
      console.error("Update character rank error:", error);
      res.status(500).json({ message: "Failed to update character rank" });
    }
  });

  // Admin route to calculate automatic ranking
  app.post("/api/admin/character/:userId/calculate-rank", requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);

      // Check if character exists
      const character = await storage.getCharacter(userId);
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }

      // Simple ranking calculation based on stats and performance
      const baseRank = 300;
      let rankReduction = 0;

      // Factor in goals (each goal reduces rank by 5)
      rankReduction += character.goals * 5;

      // Factor in matches (each match reduces rank by 1)
      rankReduction += character.matches * 1;

      // Factor in level (each level above 1 reduces rank by 3)
      rankReduction += (character.level - 1) * 3;

      // Factor in key stats (total physical stats above 20 gives bonus)
      const totalPhysicalStats = (character.fisico || 0) + (character.velocidade || 0);
      if (totalPhysicalStats > 20) {
        rankReduction += Math.floor((totalPhysicalStats - 20) / 2);
      }

      // Calculate final ranking (minimum rank 1)
      const calculatedRank = Math.max(1, baseRank - rankReduction);

      const updatedCharacter = await storage.updateCharacter(userId, { ranking: calculatedRank });
      res.json({ ranking: calculatedRank, character: updatedCharacter });
    } catch (error) {
      console.error("Calculate character rank error:", error);
      res.status(500).json({ message: "Failed to calculate character rank" });
    }
  });

  // Delete user permanently (Admin only)
  app.delete("/api/admin/user/:userId", requireAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);

      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      // Check if user exists
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Prevent deleting admins (safety measure)
      if (user.isAdmin) {
        return res.status(403).json({ message: "Cannot delete admin users" });
      }

      // Delete all related data
      await storage.deleteUserPermanently(userId);

      console.log(`User ${userId} (${user.username}) has been permanently deleted by admin`);
      res.json({ message: "User deleted permanently", deletedUser: { id: user.id, username: user.username } });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  // Match routes
  app.get("/api/matches", requireAuth, async (req, res) => {
    try {
      const matches = await storage.getAllMatches();
      res.json(matches);
    } catch (error) {
      console.error("Get matches error:", error);
      res.status(500).json({ message: "Failed to get matches" });
    }
  });

  app.get("/api/matches/finished", requireAuth, async (req, res) => {
    try {
      const matches = await storage.getAllMatches();
      const finishedMatches = matches.filter(m => m.status === "finished").slice(-10); // Últimas 10 partidas
      res.json(finishedMatches);
    } catch (error) {
      console.error("Get finished matches error:", error);
      res.status(500).json({ message: "Failed to get finished matches" });
    }
  });



  app.get("/api/matches/active", requireAuth, async (req, res) => {
    try {
      const activeMatch = await storage.getActiveMatch();
      if (!activeMatch) {
        return res.status(404).json({ message: "No active match" });
      }

      const matchWithGoals = await storage.getMatchWithGoals(activeMatch.id);
      res.json(matchWithGoals);
    } catch (error) {
      console.error("Get active match error:", error);
      res.status(500).json({ message: "Failed to get active match" });
    }
  });

  app.get("/api/matches/:id", requireAuth, async (req, res) => {
    try {
      const matchId = parseInt(req.params.id);
      const match = await storage.getMatchWithGoals(matchId);

      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }

      res.json(match);
    } catch (error) {
      console.error("Get match error:", error);
      res.status(500).json({ message: "Failed to get match" });
    }
  });

  // Admin match management
  app.post("/api/admin/matches", requireAdmin, async (req, res) => {
    try {
      console.log("=== CREATE MATCH DEBUG ===");
      console.log("Request body:", req.body);
      console.log("User session:", req.session.userId);

      const matchData = insertMatchSchema.parse(req.body);
      console.log("Parsed match data:", matchData);

      const newMatch = await storage.createMatch(matchData);
      console.log("Created match:", newMatch);

      res.json(newMatch);
    } catch (error) {
      console.error("Create match error:", error);
      res.status(500).json({ message: "Failed to create match", error: error instanceof Error ? error.message : "Unknown error" });
    }
  });

  app.patch("/api/admin/matches/:id", requireAdmin, async (req, res) => {
    try {
      const matchId = parseInt(req.params.id);
      const updates = updateMatchSchema.parse(req.body);

      const updatedMatch = await storage.updateMatch(matchId, updates);
      res.json(updatedMatch);
    } catch (error) {
      console.error("Update match error:", error);
      res.status(500).json({ message: "Failed to update match" });
    }
  });

  app.post("/api/admin/matches/:id/start", requireAdmin, async (req, res) => {
    try {
      const matchId = parseInt(req.params.id);
      const updatedMatch = await storage.updateMatch(matchId, {
        status: "active",
        startTime: new Date(),
        currentMinute: 0
      });

      // Buscar todos os usuários conectados na página de partidas para enviar introduções
      const connectedUserIds = Array.from(matchPageConnections.keys());
      const playersWithCharacters = [];

      console.log("=== PROCESSING CONNECTED USERS FOR CHARACTER SEQUENCE ===");
      console.log("Connected user IDs:", connectedUserIds);

      // Coletar apenas jogadores com personagens
      for (const userId of connectedUserIds) {
        const user = await storage.getUserWithCharacter(userId);
        console.log(`User ${userId}:`, {
          exists: !!user,
          hasCharacter: !!user?.character,
          isAdmin: user?.isAdmin,
          username: user?.username,
          characterName: user?.character?.name
        });

        if (user && user.character && !user.isAdmin) {
          playersWithCharacters.push(user.character);
          console.log(`Added character: ${user.character.name} (User: ${user.username})`);
        } else {
          console.log(`Skipped user ${userId}: no character or is admin`);
        }
      }

      console.log("Final playersWithCharacters:", playersWithCharacters.length);
      console.log("Characters to show:", playersWithCharacters.map(c => c.name));

      // Enviar introdução sequencial para todos os usuários conectados
      if (playersWithCharacters.length > 0) {
        console.log("=== SENDING WEBSOCKET MESSAGE ===");
        console.log("Sending to", matchPageConnections.size, "connections");

        const message = {
          type: "match_started_character_intro_sequence",
          characters: playersWithCharacters,
          message: "A partida começou! Apresentando os jogadores..."
        };

        console.log("Message being sent:", JSON.stringify(message, null, 2));

        // Broadcast para todos os conectados
        matchPageConnections.forEach((connection, userId) => {
          if (connection.readyState === WebSocket.OPEN) {
            console.log("Sending character sequence to user:", userId);
            connection.send(JSON.stringify(message));
          } else {
            console.log("Connection not open for user:", userId);
          }
        });
      } else {
        console.log("No characters to show, skipping WebSocket broadcast");
      }

      res.json(updatedMatch);
    } catch (error) {
      console.error("Start match error:", error);
      res.status(500).json({ message: "Failed to start match" });
    }
  });

  app.post("/api/admin/matches/:id/finish", requireAdmin, async (req, res) => {
    try {
      const matchId = parseInt(req.params.id);

      // Verifica se a partida existe e não está finalizada
      const match = await storage.getMatch(matchId);
      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }

      if (match.status === "finished") {
        return res.status(400).json({ message: "Match already finished" });
      }

      // PRIMEIRO: Encerra qualquer Flow State ativo da partida
      const activeFlowState = await storage.getActiveFlowState(matchId);
      if (activeFlowState) {
        await storage.endFlowState(matchId, activeFlowState.playerId);
        console.log(`Flow State ended for player ${activeFlowState.playerId} due to match finish`);

        // Notificar via WebSocket que o Flow State acabou
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: "flow_state_ended",
              playerId: activeFlowState.playerId,
              playerName: activeFlowState.player.character?.name || activeFlowState.player.username,
              message: `${activeFlowState.player.character?.name || activeFlowState.player.username} saiu do Flow State!`
            }));
          }
        });
      }

      // Atualiza o status da partida para finalizada
      const updatedMatch = await storage.updateMatch(matchId, {
        status: "finished",
        endTime: new Date()
      });

      // Busca todos os gols da partida para atualizar estatísticas
      const matchWithGoals = await storage.getMatchWithGoals(matchId);
      if (matchWithGoals?.goals) {
        // Agrupa gols por jogador
        const playerGoals = matchWithGoals.goals.reduce((acc, goal) => {
          acc[goal.playerId] = (acc[goal.playerId] || 0) + 1;
          return acc;
        }, {} as Record<number, number>);

        // Atualiza estatísticas de cada jogador
        for (const [playerId, goalCount] of Object.entries(playerGoals)) {
          const character = await storage.getCharacter(parseInt(playerId));
          if (character) {
            await storage.updateCharacter(parseInt(playerId), {
              goals: character.goals + goalCount,
              matches: character.matches + 1
            });
          }
        }

        // Atualiza matches para todos os outros jogadores que participaram mas não fizeram gols
        const allUsers = await storage.getAllUsersWithCharacters();
        const playersWithGoals = new Set(Object.keys(playerGoals).map(id => parseInt(id)));

        for (const user of allUsers) {
          if (user.character && !playersWithGoals.has(user.id)) {
            await storage.updateCharacter(user.id, {
              matches: user.character.matches + 1
            });
          }
        }
      }

      // Notificar todos os usuários conectados que a partida foi finalizada
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: "match_finished",
            matchId: matchId,
            message: "A partida foi finalizada!"
          }));
        }
      });

      res.json(updatedMatch);
    } catch (error) {
      console.error("Create goal error:", error);
      res.status(500).json({ message: "Failed to create goal" });
    }
  });

  // Flow State routes - Ordem importante: mais específicas primeiro
  app.get("/api/flow-state/:matchId/active", requireAuth, async (req, res) => {
    try {
      const { matchId } = req.params;

      // Validar se o parâmetro é válido
      if (!matchId || matchId === 'undefined') {
        return res.status(400).json({ message: "Invalid matchId" });
      }

      const matchIdNum = Number(matchId);

      if (isNaN(matchIdNum)) {
        return res.status(400).json({ message: "matchId must be a valid number" });
      }

      const activeFlowState = await storage.getActiveFlowState(matchIdNum);

      if (!activeFlowState) {
        return res.status(404).json({ message: "No active flow state" });
      }

      res.json(activeFlowState);
    } catch (error) {
      console.error("Get active flow state error:", error);
      res.status(500).json({ message: "Failed to get active flow state" });
    }
  });

  app.get("/api/flow-state/:matchId/:playerId", async (req, res) => {
    try {
      const { matchId, playerId } = req.params;

      // Validar se os parâmetros são válidos
      if (!matchId || !playerId || matchId === 'undefined' || playerId === 'undefined') {
        return res.status(400).json({ message: "Invalid matchId or playerId" });
      }

      const matchIdNum = Number(matchId);
      const playerIdNum = Number(playerId);

      if (isNaN(matchIdNum) || isNaN(playerIdNum)) {
        return res.status(400).json({ message: "matchId and playerId must be valid numbers" });
      }

      const flowState = await storage.getFlowStateForPlayer(matchIdNum, playerIdNum);

      if (!flowState) {
        return res.status(404).json({ message: "Flow State not found" });
      }

      res.json(flowState);
    } catch (error) {
      console.error("Get flow state error:", error);
      res.status(500).json({ message: "Failed to get flow state" });
    }
  });

  app.post("/api/admin/flow-state", requireAdmin, async (req, res) => {
    try {
      const { matchId, playerId } = req.body;

      // Verificar se já existe um Flow State ativo (qualquer jogador)
      const existingFlowState = await storage.getActiveFlowState(matchId);
      if (existingFlowState) {
        return res.status(400).json({ 
          message: "Flow State already active",
          activePlayer: existingFlowState.player?.character?.name || existingFlowState.player?.username
        });
      }

      // Verificar se o jogador específico já tem Flow State ativo
      const playerFlowState = await storage.getFlowStateForPlayer(matchId, playerId);
      if (playerFlowState && playerFlowState.isActive) {
        return res.status(400).json({ message: "Player already has active Flow State" });
      }

      // Buscar dados do jogador para obter configurações personalizadas
      const player = await storage.getUserWithCharacter(playerId);

      const flowColor = player?.character?.flowColor || "cyan";
      const flowPhrase = player?.character?.flowPhrase || "É hora de dominar o campo!";
      const flowMusicUrl = player?.character?.flowMusicUrl || "";

      // Criar Flow State com dados personalizados
      const flowState = await storage.createFlowState({
        matchId,
        playerId,
        flowColor: flowColor
      });

      console.log('=== FLOW STATE ACTIVATION DEBUG ===');
      console.log('Player:', player?.username);
      console.log('Character:', player?.character?.name);
      console.log('Flow Color:', flowColor);
      console.log('Flow Phrase:', flowPhrase);
      console.log('Flow Music URL from character:', player?.character?.flowMusicUrl);
      console.log('Flow Music URL final:', flowMusicUrl);

      // Notificar via WebSocket que Flow State foi ativado
      const wsMessage = {
        type: 'flow_state_activated',
        playerId: playerId,
        playerName: player?.character?.name || player?.username,
        flowColor: flowColor,
        flowPhrase: flowPhrase,
        flowMusicUrl: flowMusicUrl,
        matchId: matchId
      };

      console.log('=== WEBSOCKET MESSAGE DEBUG ===');
      console.log('Sending WebSocket message:', wsMessage);
      
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(wsMessage));
        }
      });

      const websocketMessage = {
        type: "flow_state_activated",
        playerId: playerId,
        playerName: player?.character?.name || player?.username,
        flowColor: flowColor,
        flowPhrase: flowPhrase,
        flowMusicUrl: flowMusicUrl,
        message: `${player?.character?.name || player?.username} entrou no Flow State!`
      };

      console.log('WebSocket message being sent:', JSON.stringify(websocketMessage, null, 2));
      console.log('Flow Music URL being sent:', flowMusicUrl);

      // Notificar todos os jogadores via WebSocket
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(websocketMessage));
        }
      });

      res.json({ 
        message: "Flow State activated successfully",
        flowState,
        flowColor,
        flowPhrase,
        flowMusicUrl
      });
    } catch (error) {
      console.error("Create flow state error:", error);
      res.status(500).json({ message: "Failed to create flow state" });
    }
  });

  // API para desativar Flow State
  app.post("/api/admin/flow-state/deactivate", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { matchId, playerId } = req.body;

      if (!matchId || !playerId) {
        return res.status(400).json({ message: "matchId and playerId are required" });
      }

      // Verificar se a partida existe e está ativa
      const match = await storage.getMatch(matchId);
      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }

      if (match.status !== "active") {
        return res.status(400).json({ message: "Match is not active" });
      }

      // Encerrar Flow State
      await storage.endFlowState(matchId, playerId);

      // Buscar dados do jogador para notificação
      const player = await storage.getUserWithCharacter(playerId);

      // Notificar todos os jogadores via WebSocket
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: "flow_state_ended",
            playerId: playerId,
            playerName: player?.character?.name || player?.username,
            message: `Flow State de ${player?.character?.name || player?.username} foi desativado pelo Mestre`
          }));
        }
      });

      res.json({ message: "Flow State deactivated successfully" });
    } catch (error) {
      console.error("Deactivate flow state error:", error);
      res.status(500).json({ message: "Failed to deactivate flow state" });
    }
  });

  // API para definir tempo da partida
  app.post("/api/admin/matches/set-time", requireAuth, requireAdmin, async (req, res) => {
    try {
      const { matchId, minutes } = req.body;

      if (!matchId || minutes === undefined) {
        return res.status(400).json({ message: "matchId and minutes are required" });
      }

      // Verificar se a partida existe e está ativa
      const match = await storage.getMatch(matchId);
      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }

      if (match.status !== "active") {
        return res.status(400).json({ message: "Match is not active" });
      }

      // Calcular novo startTime baseado no tempo desejado
      const now = new Date();
      const newStartTime = new Date(now.getTime() - (minutes * 60 * 1000));

      // Atualizar a partida com o novo startTime
      await storage.updateMatch(matchId, {
        startTime: newStartTime
      });

      res.json({ 
        message: "Match time set successfully",
        newStartTime: newStartTime.toISOString(),
        currentMinutes: minutes
      });
    } catch (error) {
      console.error("Set match time error:", error);
      res.status(500).json({ message: "Failed to set match time" });
    }
  });

  const httpServer = createServer(app);

  // WebSocket setup
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  // Store WebSocket connections by user ID
  const userConnections = new Map<number, WebSocket>();
  const matchPageConnections = new Map<number, WebSocket>(); // Usuários específicos na página de partidas

  wss.on('connection', (ws, req) => {
    console.log('New WebSocket connection');

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('WebSocket message received:', data);

        if (data.type === 'auth' && data.userId) {
          userConnections.set(data.userId, ws);
          console.log(`User ${data.userId} connected via WebSocket`);
        }

        // Tracking específico para página de partidas
        if (data.type === 'match_page_connect' && data.userId) {
          matchPageConnections.set(data.userId, ws);
          console.log(`User ${data.userId} connected to match page`);
        }

        if (data.type === 'match_page_disconnect' && data.userId) {
          matchPageConnections.delete(data.userId);
          console.log(`User ${data.userId} disconnected from match page`);
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      // Remove connection from both maps when user disconnects
      userConnections.forEach((connection, userId) => {
        if (connection === ws) {
          userConnections.delete(userId);
          matchPageConnections.delete(userId);
        }
      });
    });
  });

  // Function to broadcast message to specific user
  function broadcastToUser(userId: number, message: any) {
    const connection = userConnections.get(userId);
    if (connection && connection.readyState === WebSocket.OPEN) {
      connection.send(JSON.stringify(message));
    }
  }

    // Function to broadcast message to specific match
    function broadcastToMatch(matchId: number, message: any) {
      matchPageConnections.forEach((connection, userId) => {
          // Fetch the user to get the character data and match ID
          storage.getUserWithCharacter(userId)
              .then(user => {
                  if (user && user.character) {
                      // Check if the user's character is associated with the given match ID
                      // NOTE: You'll need to have a way to associate characters with matches
                      // For example, if you store the match ID in the character object:
                      // if (user.character.matchId === matchId) {
                      if (connection.readyState === WebSocket.OPEN) {
                          connection.send(JSON.stringify(message));
                      }
                  }
              })
              .catch(error => {
                  console.error("Error fetching user with character:", error);
              });
      });
  }

  return httpServer;
}
