/* =========================================================================
   SOBRE A NUTRICIONISTA — foto em card + citação + pilares
   Conteúdo: data/site.ts → `sobre`
   ========================================================================= */
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { brand, sobre, whatsappLink } from '../data/site';
import { Olho, Reveal, Stagger, StaggerItem } from './Reveal';
import { useSelecao } from '../lib/selection';

export default function About() {
  const { irParaContato } = useSelecao();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <section id="sobre" className="scroll-mt-28 py-20 sm:py-28">
      <div className="shell">
        <Reveal>
          <h2 className="font-display max-w-2xl text-balance text-3xl leading-[1.15] sm:text-[2.6rem]">
            {sobre.titulo[0]}
            <span className="block italic text-oliva">{sobre.titulo[1]}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* --- Foto da profissional (ALTERE AQUI em data/site.ts) --- */}
          <Reveal>
            <motion.figure
              whileHover={{ rotate: -1.2, y: -6 }}
              transition={{ type: 'spring', stiffness: 160, damping: 18 }}
              className="card-organic relative overflow-hidden p-3"
            >
              <img
                src={sobre.foto}
                alt={`${brand.nome}, ${brand.papel}`}
                loading="lazy"
                className="h-[380px] w-full rounded-[1.6rem] object-cover sm:h-[460px]"
              />
              <figcaption className="absolute bottom-6 left-6 right-6 rounded-organic border border-white/50 bg-creme/90 px-5 py-4 backdrop-blur-md">
                <p className="font-display text-lg leading-tight">{brand.nome}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-suave">
                  {brand.papel} · {brand.registro}
                </p>
              </figcaption>
            </motion.figure>
          </Reveal>

          <div className="space-y-6">
            {/* --- Citação em destaque --- */}
            <Reveal delay={0.1}>
              <blockquote className="card-organic bg-oliva/10 p-7 sm:p-9">
                <p className="font-display text-balance text-xl italic leading-snug text-tinta sm:text-2xl">
                  “{sobre.citacao}”
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-4 text-[15px] leading-relaxed text-suave">
                {sobre.texto.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>

            {/* --- Pilares --- */}
            <Stagger className="grid gap-3 sm:grid-cols-2">
              {sobre.pilares.map((pilar) => (
                <StaggerItem key={pilar.titulo}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="h-full rounded-organic border border-areia/70 bg-white/60 p-5 transition-shadow hover:shadow-soft"
                  >
                    <Olho>{pilar.titulo}</Olho>
                    <p className="mt-3 text-sm leading-relaxed text-suave">{pilar.texto}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1}>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  ref={btnRef}
                  onClick={() => irParaContato(btnRef.current, {})}
                  className="btn-primary"
                >
                  Quero começar meu acompanhamento
                </button>
                <a
                  href={whatsappLink('Olá! Gostaria de tirar uma dúvida antes de agendar.')}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  Tirar uma dúvida rápida
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
