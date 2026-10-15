/* =========================================================================
   FOOTER — links, contato e direitos autorais
   ========================================================================= */
import { avisoDemo, brand, nav, whatsappLink } from '../data/site';

export default function Footer() {
  return (
    <footer className="mt-10 bg-tinta text-creme">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl italic">{brand.nome}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-creme/60">
              {brand.papel} · {brand.registro}
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-creme/70">
              Nutrição funcional com escuta, evidência e planos que cabem na vida real.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-creme/50">Navegação</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-creme/75 transition-colors hover:text-creme"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-creme/50">Contato</p>
            <ul className="mt-4 space-y-2.5 text-sm text-creme/75">
              <li>{brand.cidade}</li>
              {/* ALTERE AQUI: e-mail em data/site.ts */}
              <li>
                <a href={`mailto:${brand.email}`} className="hover:text-creme">
                  {brand.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink('Olá! Vim pelo site.')}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-creme"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Aviso de template demonstrativo */}
        {avisoDemo.ativo && (
          <p className="mt-12 rounded-organic border border-creme/15 bg-creme/5 px-5 py-4 text-[12px] leading-relaxed text-creme/60">
            <strong className="font-semibold uppercase tracking-[0.12em] text-creme/80">
              {avisoDemo.rotulo}
            </strong>{' '}
            — {avisoDemo.rodape}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 border-t border-creme/15 pt-6 text-[12px] text-creme/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.nome}. Todos os direitos reservados.
          </p>
          <p>Política de Privacidade · Termos de Uso</p>
        </div>
      </div>
    </footer>
  );
}
