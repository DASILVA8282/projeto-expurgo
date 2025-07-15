import { pgTable, text, varchar, timestamp, integer, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  position: varchar("position", { length: 50 }).notNull(),
  age: integer("age"),
  height: varchar("height", { length: 20 }),
  bio: text("bio"),
  weapon: varchar("weapon", { length: 255 }),
  avatar: text("avatar"),
  level: integer("level").default(1).notNull(),
  experience: integer("experience").default(0).notNull(),
  matches: integer("matches").default(0).notNull(),
  goals: integer("goals").default(0).notNull(),
  ranking: integer("ranking").default(299).notNull(),
  // Stats
  speed: integer("speed").default(50).notNull(),
  strength: integer("strength").default(50).notNull(),
  stamina: integer("stamina").default(50).notNull(),
  shooting: integer("shooting").default(50).notNull(),
  passing: integer("passing").default(50).notNull(),
  dribbling: integer("dribbling").default(50).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ one }) => ({
  character: one(characters, {
    fields: [users.id],
    references: [characters.userId],
  }),
}));

export const charactersRelations = relations(characters, ({ one }) => ({
  user: one(users, {
    fields: [characters.userId],
    references: [users.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCharacterSchema = createInsertSchema(characters).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCharacterSchema = insertCharacterSchema.partial().omit({
  userId: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCharacter = z.infer<typeof insertCharacterSchema>;
export type UpdateCharacter = z.infer<typeof updateCharacterSchema>;
export type Character = typeof characters.$inferSelect;

export type UserWithCharacter = User & {
  character?: Character;
};
