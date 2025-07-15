import { users, characters, wildCardInvitations, matches, goals, type User, type InsertUser, type Character, type InsertCharacter, type UpdateCharacter, type UserWithCharacter, type WildCardInvitation, type InsertWildCardInvitation, type UpdateWildCardInvitation, type Match, type InsertMatch, type UpdateMatch, type Goal, type InsertGoal, type MatchWithGoals } from "@shared/schema";
import { db } from "./db";
import { eq, or, desc } from "drizzle-orm";
import bcrypt from "bcrypt";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserWithCharacter(id: number): Promise<UserWithCharacter | undefined>;
  getAllUsersWithCharacters(): Promise<UserWithCharacter[]>;
  
  // Character operations
  getCharacter(userId: number): Promise<Character | undefined>;
  createCharacter(character: InsertCharacter): Promise<Character>;
  updateCharacter(userId: number, updates: UpdateCharacter): Promise<Character>;
  deleteCharacter(userId: number): Promise<void>;
  getEliminatedCharacters(): Promise<Character[]>;
  
  // Wild Card operations
  createWildCardInvitation(invitation: InsertWildCardInvitation): Promise<WildCardInvitation>;
  getWildCardInvitation(userId: number): Promise<WildCardInvitation | undefined>;
  updateWildCardInvitation(userId: number, updates: UpdateWildCardInvitation): Promise<WildCardInvitation>;
  getPendingWildCardInvitations(): Promise<WildCardInvitation[]>;
  getAllWildCardInvitations(): Promise<WildCardInvitation[]>;
  
  // Match operations
  createMatch(match: InsertMatch): Promise<Match>;
  getMatch(id: number): Promise<Match | undefined>;
  getMatchWithGoals(id: number): Promise<MatchWithGoals | undefined>;
  updateMatch(id: number, updates: UpdateMatch): Promise<Match>;
  getAllMatches(): Promise<Match[]>;
  getActiveMatch(): Promise<Match | undefined>;
  
  // Goal operations
  createGoal(goal: InsertGoal): Promise<Goal>;
  getGoalsForMatch(matchId: number): Promise<(Goal & { player: User })[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }



  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        password: hashedPassword,
      })
      .returning();
    return user;
  }

  async getUserWithCharacter(id: number): Promise<UserWithCharacter | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;

    const character = await this.getCharacter(id);
    return {
      ...user,
      character,
    };
  }

  async getAllUsersWithCharacters(): Promise<UserWithCharacter[]> {
    const allUsers = await db.select().from(users);
    const result: UserWithCharacter[] = [];

    for (const user of allUsers) {
      const character = await this.getCharacter(user.id);
      result.push({
        ...user,
        character,
      });
    }

    return result;
  }

  async getCharacter(userId: number): Promise<Character | undefined> {
    const [character] = await db.select().from(characters).where(eq(characters.userId, userId));
    return character;
  }

  async createCharacter(character: InsertCharacter): Promise<Character> {
    const [newCharacter] = await db
      .insert(characters)
      .values(character)
      .returning();
    return newCharacter;
  }

  async updateCharacter(userId: number, updates: UpdateCharacter): Promise<Character> {
    const [updated] = await db
      .update(characters)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(characters.userId, userId))
      .returning();
    return updated;
  }

  async deleteCharacter(userId: number): Promise<void> {
    await db.delete(characters).where(eq(characters.userId, userId));
  }

  async getEliminatedCharacters(): Promise<Character[]> {
    const eliminatedCharacters = await db.select().from(characters).where(eq(characters.isEliminated, true));
    return eliminatedCharacters;
  }

  // Wild Card operations
  async createWildCardInvitation(invitation: InsertWildCardInvitation): Promise<WildCardInvitation> {
    const [newInvitation] = await db
      .insert(wildCardInvitations)
      .values(invitation)
      .returning();
    return newInvitation;
  }

  async getWildCardInvitation(userId: number): Promise<WildCardInvitation | undefined> {
    const [invitation] = await db
      .select()
      .from(wildCardInvitations)
      .where(eq(wildCardInvitations.userId, userId));
    return invitation;
  }

  async updateWildCardInvitation(userId: number, updates: UpdateWildCardInvitation): Promise<WildCardInvitation> {
    const updateData: any = { ...updates };
    
    // Only set respondedAt if status is being updated to accepted/rejected
    if (updates.status && updates.status !== "pending") {
      updateData.respondedAt = new Date();
    }
    
    // If explicitly setting respondedAt to null (for resend), keep it null
    if (updates.respondedAt === null) {
      updateData.respondedAt = null;
    }
    
    const [updated] = await db
      .update(wildCardInvitations)
      .set(updateData)
      .where(eq(wildCardInvitations.userId, userId))
      .returning();
    return updated;
  }

  async getPendingWildCardInvitations(): Promise<WildCardInvitation[]> {
    const pending = await db
      .select()
      .from(wildCardInvitations)
      .where(eq(wildCardInvitations.status, "pending"));
    return pending;
  }

  async getAllWildCardInvitations(): Promise<WildCardInvitation[]> {
    const allInvitations = await db.select().from(wildCardInvitations);
    return allInvitations;
  }

  // Match operations
  async createMatch(match: InsertMatch): Promise<Match> {
    const [newMatch] = await db
      .insert(matches)
      .values(match)
      .returning();
    return newMatch;
  }

  async getMatch(id: number): Promise<Match | undefined> {
    const [match] = await db.select().from(matches).where(eq(matches.id, id));
    return match;
  }

  async getMatchWithGoals(id: number): Promise<MatchWithGoals | undefined> {
    const match = await this.getMatch(id);
    if (!match) return undefined;
    
    const matchGoals = await this.getGoalsForMatch(id);
    return {
      ...match,
      goals: matchGoals
    };
  }

  async updateMatch(id: number, updates: UpdateMatch): Promise<Match> {
    const [updatedMatch] = await db
      .update(matches)
      .set(updates)
      .where(eq(matches.id, id))
      .returning();
    return updatedMatch;
  }

  async getAllMatches(): Promise<Match[]> {
    return await db.select().from(matches);
  }

  async getActiveMatch(): Promise<Match | undefined> {
    const [match] = await db.select().from(matches).where(
      or(eq(matches.status, "active"), eq(matches.status, "preparing"))
    ).orderBy(desc(matches.createdAt));
    return match;
  }

  // Goal operations
  async createGoal(goal: InsertGoal): Promise<Goal> {
    const [newGoal] = await db
      .insert(goals)
      .values(goal)
      .returning();
    return newGoal;
  }

  async getGoalsForMatch(matchId: number): Promise<(Goal & { player: User & { character?: Character } })[]> {
    return await db
      .select({
        id: goals.id,
        matchId: goals.matchId,
        playerId: goals.playerId,
        team: goals.team,
        minute: goals.minute,
        createdAt: goals.createdAt,
        player: {
          id: users.id,
          username: users.username,
          isAdmin: users.isAdmin,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
          password: users.password
        },
        character: {
          id: characters.id,
          name: characters.name,
          position: characters.position,
          age: characters.age,
          height: characters.height,
          bio: characters.bio,
          weapon: characters.weapon,
          avatar: characters.avatar,
          level: characters.level,
          experience: characters.experience,
          matches: characters.matches,
          goals: characters.goals,
          ranking: characters.ranking,
          speed: characters.speed,
          strength: characters.strength,
          stamina: characters.stamina,
          shooting: characters.shooting,
          passing: characters.passing,
          dribbling: characters.dribbling,
          isEliminated: characters.isEliminated,
          userId: characters.userId,
          createdAt: characters.createdAt,
          updatedAt: characters.updatedAt
        }
      })
      .from(goals)
      .innerJoin(users, eq(goals.playerId, users.id))
      .leftJoin(characters, eq(users.id, characters.userId))
      .where(eq(goals.matchId, matchId))
      .then(rows => rows.map(row => ({
        ...row,
        player: {
          ...row.player,
          character: row.character
        }
      })));
  }
}

export const storage = new DatabaseStorage();
