/* =========================================================================
   FUNDO MULTICOR (MESH GRADIENT ANIMADO)
   -------------------------------------------------------------------------
   Quatro "manchas" de cor desfocadas que flutuam em loop e ainda se deslocam
   conforme o scroll da página. Fica fixo atrás de todo o conteúdo.
   Para mudar as cores, edite as variáveis em src/styles/theme.css.
   ========================================================================= */
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function FluidBackground() {
  const { scrollYProgress } = useScroll();

  // Suaviza o progresso do scroll para o gradiente "respirar" sem travar.
  const progresso = useSpring(scrollYProgress, { stiffness: 60, damping: 24, mass: 0.6 });

  const subir = useTransform(progresso, [0, 1], ['0%', '-18%']);
  const descer = useTransform(progresso, [0, 1], ['0%', '22%']);
  const girar = useTransform(progresso, [0, 1], [0, 28]);
  // A temperatura do fundo muda de quente (topo) para verde (fim da página).
  const veu = useTransform(progresso, [0, 1], [0.66, 0.78]);
  const frescor = useTransform(progresso, [0, 0.55, 1], [0, 0.12, 0.3]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-creme">
      {/* Mancha 1 — terracota (canto superior esquerdo) */}
      <motion.div
        style={{ y: subir, rotate: girar, filter: 'blur(90px)' }}
        className="absolute -left-[18vw] -top-[18vh] h-[70vh] w-[70vw] rounded-full bg-terracota/45 animate-drift"
      />
      {/* Mancha 2 — goiaba (direita) */}
      <motion.div
        style={{ y: descer, filter: 'blur(110px)' }}
        className="absolute -right-[22vw] top-[8vh] h-[60vh] w-[60vw] rounded-full bg-goiaba/40 animate-drift [animation-delay:-6s]"
      />
      {/* Mancha 3 — oliva (meio/baixo) */}
      <motion.div
        style={{ y: subir, filter: 'blur(120px)' }}
        className="absolute bottom-[-10vh] left-[10vw] h-[65vh] w-[65vw] rounded-full bg-oliva/30 animate-drift [animation-delay:-12s]"
      />
      {/* Mancha 4 — sage (centro, suaviza o conjunto) */}
      <motion.div
        style={{ y: descer, rotate: girar, filter: 'blur(100px)' }}
        className="absolute left-[30vw] top-[38vh] h-[55vh] w-[55vw] rounded-full bg-sage/45 animate-drift [animation-delay:-18s]"
      />

      {/* Véu creme: garante contraste de leitura por cima das manchas */}
      <motion.div
        className="absolute inset-0 bg-creme/70 backdrop-blur-[2px]"
        style={{ opacity: veu }}
      />
      {/* Grão sutil: tira o aspecto "plástico" do gradiente */}
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Matiz que acompanha o scroll (quente → fresco) */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: frescor,
          background: 'linear-gradient(180deg, transparent, hsl(var(--c-sage) / 0.6))',
        }}
      />
    </div>
  );
}
