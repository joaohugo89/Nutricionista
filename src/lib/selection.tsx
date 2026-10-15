/* =========================================================================
   SELEÇÃO + ANIMAÇÃO "EXPAND-TO-CONTACT"
   -------------------------------------------------------------------------
   Guarda o plano/etapa que o visitante clicou e executa a transição:
     1. o card clicado "cresce" até cobrir a tela (morph);
     2. a tela se abre ao meio (split) como uma cortina;
     3. durante a abertura, a página rola até a seção de contato;
     4. o formulário recebe o plano/etapa já preenchido e destaca o campo.

   Para ajustar a velocidade da animação, mexa em DURACAO_* abaixo.
   ========================================================================= */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export type Selecao = {
  /** Nome do plano escolhido (ou undefined se veio de uma etapa da jornada) */
  plano?: string;
  /** Nome da etapa da metodologia, quando o clique veio da seção Jornada */
  etapa?: string;
  /** Carimbo usado só para re-disparar o destaque visual no formulário */
  token: number;
};

type Ctx = {
  selecao: Selecao;
  /** Dispara a animação a partir do elemento clicado e leva ao formulário. */
  irParaContato: (origem: HTMLElement | null, dados: Omit<Selecao, 'token'>) => void;
};

/* --- Velocidades (segundos) --- */
const DURACAO_MORPH = 0.55;
const DURACAO_SPLIT = 0.7;

const SelecaoContext = createContext<Ctx | null>(null);

export function useSelecao() {
  const ctx = useContext(SelecaoContext);
  if (!ctx) throw new Error('useSelecao precisa estar dentro de <SelecaoProvider>');
  return ctx;
}

type Rect = { top: number; left: number; width: number; height: number };

export function SelecaoProvider({ children }: { children: ReactNode }) {
  const [selecao, setSelecao] = useState<Selecao>({ token: 0 });
  const [rect, setRect] = useState<Rect | null>(null);
  const [fase, setFase] = useState<'morph' | 'split'>('morph');
  const ocupado = useRef(false);
  const reduzirMovimento = useReducedMotion();

  const rolarAteContato = useCallback(() => {
    const alvo = document.getElementById('contato');
    alvo?.scrollIntoView({ behavior: reduzirMovimento ? 'auto' : 'smooth', block: 'start' });
  }, [reduzirMovimento]);

  const irParaContato = useCallback<Ctx['irParaContato']>(
    (origem, dados) => {
      setSelecao({ ...dados, token: Date.now() });

      // Acessibilidade / preferência do usuário: sem animação, só rola.
      if (reduzirMovimento || !origem) {
        rolarAteContato();
        return;
      }
      if (ocupado.current) return;
      ocupado.current = true;

      const r = origem.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
      setFase('morph');
    },
    [reduzirMovimento, rolarAteContato],
  );

  const valor = useMemo(() => ({ selecao, irParaContato }), [selecao, irParaContato]);

  return (
    <SelecaoContext.Provider value={valor}>
      {children}

      {/* Cortina da transição — fica por cima de tudo, sem bloquear cliques depois */}
      <AnimatePresence>
        {rect && (
          <motion.div
            key="cortina"
            className="pointer-events-none fixed inset-0 z-[90]"
            aria-hidden
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="absolute"
              initial={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
              animate={{ top: 0, left: 0, width: '100vw', height: '100vh' }}
              transition={{ duration: DURACAO_MORPH, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={() => {
                // Fim do morph: rola a página por trás da cortina e abre ao meio.
                rolarAteContato();
                setFase('split');
              }}
            >
              {(['topo', 'base'] as const).map((metade) => (
                <motion.div
                  key={metade}
                  className="absolute inset-x-0 h-1/2 overflow-hidden"
                  style={metade === 'topo' ? { top: 0 } : { bottom: 0 }}
                  animate={
                    fase === 'split'
                      ? { y: metade === 'topo' ? '-100%' : '100%' }
                      : { y: 0 }
                  }
                  transition={{ duration: DURACAO_SPLIT, ease: [0.76, 0, 0.24, 1] }}
                  onAnimationComplete={() => {
                    if (fase !== 'split' || metade !== 'base') return;
                    setRect(null);
                    ocupado.current = false;
                  }}
                >
                  {/* Textura da cortina: gradiente do tema */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(120% 140% at 50% 50%, hsl(var(--c-goiaba)) 0%, hsl(var(--c-terracota)) 45%, hsl(var(--c-oliva)) 110%)',
                      borderBottom:
                        metade === 'topo' ? '1px solid hsl(var(--c-creme) / 0.35)' : undefined,
                      borderTop:
                        metade === 'base' ? '1px solid hsl(var(--c-creme) / 0.35)' : undefined,
                    }}
                  />
                  <div
                    className="absolute inset-x-0 flex items-center justify-center"
                    style={metade === 'topo' ? { bottom: 0 } : { top: 0 }}
                  >
                    <span className="font-display px-6 pb-4 pt-4 text-center text-2xl text-creme/90 sm:text-3xl">
                      {metade === 'topo' ? 'Vamos conversar' : 'sobre a sua saúde'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SelecaoContext.Provider>
  );
}
