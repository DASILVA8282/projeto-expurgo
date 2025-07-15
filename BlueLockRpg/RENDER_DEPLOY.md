# Guia de Deploy no Render - Blue Lock RPG

## Pré-requisitos
- Conta no Render (gratuita)
- Repositório Git com o código do projeto

## Passos para Deploy

### 1. Preparar o Repositório
Certifique-se de que os seguintes arquivos estão commitados:
- `package.json` (com scripts build e start)
- Todo o código fonte
- `drizzle.config.ts`

### 2. Criar Database PostgreSQL no Render

1. Acesse [render.com](https://render.com) e faça login
2. Clique em **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `blue-lock-db` (ou nome de sua escolha)
   - **Database**: `blue_lock_rpg`
   - **User**: `admin`
   - **Region**: Escolha a região mais próxima
   - **PostgreSQL Version**: 14 ou superior
   - **Instance Type**: Free (tem limitação de 90 dias)

4. Após criar, copie a **Internal Database URL** da seção Connections

### 3. Deploy do Web Service

1. No Render, clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório Git
3. Configure:
   - **Name**: `blue-lock-rpg`
   - **Region**: **MESMA REGIÃO** do banco de dados
   - **Branch**: `main` (ou sua branch principal)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### 4. Configurar Variáveis de Ambiente

Na seção **Environment Variables**, adicione:

```
DATABASE_URL=<sua_internal_database_url_aqui>
NODE_ENV=production
SESSION_SECRET=<uma_chave_secreta_forte_aqui>
```

**Importante**: Use a **Internal Database URL** (não a External) para melhor performance.

### 5. Deploy Automático

1. Clique em **"Create Web Service"**
2. O Render irá automaticamente:
   - Fazer clone do repositório
   - Executar `npm install && npm run build`
   - Iniciar o servidor com `npm start`

### 6. Primeira Execução - Configurar Database

Após o primeiro deploy bem-sucedido:

1. Acesse o shell do seu web service no Render
2. Execute as migrações do banco:
   ```bash
   npm run db:push
   ```

Ou conecte-se diretamente ao PostgreSQL e execute as migrações manualmente.

## URLs de Acesso

Após o deploy:
- **URL do Site**: `https://sua-app.onrender.com`
- **Painel Admin**: `https://sua-app.onrender.com` (fazer login com mestre/admin123)

## Credenciais de Acesso

### Conta Mestre (Admin)
- **Usuário**: mestre
- **Senha**: admin123

## Limitações do Plano Gratuito

### PostgreSQL Free
- **Duração**: 90 dias
- **Conexões**: Limitadas
- **Storage**: 1GB

### Web Service Free
- **Horas**: 750 por mês
- **Sleep**: Aplicação "dorme" após 15min sem atividade
- **CPU/RAM**: Limitados

## Dicas de Otimização

1. **Mesma Região**: Database e Web Service devem estar na mesma região
2. **Internal URL**: Use sempre a Internal Database URL para conectar
3. **Environment Variables**: Mantenha as variáveis sensíveis no painel do Render
4. **Monitoring**: Acompanhe os logs pelo painel do Render

## Deploy Automático

O Render fará deploy automático sempre que você fizer push para a branch configurada (geralmente `main`).

## Troubleshooting

### Erro de Conexão Database
- Verifique se usou a Internal Database URL
- Confirme que database e web service estão na mesma região

### Build Errors
- Verifique se todas as dependências estão no `package.json`
- Confirme que os scripts `build` e `start` estão corretos

### App não carrega
- Verifique se a porta está configurada corretamente (usar `process.env.PORT`)
- Confira os logs no painel do Render

## Schema do Banco de Dados

O sistema criará automaticamente as seguintes tabelas:
- `users` - Usuários do sistema
- `characters` - Personagens dos jogadores
- `session` - Sessões de login

## Backup e Restauração

Para fazer backup dos dados:
1. Use a External Database URL para conectar
2. Exporte com `pg_dump`
3. Guarde o arquivo SQL em local seguro

---

**Nota**: Este projeto está otimizado para funcionar perfeitamente no Render com configuração mínima. O sistema já está preparado para produção com as melhores práticas de segurança e performance.