
import { db } from "./db";
import { sql } from "drizzle-orm";

async function migrateNewStats() {
  console.log("Starting migration for new character stats...");
  
  try {
    // Add new columns to characters table
    await db.execute(sql`
      ALTER TABLE characters 
      ADD COLUMN IF NOT EXISTS pontos_folego INTEGER DEFAULT 10 NOT NULL,
      ADD COLUMN IF NOT EXISTS deslocamento INTEGER DEFAULT 27 NOT NULL,
      ADD COLUMN IF NOT EXISTS fama INTEGER DEFAULT 0 NOT NULL,
      ADD COLUMN IF NOT EXISTS adrenalina INTEGER DEFAULT 0 NOT NULL,
      ADD COLUMN IF NOT EXISTS aura INTEGER DEFAULT 0 NOT NULL,
      ADD COLUMN IF NOT EXISTS furia INTEGER DEFAULT 0 NOT NULL
    `);
    
    // Update existing characters to calculate pontos_folego and deslocamento based on attributes
    await db.execute(sql`
      UPDATE characters 
      SET 
        pontos_folego = 10 + fisico,
        deslocamento = 27 + velocidade
      WHERE pontos_folego = 10 AND deslocamento = 27
    `);
    
    console.log("Migration completed successfully!");
    
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateNewStats()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { migrateNewStats };
