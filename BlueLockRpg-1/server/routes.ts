import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
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
      console.log("Received character data:", req.body);
      const characterData = insertCharacterSchema.parse({
        ...req.body,
        userId: req.session.userId,
      });
      console.log("Parsed character data:", characterData);

      // Check if user already has a character
      const existingCharacter = await storage.getCharacter(req.session.userId!);
      if (existingCharacter) {
        return res.status(400).json({ message: "Character already exists for this user" });
      }

      const character = await storage.createCharacter(characterData);
      console.log("Created character:", character);
      res.json(character);
    } catch (error) {
      console.error("Create character error:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      res.status(400).json({ message: "Invalid character data", error: error.message });
    }
  });

  app.put("/api/characters", requireAuth, async (req, res) => {
    try {
      console.log("Received update data:", req.body);
      const updates = updateCharacterSchema.parse(req.body);
      console.log("Parsed update data:", updates);
      
      // Check if character exists
      const existingCharacter = await storage.getCharacter(req.session.userId!);
      if (!existingCharacter) {
        return res.status(404).json({ message: "Character not found" });
      }

      const character = await storage.updateCharacter(req.session.userId!, updates);
      console.log("Updated character:", character);
      res.json(character);
    } catch (error) {
      console.error("Update character error:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      res.status(400).json({ message: "Invalid character data", error: error.message });
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
      const matchData = insertMatchSchema.parse(req.body);
      const newMatch = await storage.createMatch(matchData);
      res.json(newMatch);
    } catch (error) {
      console.error("Create match error:", error);
      res.status(500).json({ message: "Failed to create match" });
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
            message: "A partida foi finalizada! Redirecionando para o dashboard..."
          }));
        }
      });
      
      console.log(`Match ${matchId} finished and all Flow States cleared`);
      res.json(updatedMatch);
    } catch (error) {
      console.error("Finish match error:", error);
      res.status(500).json({ message: "Failed to finish match" });
    }
  });

  // Goal routes
  app.post("/api/admin/goals", requireAdmin, async (req, res) => {
    try {
      const goalData = insertGoalSchema.parse(req.body);
      
      // Verificar se há Flow State ativo e encerrar
      const activeFlowState = await storage.getActiveFlowState(goalData.matchId);
      if (activeFlowState) {
        await storage.endFlowState(goalData.matchId, activeFlowState.playerId);
        
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
      
      const newGoal = await storage.createGoal(goalData);
      
      // Update match score
      const match = await storage.getMatch(goalData.matchId);
      if (match) {
        const updates = goalData.team === "V" 
          ? { scoreV: match.scoreV + 1 }
          : { scoreZ: match.scoreZ + 1 };
        
        await storage.updateMatch(goalData.matchId, updates);
      }
      
      res.json(newGoal);
    } catch (error) {
      console.error("Create goal error:", error);
      res.status(500).json({ message: "Failed to create goal" });
    }
  });

  // Flow State routes - Ordem importante: mais específicas primeiro
  app.get("/api/flow-state/:matchId/active", async (req, res) => {
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
      
      // Usar cor personalizada do jogador ou fallback para cor aleatória
      const flowColor = player?.character?.flowColor || "cyan";
      const flowPhrase = player?.character?.flowPhrase || "É hora de dominar o campo!";
      
      // Criar Flow State com dados personalizados
      const flowState = await storage.createFlowState({
        matchId,
        playerId,
        flowColor: flowColor
      });
      
      // Notificar todos os jogadores via WebSocket
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: "flow_state_activated",
            playerId: playerId,
            playerName: player?.character?.name || player?.username,
            flowColor: flowColor,
            flowPhrase: flowPhrase,
            message: `${player?.character?.name || player?.username} entrou no Flow State!`
          }));
        }
      });
      
      res.json(flowState);
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
