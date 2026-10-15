/* =========================================================================
   HERO — título, CTA e grade com 3 fotos + badges
   Fotos e textos: data/site.ts → `hero`
   ========================================================================= */
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { hero, whatsappLink } from '../data/site';
import { useSelecao } from '../lib/selection';

export default function Hero() {
  const { irParaContato } = useSelecao();
  const ctaRef = useRef<HTMLButtonElement>(null);

  return (
    <section id="topo" className="relative pb-20 pt-44 sm:pt-48">
      {/* Camada quente só atrás do hero, lembrando o bloco goiaba da referência */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-[5] h-[78%] bg-gradient-to-b from-goiaba/70 via-goiaba/35 to-transparent" />

      <div className="shell text-center">
        <motion.h1
          className="font-display text-balance text-[2.1rem] leading-[1.12] sm:text-5xl lg:text-[3.4rem]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.titulo.map((linha, i) => (
            <span key={linha} className={i === 1 ? 'block italic text-terracota' : 'block'}>
              {linha}
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-suave sm:text-base"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.subtitulo}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            ref={ctaRef}
            onClick={() => irParaContato(ctaRef.current, {})}
            className="btn-primary w-full sm:w-auto"
          >
            {hero.cta}
          </button>
          {/* ALTERE AQUI: o número do WhatsApp fica em data/site.ts */}
          <a
            href={whatsappLink('Olá! Vim pelo site e gostaria de saber mais sobre as consultas.')}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost w-full sm:w-auto"
          >
            Falar no WhatsApp
          </a>
        </motion.div>
      </div>

      {/* --- Grade com 3 fotos --- */}
      <div className="shell mt-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {hero.fotos.map((foto, i) => (
            <motion.figure
              key={foto.src}
              initial={{ opacity: 0, y: 44, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className={[
                'group relative overflow-hidden rounded-organic border-4 border-white/70 shadow-soft',
                i === 1 ? 'sm:-mt-6 sm:mb-6' : '',
              ].join(' ')}
            >
              <img
                src={foto.src}
                alt={foto.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="h-56 w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105 sm:h-64 lg:h-72"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tinta/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.figure>
          ))}
        </div>

        {/* --- Badges informativas --- */}
        <motion.ul
          className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.95 }}
        >
          {hero.badges.map((b) => (
            <li
              key={b}
              className="badge border border-white/60 bg-white/60 text-[10px] text-tinta backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-oliva" />
              {b}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
