import { db } from './db';
import { sql } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export async function initializeDatabase() {
  try {
    console.log('Verificando e criando tabelas do banco...');
    
    // Criar tabela users se não existir
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);

    // Criar tabela characters se não existir
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS characters (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) NOT NULL,
        name VARCHAR(100) NOT NULL,
        position VARCHAR(50) NOT NULL,
        age INTEGER,
        height VARCHAR(20),
        bio TEXT,
        weapon VARCHAR(255),
        avatar TEXT,
        level INTEGER DEFAULT 1 NOT NULL,
        experience INTEGER DEFAULT 0 NOT NULL,
        matches INTEGER DEFAULT 0 NOT NULL,
        goals INTEGER DEFAULT 0 NOT NULL,
        ranking INTEGER DEFAULT 299 NOT NULL,
        speed INTEGER DEFAULT 50 NOT NULL,
        strength INTEGER DEFAULT 50 NOT NULL,
        stamina INTEGER DEFAULT 50 NOT NULL,
        shooting INTEGER DEFAULT 50 NOT NULL,
        passing INTEGER DEFAULT 50 NOT NULL,
        dribbling INTEGER DEFAULT 50 NOT NULL,
        is_eliminated BOOLEAN DEFAULT FALSE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);

    // Criar tabela wild_card_invitations se não existir
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS wild_card_invitations (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) NOT NULL UNIQUE,
        status VARCHAR(20) DEFAULT 'pending' NOT NULL,
        responded_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);

    console.log('Tabelas criadas/verificadas com sucesso!');

    // Verificar se já existe o usuário admin
    const adminCheck = await db.execute(sql`
      SELECT COUNT(*) as count FROM users WHERE username = 'mestre'
    `);

    const adminCount = adminCheck.rows[0]?.count || 0;

    if (adminCount === 0) {
      // Criar usuário admin padrão
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.execute(sql`
        INSERT INTO users (username, password, is_admin)
        VALUES ('mestre', ${hashedPassword}, true)
      `);
      console.log('Default admin user created: mestre / admin123');
    }

  } catch (error) {
    console.error('Erro ao inicializar banco:', error);
    throw error;
  }
}
