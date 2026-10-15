/* =========================================================================
   JORNADA — 4 etapas em cards orgânicos
   O botão "Quer saber mais sobre este processo" dispara a animação de
   expansão e leva o visitante ao formulário já com a etapa selecionada.
   Conteúdo: data/site.ts → `jornada`
   ========================================================================= */
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { jornada, type Etapa } from '../data/site';
import { Olho, Reveal } from './Reveal';
import { useSelecao } from '../lib/selection';

/* Alterna o fundo dos cards para criar o ritmo visual da referência */
const FUNDOS = ['bg-terracota/10', 'bg-sage/25', 'bg-areia/60', 'bg-oliva/10'];

export default function Journey() {
  return (
    <section id="jornada" className="scroll-mt-28 py-20 sm:py-28">
      <div className="shell">
        <Reveal>
          <Olho>Metodologia</Olho>
          <h2 className="font-display mt-4 max-w-3xl text-balance text-3xl leading-[1.15] sm:text-[2.6rem]">
            {jornada.titulo[0]}
            <span className="block italic text-oliva">{jornada.titulo[1]}</span>
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-suave">
            {jornada.subtitulo}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {jornada.etapas.map((etapa, i) => (
            <Reveal key={etapa.numero} delay={i * 0.08}>
              <CardEtapa etapa={etapa} fundo={FUNDOS[i % FUNDOS.length]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardEtapa({ etapa, fundo }: { etapa: Etapa; fundo: string }) {
  const [aberto, setAberto] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { irParaContato } = useSelecao();

  return (
    <motion.article
      ref={cardRef}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 180, damping: 20 }}
      className={[
        'group h-full rounded-organic border border-areia/70 p-7 shadow-soft transition-shadow hover:shadow-lift sm:p-8',
        fundo,
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-display text-4xl leading-none text-terracota/70">{etapa.numero}</span>
        <span className="badge bg-white/70 text-[10px] text-suave">{etapa.periodo}</span>
      </div>

      <h3 className="font-display mt-5 text-xl leading-tight sm:text-2xl">{etapa.titulo}</h3>
      <p className="mt-3 text-sm leading-relaxed text-suave">{etapa.texto}</p>

      {/* --- Sanfona com os marcos da etapa --- */}
      <AnimatePresence initial={false}>
        {aberto && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 space-y-2 overflow-hidden"
          >
            {etapa.marcos.map((m) => (
              <li
                key={m}
                className="flex items-center gap-2.5 rounded-pill bg-white/70 px-4 py-2 text-[13px] text-tinta"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-oliva" />
                {m}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setAberto((v) => !v)}
          className="btn-ghost !px-4 !py-2 text-[12px]"
          aria-expanded={aberto}
        >
          {aberto ? 'Fechar detalhes' : 'Ver o que inclui'}
        </button>

        {/* ✨ Dispara a animação de expansão + scroll para o formulário */}
        <button
          onClick={() => irParaContato(cardRef.current, { etapa: `${etapa.numero} · ${etapa.titulo}` })}
          className="btn !px-4 !py-2 text-[12px] font-semibold text-terracota underline-offset-4 hover:underline"
        >
          Quer saber mais sobre este processo →
        </button>
      </div>
    </motion.article>
  );
}
