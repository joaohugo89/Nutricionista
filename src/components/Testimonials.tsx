/* =========================================================================
   DEPOIMENTOS — estrelas, foto, métrica
   Conteúdo: data/site.ts → `depoimentos`
   ========================================================================= */
import { motion } from 'framer-motion';
import { depoimentos } from '../data/site';
import { Olho, Reveal, Stagger, StaggerItem } from './Reveal';

function Estrelas() {
  return (
    <div className="flex gap-0.5" aria-label="Avaliação 5 de 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 text-terracota" fill="currentColor" aria-hidden>
          <path d="M10 1.8l2.4 5 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L2.2 7.6l5.4-.8z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="depoimentos" className="scroll-mt-28 py-20 sm:py-28">
      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Olho>Depoimentos</Olho>
              <h2 className="font-display mt-4 max-w-xl text-balance text-3xl leading-[1.15] sm:text-[2.6rem]">
                Histórias de quem reaprendeu
                <span className="block italic text-oliva">a comer com calma</span>
              </h2>
            </div>
            <p className="max-w-xs text-[13px] leading-relaxed text-suave">
              Resultados individuais variam. Os relatos abaixo foram publicados com autorização.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
          {depoimentos.map((d) => (
            <StaggerItem key={d.nome} className="h-full">
              <motion.figure
                whileHover={{ y: -8, rotate: -0.6 }}
                transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                className="card-organic flex h-full flex-col p-7"
              >
                <Estrelas />
                <blockquote className="mt-4 flex-1 text-[14px] leading-relaxed text-suave">
                  “{d.texto}”
                </blockquote>

                <span className="badge mt-5 self-start bg-oliva/10 text-oliva">{d.metrica}</span>

                <figcaption className="mt-5 flex items-center gap-3 border-t border-areia/70 pt-5">
                  {/* ALTERE AQUI: foto do cliente em data/site.ts */}
                  <img
                    src={d.foto}
                    alt={d.nome}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-tinta">{d.nome}</span>
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-suave">
                      {d.contexto}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
