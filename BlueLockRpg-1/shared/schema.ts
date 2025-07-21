import { pgTable, text, varchar, timestamp, integer, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  cesarMonitorSeen: boolean("cesar_monitor_seen").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  position: varchar("position", { length: 50 }).default("Atacante"),
  motivacao: varchar("motivacao", { length: 50 }),
  age: integer("age"),
  height: varchar("height", { length: 20 }),
  bio: text("bio"),
  weapon: varchar("weapon", { length: 255 }),
  origin: varchar("origin", { length: 50 }),
  classe: varchar("classe", { length: 50 }),
  subclasse: varchar("subclasse", { length: 50 }),
  avatar: text("avatar"),
  level: integer("level").default(1).notNull(),
  experience: integer("experience").default(0).notNull(),
  matches: integer("matches").default(0).notNull(),
  goals: integer("goals").default(0).notNull(),
  ranking: integer("ranking").default(299).notNull(),
  isEliminated: boolean("is_eliminated").default(false).notNull(),
  // Novos Atributos
  fisico: integer("fisico").default(3).notNull(),
  velocidade: integer("velocidade").default(3).notNull(), 
  intelecto: integer("intelecto").default(3).notNull(),
  carisma: integer("carisma").default(3).notNull(),
  egoismo: integer("egoismo").default(3).notNull(),
  
  // Perícias (skills) - pontos para distribuir
  chute: integer("chute").default(1).notNull(),
  precisao: integer("precisao").default(1).notNull(),
  roubo: integer("roubo").default(1).notNull(),
  analise: integer("analise").default(1).notNull(),
  determinacao: integer("determinacao").default(1).notNull(),
  estrategia: integer("estrategia").default(1).notNull(),
  intuicao: integer("intuicao").default(1).notNull(),
  interacao_social: integer("interacao_social").default(1).notNull(),
  lingua_estrangeira: integer("lingua_estrangeira").default(1).notNull(),
  
  // Novas perícias do documento
  corrida: integer("corrida").default(1).notNull(),
  cruzamento: integer("cruzamento").default(1).notNull(),
  defesa: integer("defesa").default(1).notNull(),
  drible: integer("drible").default(1).notNull(),
  passe: integer("passe").default(1).notNull(),
  performance: integer("performance").default(1).notNull(),
  comemoracao: integer("comemoracao").default(1).notNull(),
  
  // Perícias livres
  fortitude: integer("fortitude").default(1).notNull(),
  finta: integer("finta").default(1).notNull(),
  furtividade: integer("furtividade").default(1).notNull(),
  iniciativa: integer("iniciativa").default(1).notNull(),
  percepcao: integer("percepcao").default(1).notNull(),
  sorte: integer("sorte").default(1).notNull(),
  
  // Perícias de reação
  dominio: integer("dominio").default(1).notNull(),
  cabeceio: integer("cabeceio").default(1).notNull(),
  interceptacao: integer("interceptacao").default(1).notNull(),
  reacao: integer("reacao").default(1).notNull(),
  // Flow State personalization
  flowColor: varchar("flow_color", { length: 20 }).default("cyan").notNull(),
  flowPhrase: varchar("flow_phrase", { length: 255 }).default("É hora de dominar o campo!").notNull(),
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

export const flowStates = pgTable("flow_states", {
  id: serial("id").primaryKey(),
  matchId: integer("match_id").references(() => matches.id).notNull(),
  playerId: integer("player_id").references(() => users.id).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  flowColor: varchar("flow_color", { length: 20 }).default("cyan").notNull(),
  activatedAt: timestamp("activated_at").defaultNow().notNull(),
  endedAt: timestamp("ended_at"),
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

export const flowStatesRelations = relations(flowStates, ({ one }) => ({
  match: one(matches, {
    fields: [flowStates.matchId],
    references: [matches.id],
  }),
  player: one(users, {
    fields: [flowStates.playerId],
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

export const insertFlowStateSchema = createInsertSchema(flowStates).omit({
  id: true,
  activatedAt: true,
  endedAt: true,
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
export type InsertFlowState = z.infer<typeof insertFlowStateSchema>;
export type FlowState = typeof flowStates.$inferSelect;

export type MatchWithGoals = Match & {
  goals: (Goal & { player: User })[];
};

export type FlowStateWithPlayer = FlowState & {
  player: User & { character?: Character };
};
