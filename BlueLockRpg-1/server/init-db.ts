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
        flow_color VARCHAR(20) DEFAULT 'cyan' NOT NULL,
        flow_phrase VARCHAR(255) DEFAULT 'É hora de dominar o campo!' NOT NULL,
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

    // Migração: Adicionar colunas flow_color e flow_phrase se não existirem
    try {
      await db.execute(sql`
        ALTER TABLE characters 
        ADD COLUMN IF NOT EXISTS flow_color VARCHAR(20) DEFAULT 'cyan' NOT NULL
      `);
      console.log('Coluna flow_color adicionada/verificada');
    } catch (error) {
      console.log('Coluna flow_color já existe ou erro:', error);
    }
    
    try {
      await db.execute(sql`
        ALTER TABLE characters 
        ADD COLUMN IF NOT EXISTS flow_phrase VARCHAR(255) DEFAULT 'É hora de dominar o campo!' NOT NULL
      `);
      console.log('Coluna flow_phrase adicionada/verificada');
    } catch (error) {
      console.log('Coluna flow_phrase já existe ou erro:', error);
    }

    // Migração: Adicionar coluna cesar_monitor_seen na tabela users
    try {
      await db.execute(sql`
        ALTER TABLE users 
        ADD COLUMN IF NOT EXISTS cesar_monitor_seen BOOLEAN DEFAULT FALSE NOT NULL
      `);
      console.log('Coluna cesar_monitor_seen adicionada/verificada');
    } catch (error) {
      console.log('Coluna cesar_monitor_seen já existe ou erro:', error);
    }

    // Migração: Adicionar coluna origin na tabela characters
    try {
      await db.execute(sql`
        ALTER TABLE characters 
        ADD COLUMN IF NOT EXISTS origin VARCHAR(50)
      `);
      console.log('Coluna origin adicionada/verificada');
    } catch (error) {
      console.log('Coluna origin já existe ou erro:', error);
    }

    // Migração: Adicionar colunas de classe e subclasse na tabela characters
    try {
      await db.execute(sql`
        ALTER TABLE characters 
        ADD COLUMN IF NOT EXISTS classe VARCHAR(50)
      `);
      console.log('Coluna classe adicionada/verificada');
    } catch (error) {
      console.log('Coluna classe já existe ou erro:', error);
    }

    try {
      await db.execute(sql`
        ALTER TABLE characters 
        ADD COLUMN IF NOT EXISTS subclasse VARCHAR(50)
      `);
      console.log('Coluna subclasse adicionada/verificada');
    } catch (error) {
      console.log('Coluna subclasse já existe ou erro:', error);
    }

    // Migração: Adicionar novos atributos na tabela characters
    const newAttributes = [
      'fisico',
      'velocidade', 
      'intelecto',
      'carisma',
      'egoismo'
    ];

    for (const attrName of newAttributes) {
      try {
        await db.execute(sql`
          ALTER TABLE characters 
          ADD COLUMN IF NOT EXISTS ${sql.raw(attrName)} INTEGER DEFAULT 3 NOT NULL
        `);
        console.log(`Coluna ${attrName} adicionada/verificada`);
      } catch (error) {
        console.log(`Coluna ${attrName} já existe ou erro:`, error);
      }
    }

    // Migração: Adicionar perícias na tabela characters
    const newSkills = [
      'chute',
      'precisao', 
      'roubo',
      'analise',
      'determinacao',
      'estrategia',
      'intuicao',
      'interacao_social',
      'lingua_estrangeira',
      // Novas perícias do documento
      'corrida',
      'cruzamento',
      'defesa',
      'drible',
      'passe',
      'performance',
      'comemoracao',
      // Perícias livres
      'fortitude',
      'finta',
      'furtividade',
      'iniciativa',
      'percepcao',
      'sorte',
      // Perícias de reação
      'dominio',
      'cabeceio',
      'interceptacao',
      'reacao'
    ];

    for (const skillName of newSkills) {
      try {
        await db.execute(sql`
          ALTER TABLE characters 
          ADD COLUMN IF NOT EXISTS ${sql.raw(skillName)} INTEGER DEFAULT 1 NOT NULL
        `);
        console.log(`Coluna ${skillName} adicionada/verificada`);
      } catch (error) {
        console.log(`Coluna ${skillName} já existe ou erro:`, error);
      }
    }

    // Migração: Adicionar coluna de motivação
    try {
      await db.execute(sql`
        ALTER TABLE characters 
        ADD COLUMN IF NOT EXISTS motivacao VARCHAR(50)
      `);
      console.log('Coluna motivacao adicionada/verificada');
    } catch (error) {
      console.log('Coluna motivacao já existe ou erro:', error);
    }

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
