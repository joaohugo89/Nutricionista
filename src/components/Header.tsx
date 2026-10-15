/* =========================================================================
   HEADER — logo + navegação + CTA
   O menu mobile abre em painel deslizante. Links vêm de `nav` em data/site.ts
   ========================================================================= */
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { brand, nav } from '../data/site';
import { useSelecao } from '../lib/selection';
import Aviso from './Aviso';

export default function Header() {
  const [compacto, setCompacto] = useState(false);
  const [aberto, setAberto] = useState(false);
  const { scrollY } = useScroll();
  const { irParaContato } = useSelecao();
  const ctaRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, 'change', (v) => setCompacto(v > 40));

  // Trava o scroll do corpo com o menu mobile aberto.
  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [aberto]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-5"
    >
      <div className="shell">
        <div
          className={[
            'flex items-center justify-between gap-4 rounded-pill border px-4 py-2.5 transition-all duration-500 sm:px-5',
            compacto
              ? 'border-areia/80 bg-creme/85 shadow-soft backdrop-blur-xl'
              : 'border-white/30 bg-white/25 backdrop-blur-md',
          ].join(' ')}
        >
          {/* --- Logo (ALTERE AQUI: troque por <img src="/logo.svg" />) --- */}
          <a href="#topo" className="group flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-terracota text-sm font-semibold text-white transition-transform duration-300 group-hover:rotate-12">
              {brand.nome.charAt(0)}
            </span>
            <span className="font-display leading-tight">
              <span className="block text-[15px] font-semibold">{brand.nome}</span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-suave">
                {brand.papel}
              </span>
            </span>
          </a>

          {/* --- Navegação desktop --- */}
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative rounded-pill px-3.5 py-2 text-[13px] font-medium text-suave transition-colors hover:text-tinta"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              ref={ctaRef}
              onClick={() => irParaContato(ctaRef.current, {})}
              className="btn-primary hidden !px-5 !py-2.5 text-[13px] sm:inline-flex"
            >
              Agendar Consulta
            </button>

            {/* --- Botão do menu mobile --- */}
            <button
              onClick={() => setAberto((v) => !v)}
              aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={aberto}
              className="grid h-10 w-10 place-items-center rounded-full border border-tinta/15 bg-white/70 lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <motion.span
                  animate={aberto ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  className="absolute inset-x-0 top-0 h-[1.5px] rounded bg-tinta"
                />
                <motion.span
                  animate={aberto ? { opacity: 0 } : { opacity: 1 }}
                  className="absolute inset-x-0 top-[5px] h-[1.5px] rounded bg-tinta"
                />
                <motion.span
                  animate={aberto ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  className="absolute inset-x-0 top-[10px] h-[1.5px] rounded bg-tinta"
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* --- Aviso de template demonstrativo (data/site.ts → avisoDemo) --- */}
      <Aviso />

      {/* --- Painel do menu mobile --- */}
      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="shell mt-3 lg:hidden"
          >
            <div className="card-organic space-y-1 p-4">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setAberto(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-tinta transition-colors hover:bg-areia/50"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setAberto(false);
                  irParaContato(null, {});
                }}
                className="btn-primary mt-2 w-full"
              >
                Agendar Consulta
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
