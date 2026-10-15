/* =========================================================================
   FORMATOS DE ACOMPANHAMENTO (PLANOS)
   Cada card inteiro é clicável: dispara a animação de expansão e leva ao
   formulário com o plano já selecionado.
   Preços e itens: data/site.ts → `planos`
   ========================================================================= */
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { planos, type Plano } from '../data/site';
import { Olho, Reveal } from './Reveal';
import { useSelecao } from '../lib/selection';

export default function Pricing() {
  return (
    <section id="planos" className="scroll-mt-28 py-20 sm:py-28">
      <div className="shell">
        <Reveal>
          <div className="text-center">
            <Olho>Investimento</Olho>
            <h2 className="font-display mx-auto mt-4 max-w-2xl text-balance text-3xl leading-[1.15] sm:text-[2.6rem]">
              Formatos de Acompanhamento
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-suave">
              Escolha o formato e clique no card: o formulário abre com o plano já selecionado.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid items-start gap-5 lg:grid-cols-3">
          {planos.map((plano, i) => (
            <Reveal key={plano.id} delay={i * 0.1}>
              <CardPlano plano={plano} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-[13px] text-suave">
            Todos os formatos incluem material de apoio em PDF e podem ser parcelados em até 3x.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CardPlano({ plano }: { plano: Plano }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { irParaContato } = useSelecao();
  const escolher = () => irParaContato(cardRef.current, { plano: plano.nome });

  return (
    <motion.div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={escolher}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          escolher();
        }
      }}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 190, damping: 22 }}
      aria-label={`Selecionar o plano ${plano.nome} e ir para o agendamento`}
      className={[
        'relative flex h-full cursor-pointer flex-col rounded-organic border p-7 shadow-soft',
        'transition-shadow duration-300 hover:shadow-lift focus:outline-none',
        'focus-visible:ring-2 focus-visible:ring-terracota/60 focus-visible:ring-offset-2 sm:p-8',
        plano.destaque
          ? 'border-oliva/40 bg-oliva text-creme lg:-mt-6 lg:mb-6'
          : 'border-areia/70 bg-white/70 backdrop-blur-sm',
      ].join(' ')}
    >
      {/* Selo do plano em destaque */}
      {plano.selo && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-terracota px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-soft">
          {plano.selo}
        </span>
      )}

      <span
        className={[
          'badge self-start',
          plano.destaque ? 'bg-creme/20 text-creme' : 'bg-terracota/10 text-terracota',
        ].join(' ')}
      >
        {plano.etiqueta}
      </span>

      <h3 className="font-display mt-5 text-2xl leading-tight">{plano.nome}</h3>
      <p
        className={[
          'mt-2 text-sm leading-relaxed',
          plano.destaque ? 'text-creme/80' : 'text-suave',
        ].join(' ')}
      >
        {plano.resumo}
      </p>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-4xl">{plano.preco}</span>
        <span className={['text-xs', plano.destaque ? 'text-creme/70' : 'text-suave'].join(' ')}>
          {plano.periodo}
        </span>
      </div>

      <ul className="mt-6 flex-1 space-y-2.5">
        {plano.itens.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[13px] leading-relaxed">
            <svg
              viewBox="0 0 20 20"
              className={[
                'mt-0.5 h-4 w-4 shrink-0',
                plano.destaque ? 'text-sage' : 'text-oliva',
              ].join(' ')}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={plano.destaque ? 'text-creme/90' : 'text-suave'}>{item}</span>
          </li>
        ))}
      </ul>

      <span
        className={[
          'btn mt-7 w-full',
          plano.destaque
            ? 'bg-creme text-oliva hover:bg-white'
            : 'bg-terracota text-white hover:bg-terracota/90',
        ].join(' ')}
      >
        Quero este formato
      </span>
    </motion.div>
  );
}
