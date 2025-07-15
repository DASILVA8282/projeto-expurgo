// Arquivo de compatibilidade para deploy no Render
// Este arquivo redireciona para o servidor principal compilado

import('../dist/index.js').catch(err => {
  console.error('Erro ao carregar o servidor:', err);
  process.exit(1);
});