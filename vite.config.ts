import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/* =========================================================================
   BASE DO SITE (GitHub Pages)
   -------------------------------------------------------------------------
   No GitHub Actions a variável GITHUB_REPOSITORY vale "usuario/repositorio",
   então a base vira "/repositorio/" automaticamente — não precisa editar nada
   ao renomear o repositório ou usar o template em outro projeto.

   Em domínio próprio ou no repositório "usuario.github.io", rode o build com
   BASE_URL=/ (ou troque o fallback abaixo por '/').
   ========================================================================= */
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = process.env.BASE_URL ?? (repo ? `/${repo}/` : '/');

export default defineConfig({
  base,
  plugins: [react()],
});
