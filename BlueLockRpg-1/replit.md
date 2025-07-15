# Blue Lock RPG - Full Stack Web Application

## Overview

This is a full-stack web application themed around the Blue Lock anime/manga series. It's a character management RPG system where users can create accounts, build and customize soccer players with various stats, and participate in an administrative system. The application follows a modern full-stack architecture with React frontend, Express.js backend, and PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Blue Lock theme colors
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for RESTful API
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon serverless PostgreSQL
- **Authentication**: Express sessions with bcrypt password hashing
- **Session Storage**: PostgreSQL session store

### Database Design
- **Users Table**: Stores user credentials (username, password) and admin status - email field removed for simplicity
- **Characters Table**: Stores character data including stats, level, experience, and soccer attributes
- **Relationships**: One-to-one relationship between users and characters

## Recent Changes (Janeiro 2025)

### Simplificação do Sistema de Registro
- **Data**: 15/01/2025
- **Mudança**: Removido campo email obrigatório do registro
- **Detalhes**: Sistema agora requer apenas usuário e senha para criar conta
- **Impacto**: Interface mais simples, processo de registro mais rápido

### Correção do Sistema de Logout
- **Data**: 15/01/2025
- **Mudança**: Corrigido redirecionamento após logout
- **Detalhes**: Adicionado reload da página para garantir limpeza do estado
- **Impacto**: Usuário agora retorna corretamente à tela de login após logout

## Credenciais de Acesso

### Conta de Mestre (Admin)
- **Usuário**: mestre
- **Senha**: admin123
- **Permissões**: Acesso completo ao painel administrativo, visualização de todas as fichas de jogadores

## Preparação para Deploy no Render

### Correção do Erro "Cannot find module server.js"
- **Data**: 15/01/2025
- **Problema**: Render procura `/opt/render/project/src/server.js` que não existe
- **Solução**: Criado arquivo `src/server.js` que redireciona para o servidor principal
- **Resultado**: Deploy funciona com qualquer Start Command (`npm start` ou `node src/server.js`)

### Otimizações Implementadas
- **Configuração de Porta**: Sistema usa `process.env.PORT` para Render
- **Scripts de Build**: Configurados para produção (gera `dist/index.js`)
- **Variáveis de Ambiente**: Preparadas para PostgreSQL do Render
- **Documentação**: Guia completo em `RENDER_DEPLOY.md`

### Configurações Necessárias no Render
1. **PostgreSQL Database**: Configurar na mesma região do web service
2. **Environment Variables**:
   - `DATABASE_URL`: Internal Database URL do PostgreSQL
   - `NODE_ENV`: production
   - `SESSION_SECRET`: Chave secreta para sessões (mínimo 32 caracteres)
3. **Build Command**: `npm install && npm run build`
4. **Start Command**: `npm start`
5. **Node Version**: 20

### Arquivos Essenciais para Deploy
- `package.json`: Scripts de build e dependências
- `server/index.ts`: Servidor configurado para produção
- `drizzle.config.ts`: Configurações do banco
- `RENDER_DEPLOY.md`: Guia detalhado de deploy

### Benefícios do Render
- **Gratuito**: 750 horas/mês para web service
- **PostgreSQL**: 90 dias gratuito, depois ~$7/mês
- **Deploy Automático**: Conecta com Git para deploys automáticos
- **Performance**: SSL, CDN e infraestrutura global inclusos

## Key Components

### Authentication System
- Session-based authentication using express-session
- Password hashing with bcrypt
- Role-based access control (admin vs regular users)
- Middleware for protecting routes and admin-only access

### Character Management
- Character creation and customization
- Six main stats: speed, strength, stamina, shooting, passing, dribbling
- Level progression system with experience points
- Match tracking and goal statistics
- Ranking system (default starts at 299)

### Admin Panel
- User management dashboard
- System statistics overview
- Admin-only route protection

### UI Components
- Custom stat sliders for character attributes
- Character avatar system with image upload capabilities
- Responsive design with mobile support
- Toast notifications for user feedback
- Dark theme with Blue Lock aesthetic

## Data Flow

1. **Authentication Flow**: User registration/login → Session creation → Route access control
2. **Character Management**: Character creation → Stat customization → Data persistence → Real-time updates
3. **Admin Operations**: Admin authentication → User data retrieval → System statistics display

## External Dependencies

### Frontend Dependencies
- **UI Components**: @radix-ui/* components for accessible UI primitives
- **State Management**: @tanstack/react-query for server state
- **Form Handling**: @hookform/resolvers for form validation
- **Icons**: Font Awesome (referenced in components)
- **Styling**: Tailwind CSS with custom configuration

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: drizzle-orm for database operations
- **Authentication**: bcrypt for password hashing
- **Sessions**: express-session with connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod schemas shared between frontend and backend

### Development Dependencies
- **Build Tools**: esbuild for server bundling, Vite for client bundling
- **TypeScript**: Full TypeScript support across the stack
- **Development**: tsx for TypeScript execution, replit-specific plugins

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds the React app to `dist/public`
- **Backend**: esbuild bundles the Express server to `dist/index.js`
- **Database**: Drizzle migrations system for schema management

### Environment Configuration
- **Database**: Uses `DATABASE_URL` environment variable for Neon PostgreSQL
- **Sessions**: Configurable session secret via `SESSION_SECRET`
- **Development**: Replit-specific development banner and tooling

### Production Considerations
- Static file serving for the built React application
- PostgreSQL session persistence
- Secure session configuration (httpOnly, secure flags)
- Error handling middleware for graceful error responses

The application is designed to be deployed on Replit with automatic database provisioning through Neon PostgreSQL, making it easy to get up and running with minimal configuration.