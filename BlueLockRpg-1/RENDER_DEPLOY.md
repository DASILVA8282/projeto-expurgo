# Deploy no Render - Guia Completo

## ✅ Problema Resolvido! 

### O que foi feito
- ✅ Criado o arquivo `src/server.js` que o Render estava procurando
- ✅ Arquivo redireciona automaticamente para o servidor principal
- ✅ Agora o deploy funciona sem configurações especiais

### Solução Simples
Agora você pode usar qualquer uma dessas opções no Render:

**Opção 1 (Recomendada)**:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

**Opção 2 (Funciona também)**:
- **Build Command**: `npm install && npm run build`  
- **Start Command**: `node src/server.js`

## Configuração do Deploy

### 1. Preparação do Projeto
✅ O projeto já está configurado para deploy no Render com:
- Build script configurado no package.json
- Servidor preparado para produção  
- Database URL configurada via variável de ambiente

### 2. Configuração no Render

#### Web Service
1. Conecte seu repositório GitHub ao Render
2. **Configure EXATAMENTE estas opções**:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
   - **Node Version**: `20`
   - **Root Directory**: deixe em branco (usar raiz do projeto)

#### ✅ Agora qualquer um destes funciona:
- ✅ **Start Command**: `npm start` (recomendado)
- ✅ **Start Command**: `node src/server.js` (também funciona)

### Por que funcionou?
O arquivo `src/server.js` foi criado e automaticamente carrega o servidor compilado em `dist/index.js`

#### Database PostgreSQL
1. Crie um PostgreSQL database no Render (mesma região do web service)
2. Copie a "Internal Database URL" 

### 3. Variáveis de Ambiente
Configure estas variáveis no Render:

```
DATABASE_URL=sua_internal_database_url_aqui
NODE_ENV=production
SESSION_SECRET=sua_chave_secreta_aqui_minimo_32_caracteres
```

### 4. Deploy
1. Primeiro deploy do database
2. Depois deploy do web service
3. O sistema criará automaticamente o usuário admin: mestre/admin123

### 5. Pós-Deploy
- Acesse `/admin` com mestre/admin123
- Crie novos usuários e personagens
- Sistema totalmente funcional

## Estrutura de Arquivos para Produção
- `dist/index.js` - Servidor bundleado
- `dist/public/` - Frontend estático
- `package.json` - Dependências e scripts

## Custo Estimado
- Web Service: Gratuito (750h/mês)
- PostgreSQL: 90 dias grátis, depois ~$7/mês