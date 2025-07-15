import { users, characters, type User, type InsertUser, type Character, type InsertCharacter, type UpdateCharacter, type UserWithCharacter } from "@shared/schema";
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
}

export const storage = new DatabaseStorage();
