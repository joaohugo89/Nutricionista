/* =========================================================================
   ANATOMIA DO PRATO FUNCIONAL
   -------------------------------------------------------------------------
   Um único prato centralizado. Sobre ele ficam 4 pontos pulsantes; ao clicar
   em um deles, abre um popup ancorado NAQUELE canto da imagem (cada alimento
   abre em um lugar diferente). No mobile o popup vira um cartão abaixo da foto.

   Posição dos pontos e canto de abertura: data/site.ts → `prato.itens[].x/y/lado`
   ========================================================================= */
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { prato, type ItemPrato } from '../data/site';
import { Olho, Reveal } from './Reveal';

/* Cores dos pontos e dos popups — usam os tokens do tema */
const CORES = {
  terracota: { ponto: 'bg-terracota', anel: 'bg-terracota/40', chip: 'bg-terracota/10 text-terracota' },
  oliva: { ponto: 'bg-oliva', anel: 'bg-oliva/40', chip: 'bg-oliva/10 text-oliva' },
  sage: { ponto: 'bg-sage', anel: 'bg-sage/50', chip: 'bg-sage/25 text-oliva' },
} as const;

/* Onde o popup encosta na imagem, conforme o campo `lado` do item.
   Os valores negativos fazem o card "vazar" um pouco para fora do prato. */
const ANCORA = {
  'cima-esq': 'right-[58%] bottom-[56%] origin-bottom-right',
  'cima-dir': 'left-[58%] bottom-[56%] origin-bottom-left',
  'baixo-esq': 'right-[58%] top-[56%] origin-top-right',
  'baixo-dir': 'left-[58%] top-[56%] origin-top-left',
} as const;

/* No mobile não há espaço para ancorar: o popup entra no fluxo, abaixo da foto. */
const MOBILE = 'relative mt-6 origin-top';

/** Detecta se há espaço para ancorar o popup ao lado do prato. */
function useAncoragem(minimo = 640) {
  const [podeAncorar, setPodeAncorar] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= minimo : true,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minimo}px)`);
    const ouvir = () => setPodeAncorar(mq.matches);
    ouvir();
    mq.addEventListener('change', ouvir);
    return () => mq.removeEventListener('change', ouvir);
  }, [minimo]);
  return podeAncorar;
}

export default function Plate() {
  const [ativoId, setAtivoId] = useState<string | null>(null);
  const ativo = prato.itens.find((i) => i.id === ativoId) ?? null;
  const areaRef = useRef<HTMLDivElement>(null);
  const podeAncorar = useAncoragem();

  /* Fecha ao clicar fora do prato ou com a tecla Esc */
  useEffect(() => {
    if (!ativoId) return;
    const porFora = (e: MouseEvent) => {
      if (!areaRef.current?.contains(e.target as Node)) setAtivoId(null);
    };
    const porTecla = (e: KeyboardEvent) => e.key === 'Escape' && setAtivoId(null);
    document.addEventListener('mousedown', porFora);
    document.addEventListener('keydown', porTecla);
    return () => {
      document.removeEventListener('mousedown', porFora);
      document.removeEventListener('keydown', porTecla);
    };
  }, [ativoId]);

  return (
    <section id="prato" className="scroll-mt-28 overflow-x-clip py-20 sm:py-28">
      <div className="shell">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Olho>Guia Alimentar</Olho>
            <h2 className="font-display mt-4 text-balance text-3xl leading-[1.15] sm:text-[2.6rem]">
              {prato.titulo}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-suave">
              {prato.subtitulo}
            </p>
          </div>
        </Reveal>

        {/* --- Prato central + pontos clicáveis --- */}
        <Reveal delay={0.1}>
          <div ref={areaRef} className="relative mx-auto mt-14 max-w-[560px] sm:mt-36">
            {/* Halo decorativo atrás do prato */}
            <div className="pointer-events-none absolute -inset-4 -z-[1] rounded-full bg-sage/20 blur-3xl sm:-inset-10" />

            <motion.figure
              animate={{ scale: ativo ? 0.985 : 1 }}
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              className="relative aspect-square overflow-hidden rounded-full border-[10px] border-white/80 shadow-lift"
            >
              <img
                src={prato.foto}
                alt="Prato funcional montado"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              {/* Escurece levemente a foto quando um popup está aberto */}
              <motion.div
                className="pointer-events-none absolute inset-0 bg-tinta"
                animate={{ opacity: ativo ? 0.22 : 0 }}
                transition={{ duration: 0.35 }}
              />
            </motion.figure>

            {/* Pontos sobre o prato */}
            {prato.itens.map((item) => (
              <Ponto
                key={item.id}
                item={item}
                ativo={ativoId === item.id}
                onClick={() => setAtivoId((atual) => (atual === item.id ? null : item.id))}
              />
            ))}

            {/* Popup ancorado (somente a partir de sm) */}
            <AnimatePresence>
              {ativo && (
                <motion.div
                  key={ativo.id}
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  className={[
                    'z-20',
                    podeAncorar ? `absolute w-[300px] ${ANCORA[ativo.lado]}` : MOBILE,
                  ].join(' ')}
                >
                  <Popup item={ativo} onFechar={() => setAtivoId(null)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* --- Atalhos em texto (acessibilidade + alternativa aos pontos) --- */}
        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-wrap justify-center gap-2.5 sm:mt-28">
            {prato.itens.map((item) => {
              const estaAtivo = ativoId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAtivoId((atual) => (atual === item.id ? null : item.id))}
                  aria-pressed={estaAtivo}
                  className={[
                    'badge px-4 py-2 text-[11px] transition-all duration-300',
                    estaAtivo
                      ? `${CORES[item.cor].ponto} text-white`
                      : `${CORES[item.cor].chip} hover:-translate-y-0.5`,
                  ].join(' ')}
                >
                  <span
                    className={[
                      'h-1.5 w-1.5 rounded-full',
                      estaAtivo ? 'bg-white/80' : 'bg-current',
                    ].join(' ')}
                  />
                  {item.tag}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------- Ponto pulsante sobre a foto ---------------------- */
function Ponto({
  item,
  ativo,
  onClick,
}: {
  item: ItemPrato;
  ativo: boolean;
  onClick: () => void;
}) {
  const cor = CORES[item.cor];
  return (
    <button
      onClick={onClick}
      aria-label={`Ver informações sobre ${item.titulo}`}
      aria-expanded={ativo}
      style={{ left: `${item.x}%`, top: `${item.y}%` }}
      className="absolute z-10 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      {/* Anel que pulsa para indicar que é clicável */}
      <span
        className={[
          'absolute h-9 w-9 rounded-full',
          cor.anel,
          ativo ? 'animate-none scale-110' : 'animate-ping',
        ].join(' ')}
      />
      <motion.span
        animate={{ scale: ativo ? 1.35 : 1 }}
        whileHover={{ scale: 1.25 }}
        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        className={[
          'relative grid h-6 w-6 place-items-center rounded-full border-2 border-white/90 shadow-soft',
          cor.ponto,
        ].join(' ')}
      >
        <motion.span
          animate={{ rotate: ativo ? 45 : 0 }}
          className="block h-[9px] w-[1.5px] rounded bg-white"
        />
        <motion.span
          animate={{ rotate: ativo ? 45 : 0 }}
          className="absolute block h-[1.5px] w-[9px] rounded bg-white"
        />
      </motion.span>
    </button>
  );
}

/* ------------------------- Conteúdo do popup ------------------------- */
function Popup({ item, onFechar }: { item: ItemPrato; onFechar: () => void }) {
  return (
    <div className="rounded-organic border border-areia/80 bg-creme/95 p-6 shadow-lift backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <span className={['badge', CORES[item.cor].chip].join(' ')}>{item.tag}</span>
        <button
          onClick={onFechar}
          aria-label="Fechar"
          className="-mr-1 -mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full text-suave transition-colors hover:bg-areia/60 hover:text-tinta"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <h3 className="font-display mt-3 text-xl leading-tight">{item.titulo}</h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-suave">{item.resumo}</p>

      <ul className="mt-4 space-y-2">
        {item.beneficios.map((b, i) => (
          <motion.li
            key={b}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
            className="flex items-start gap-2.5 rounded-xl bg-white/70 px-3.5 py-2.5 text-[13px] text-tinta"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-oliva" />
            {b}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
