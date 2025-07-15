import { users, characters, wildCardInvitations, type User, type InsertUser, type Character, type InsertCharacter, type UpdateCharacter, type UserWithCharacter, type WildCardInvitation, type InsertWildCardInvitation, type UpdateWildCardInvitation } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
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
}

export const storage = new DatabaseStorage();
