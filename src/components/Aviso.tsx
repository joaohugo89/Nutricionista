/* =========================================================================
   AVISO DE TEMPLATE DEMONSTRATIVO
   -------------------------------------------------------------------------
   Faixa fina logo abaixo do menu, deixando claro que o conteúdo é fictício.
   Para desligar na entrega final: data/site.ts → `avisoDemo.ativo = false`.
   ========================================================================= */
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { avisoDemo } from '../data/site';

export default function Aviso() {
  const [visivel, setVisivel] = useState(avisoDemo.ativo);

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shell mt-2"
        >
          <div
            role="note"
            className="flex items-start gap-3 rounded-pill border border-terracota/25 bg-creme/90 px-4 py-2 shadow-soft backdrop-blur-xl sm:items-center"
          >
            {/* Ícone de informação */}
            <svg
              viewBox="0 0 20 20"
              className="mt-0.5 h-4 w-4 shrink-0 text-terracota sm:mt-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden
            >
              <circle cx="10" cy="10" r="8" />
              <path d="M10 9v4.5M10 6.4v.2" strokeLinecap="round" />
            </svg>

            <p className="flex-1 text-[11px] leading-snug text-suave sm:text-[12px]">
              <strong className="font-semibold uppercase tracking-[0.12em] text-terracota">
                {avisoDemo.rotulo}:
              </strong>{' '}
              <span className="hidden sm:inline">{avisoDemo.texto}</span>
              <span className="sm:hidden">{avisoDemo.textoCurto}</span>
            </p>

            <button
              onClick={() => setVisivel(false)}
              aria-label="Fechar aviso"
              className="-mr-1 grid h-6 w-6 shrink-0 place-items-center rounded-full text-suave transition-colors hover:bg-areia/70 hover:text-tinta"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden
              >
                <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
