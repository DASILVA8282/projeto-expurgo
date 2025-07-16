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

    // Criar tabela matches se não existir
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS matches (
        id SERIAL PRIMARY KEY,
        team_v VARCHAR(100) NOT NULL,
        team_z VARCHAR(100) NOT NULL,
        score_v INTEGER DEFAULT 0 NOT NULL,
        score_z INTEGER DEFAULT 0 NOT NULL,
        status VARCHAR(20) DEFAULT 'preparing' NOT NULL,
        start_time TIMESTAMP,
        end_time TIMESTAMP,
        current_minute INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);

    // Criar tabela goals se não existir
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS goals (
        id SERIAL PRIMARY KEY,
        match_id INTEGER REFERENCES matches(id) NOT NULL,
        player_id INTEGER REFERENCES users(id) NOT NULL,
        team VARCHAR(1) NOT NULL CHECK (team IN ('V', 'Z')),
        minute INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);

    // Criar tabela flow_states se não existir
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS flow_states (
        id SERIAL PRIMARY KEY,
        match_id INTEGER REFERENCES matches(id) NOT NULL,
        player_id INTEGER REFERENCES users(id) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE NOT NULL,
        flow_color VARCHAR(20) DEFAULT 'cyan' NOT NULL,
        activated_at TIMESTAMP DEFAULT NOW() NOT NULL,
        ended_at TIMESTAMP
      )
    `);

    console.log('Tabelas criadas/verificadas com sucesso!');

    // Verificar se já existe o usuário admin
    const adminCheck = await db.execute(sql`
      SELECT COUNT(*) as count FROM users WHERE username = 'mestre'
    `);

    const adminCount = Number(adminCheck.rows[0]?.count) || 0;

    if (adminCount === 0) {
      // Criar usuário admin padrão
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.execute(sql`
        INSERT INTO users (username, password, is_admin)
        VALUES ('mestre', ${hashedPassword}, true)
      `);
      console.log('Default admin user created: mestre / admin123');
    } else {
      console.log('Admin user already exists');
    }

  } catch (error) {
    console.error('Erro ao inicializar banco:', error);
    throw error;
  }
}
