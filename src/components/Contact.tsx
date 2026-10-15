/* =========================================================================
   CONTATO / AGENDAMENTO
   -------------------------------------------------------------------------
   Recebe o plano ou a etapa escolhidos na página (via contexto de seleção),
   pré-preenche o campo correspondente e pisca o campo para o visitante ver.

   ENVIO: por padrão o formulário monta uma mensagem e abre o WhatsApp.
   Para usar e-mail/CRM, troque o corpo de `enviar()` (marcado abaixo).
   ========================================================================= */
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { horarios, objetivos, planos, whatsappLink } from '../data/site';
import { Olho, Reveal } from './Reveal';
import { useSelecao } from '../lib/selection';

const OPCAO_LIVRE = 'Ainda não escolhi — quero uma indicação';

export default function Contact() {
  const { selecao } = useSelecao();
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [plano, setPlano] = useState(OPCAO_LIVRE);
  const [objetivo, setObjetivo] = useState(objetivos[0]);
  const [horario, setHorario] = useState(horarios[0]);
  const [mensagem, setMensagem] = useState('');
  const [destaque, setDestaque] = useState<'plano' | 'etapa' | null>(null);
  const [etapa, setEtapa] = useState<string | undefined>();
  const planoRef = useRef<HTMLDivElement>(null);

  /* Quando o visitante clica num plano/etapa em qualquer lugar da página */
  useEffect(() => {
    if (!selecao.token) return;
    if (selecao.plano) {
      setPlano(selecao.plano);
      setDestaque('plano');
    }
    if (selecao.etapa) {
      setEtapa(selecao.etapa);
      setMensagem((m) => m || `Quero saber mais sobre a etapa "${selecao.etapa}".`);
      setDestaque('etapa');
    }
    const t = setTimeout(() => setDestaque(null), 2200);
    return () => clearTimeout(t);
  }, [selecao]);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    // ====== TROQUE AQUI pelo seu backend / Formspree / EmailJS, se quiser ======
    const texto = [
      `Olá! Meu nome é ${nome || '(nome)'}.`,
      `Contato: ${contato || '(telefone/e-mail)'}`,
      `Formato desejado: ${plano}`,
      etapa ? `Etapa de interesse: ${etapa}` : null,
      `Objetivo: ${objetivo}`,
      `Melhor horário: ${horario}`,
      mensagem ? `Observação: ${mensagem}` : null,
    ]
      .filter(Boolean)
      .join('\n');
    window.open(whatsappLink(texto), '_blank', 'noopener');
    // =========================================================================
  };

  const campo =
    'w-full rounded-2xl border border-areia bg-white/80 px-4 py-3 text-sm text-tinta placeholder:text-suave/60 outline-none transition focus:border-terracota focus:ring-2 focus:ring-terracota/25';

  return (
    <section id="contato" className="scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <div className="card-organic overflow-hidden p-6 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            {/* --- Coluna de texto --- */}
            <div>
              <Reveal>
                <Olho>Agendamento</Olho>
                <h2 className="font-display mt-4 text-balance text-3xl leading-[1.15] sm:text-[2.4rem]">
                  Vamos conversar
                  <span className="block italic text-terracota">sobre a sua saúde?</span>
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-suave">
                  Preencha o formulário e retorno em até 24 horas úteis com os horários
                  disponíveis. Prefere algo mais direto? Me chame no WhatsApp.
                </p>

                <a
                  href={whatsappLink('Olá! Gostaria de agendar uma consulta.')}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost mt-6"
                >
                  <span className="h-2 w-2 rounded-full bg-oliva" />
                  Conversar agora no WhatsApp
                </a>

                {/* Resumo da escolha feita na página */}
                {(selecao.plano || etapa) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 rounded-organic border border-oliva/25 bg-oliva/10 p-5"
                  >
                    <p className="text-[11px] uppercase tracking-[0.14em] text-oliva">
                      Sua escolha
                    </p>
                    <p className="font-display mt-1.5 text-lg leading-tight">
                      {selecao.plano ?? etapa}
                    </p>
                  </motion.div>
                )}
              </Reveal>
            </div>

            {/* --- Formulário --- */}
            <Reveal delay={0.1}>
              <form onSubmit={enviar} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-suave">Seu nome</span>
                    <input
                      className={campo}
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Como posso te chamar?"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-suave">
                      WhatsApp ou e-mail
                    </span>
                    <input
                      className={campo}
                      value={contato}
                      onChange={(e) => setContato(e.target.value)}
                      placeholder="(11) 90000-0000"
                      required
                    />
                  </label>
                </div>

                {/* Plano — campo que recebe o destaque após o clique nos cards */}
                <motion.div
                  ref={planoRef}
                  animate={
                    destaque === 'plano'
                      ? { boxShadow: '0 0 0 4px hsl(var(--c-terracota) / 0.35)' }
                      : { boxShadow: '0 0 0 0px hsl(var(--c-terracota) / 0)' }
                  }
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl"
                >
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-suave">
                      Formato desejado
                    </span>
                    <select
                      className={campo}
                      value={plano}
                      onChange={(e) => setPlano(e.target.value)}
                    >
                      <option>{OPCAO_LIVRE}</option>
                      {planos.map((p) => (
                        <option key={p.id}>{p.nome}</option>
                      ))}
                    </select>
                  </label>
                </motion.div>

                {/* Etapa — aparece só quando veio da seção Jornada */}
                {etapa && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="overflow-hidden"
                  >
                    <div
                      className={[
                        'flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm transition',
                        destaque === 'etapa'
                          ? 'border-terracota bg-terracota/10'
                          : 'border-areia bg-white/70',
                      ].join(' ')}
                    >
                      <span className="text-suave">
                        Etapa de interesse: <strong className="text-tinta">{etapa}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => setEtapa(undefined)}
                        className="text-xs font-semibold text-terracota"
                      >
                        remover
                      </button>
                    </div>
                  </motion.div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-suave">
                      Principal objetivo
                    </span>
                    <select
                      className={campo}
                      value={objetivo}
                      onChange={(e) => setObjetivo(e.target.value)}
                    >
                      {objetivos.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-suave">
                      Melhor horário
                    </span>
                    <select
                      className={campo}
                      value={horario}
                      onChange={(e) => setHorario(e.target.value)}
                    >
                      {horarios.map((h) => (
                        <option key={h}>{h}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-suave">
                    Quer contar algo antes? (opcional)
                  </span>
                  <textarea
                    className={[campo, 'min-h-[96px] resize-y'].join(' ')}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Sintomas, exames recentes, rotina..."
                  />
                </label>

                <button type="submit" className="btn-primary w-full">
                  Enviar e combinar o horário
                </button>
                <p className="text-center text-[11px] text-suave">
                  Seus dados são usados apenas para o contato do agendamento.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
