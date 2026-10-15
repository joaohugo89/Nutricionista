/* =========================================================================
   ANIMAÇÕES DE ENTRADA NO SCROLL
   -------------------------------------------------------------------------
   <Reveal>        → fade-in com deslocamento no eixo Y
   <Stagger>       → container que anima os filhos em cascata
   <StaggerItem>   → cada filho da cascata
   Ajuste DESLOCAMENTO_Y e DURACAO para deixar mais ou menos dramático.
   ========================================================================= */
import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const DESLOCAMENTO_Y = 28;
const DURACAO = 0.7;
const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: DESLOCAMENTO_Y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: DURACAO, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  oculto: {},
  visivel: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } },
};

const itemVariants: Variants = {
  oculto: { opacity: 0, y: DESLOCAMENTO_Y },
  visivel: { opacity: 1, y: 0, transition: { duration: DURACAO, ease: EASE } },
};

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/** Rótulo pequeno em caixa alta usado acima dos títulos das seções. */
export function Olho({ children }: { children: ReactNode }) {
  return (
    <span className="badge bg-terracota/10 text-terracota">
      <span className="h-1.5 w-1.5 rounded-full bg-terracota" />
      {children}
    </span>
  );
}
