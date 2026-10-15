/** @type {import('tailwindcss').Config} */
/* =========================================================================
   TOKENS DO TEMA — ALTERE AQUI PARA REVENDER O TEMPLATE
   Os valores HSL vivem em src/styles/theme.css (variáveis CSS).
   Aqui apenas damos nomes amigáveis para usar nas classes do Tailwind.
   ========================================================================= */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        terracota: 'hsl(var(--c-terracota) / <alpha-value>)',
        goiaba: 'hsl(var(--c-goiaba) / <alpha-value>)',
        oliva: 'hsl(var(--c-oliva) / <alpha-value>)',
        sage: 'hsl(var(--c-sage) / <alpha-value>)',
        creme: 'hsl(var(--c-creme) / <alpha-value>)',
        areia: 'hsl(var(--c-areia) / <alpha-value>)',
        tinta: 'hsl(var(--c-tinta) / <alpha-value>)',
        suave: 'hsl(var(--c-suave) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: { organic: '2rem', pill: '999px' },
      boxShadow: {
        soft: '0 18px 50px -24px hsl(var(--c-tinta) / 0.25)',
        lift: '0 32px 70px -30px hsl(var(--c-tinta) / 0.35)',
      },
      keyframes: {
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(6%,-8%,0) scale(1.12)' },
          '66%': { transform: 'translate3d(-7%,5%,0) scale(0.94)' },
        },
      },
      animation: { drift: 'drift 22s ease-in-out infinite' },
    },
  },
  plugins: [],
};
