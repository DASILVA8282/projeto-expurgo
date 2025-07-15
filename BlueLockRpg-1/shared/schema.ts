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
  isEliminated: boolean("is_eliminated").default(false).notNull(),
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

export const wildCardInvitations = pgTable("wild_card_invitations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  status: varchar("status", { length: 20 }).default("pending").notNull(), // pending, accepted, rejected
  createdAt: timestamp("created_at").defaultNow().notNull(),
  respondedAt: timestamp("responded_at"),
});

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  teamV: varchar("team_v", { length: 100 }).notNull(),
  teamZ: varchar("team_z", { length: 100 }).notNull(),
  scoreV: integer("score_v").default(0).notNull(),
  scoreZ: integer("score_z").default(0).notNull(),
  status: varchar("status", { length: 20 }).default("preparing").notNull(), // preparing, active, finished
  startTime: timestamp("start_time"),
  endTime: timestamp("end_time"),
  currentMinute: integer("current_minute").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  matchId: integer("match_id").references(() => matches.id).notNull(),
  playerId: integer("player_id").references(() => users.id).notNull(),
  team: varchar("team", { length: 1 }).notNull(), // V or Z
  minute: integer("minute").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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

export const wildCardInvitationsRelations = relations(wildCardInvitations, ({ one }) => ({
  user: one(users, {
    fields: [wildCardInvitations.userId],
    references: [users.id],
  }),
}));

export const matchesRelations = relations(matches, ({ many }) => ({
  goals: many(goals),
}));

export const goalsRelations = relations(goals, ({ one }) => ({
  match: one(matches, {
    fields: [goals.matchId],
    references: [matches.id],
  }),
  player: one(users, {
    fields: [goals.playerId],
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

export const insertWildCardInvitationSchema = createInsertSchema(wildCardInvitations).omit({
  id: true,
  createdAt: true,
  respondedAt: true,
});

export const updateWildCardInvitationSchema = insertWildCardInvitationSchema.partial().omit({
  userId: true,
});

export const insertMatchSchema = createInsertSchema(matches).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateMatchSchema = insertMatchSchema.partial();

export const insertGoalSchema = createInsertSchema(goals).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCharacter = z.infer<typeof insertCharacterSchema>;
export type UpdateCharacter = z.infer<typeof updateCharacterSchema>;
export type Character = typeof characters.$inferSelect;
export type InsertWildCardInvitation = z.infer<typeof insertWildCardInvitationSchema>;
export type UpdateWildCardInvitation = z.infer<typeof updateWildCardInvitationSchema>;
export type WildCardInvitation = typeof wildCardInvitations.$inferSelect;

export type UserWithCharacter = User & {
  character?: Character;
};

export type InsertMatch = z.infer<typeof insertMatchSchema>;
export type UpdateMatch = z.infer<typeof updateMatchSchema>;
export type Match = typeof matches.$inferSelect;
export type InsertGoal = z.infer<typeof insertGoalSchema>;
export type Goal = typeof goals.$inferSelect;

export type MatchWithGoals = Match & {
  goals: (Goal & { player: User })[];
};
