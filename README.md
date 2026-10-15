# Template — Nutricionista / Clínica de Bem-Estar

Landing page em **React + TypeScript + Vite + Tailwind CSS + Framer Motion**, com
fundo *mesh gradient* animado e a transição **expand-to-contact** (o card clicado
abre ao meio e leva o visitante ao formulário já preenchido).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera /dist pronto para publicar
```

---

## 1. Onde mexer para cada cliente novo

| O que mudar | Arquivo |
| --- | --- |
| Textos, preços, planos, depoimentos, fotos, WhatsApp, e-mail | `src/data/site.ts` |
| Cores da marca | `src/styles/theme.css` (bloco `:root`) |
| Nomes das cores nas classes | `tailwind.config.js` |
| Ligar/desligar o aviso de demonstração | `src/data/site.ts` → `avisoDemo.ativo` |
| Velocidade da animação de expansão | `src/lib/selection.tsx` (`DURACAO_MORPH`, `DURACAO_SPLIT`) |
| Entrada no scroll (fade + Y) | `src/components/Reveal.tsx` (`DESLOCAMENTO_Y`, `DURACAO`) |
| Ordem / remoção de seções | `src/App.tsx` |
| Título e descrição para SEO | `index.html` |

Praticamente **99% da personalização acontece em `src/data/site.ts`** — nenhum
componente precisa ser aberto para entregar um site novo.

---

## 2. Aviso de template demonstrativo

Enquanto o site for uma demonstração de portfólio, ele exibe:

- uma **faixa logo abaixo do menu** (dispensável no X) e
- um **parágrafo no rodapé**

avisando que nome, CRN, preços, depoimentos e resultados são fictícios.

Para desligar na entrega ao cliente real, em `src/data/site.ts`:

```ts
export const avisoDemo = {
  ativo: false,   // ← desliga a faixa e a linha do rodapé
  ...
};
```

Os textos (`rotulo`, `texto`, `textoCurto` para telas pequenas e `rodape`)
também ficam nesse mesmo objeto. Com o aviso desligado, reduza o
`pt-44 sm:pt-48` do `<section>` em `src/components/Hero.tsx` para
`pt-32 sm:pt-40` — o espaço extra existe só por causa da faixa.

---

## 3. Cores (rebrand em 1 minuto)

Em `src/styles/theme.css`, só os valores HSL (sem vírgulas):

```css
:root {
  --c-terracota: 12 62% 62%;  /* cor principal / botões     */
  --c-goiaba:     8 72% 70%;  /* degradê quente do hero     */
  --c-oliva:     82 22% 42%;  /* cor secundária / destaque  */
  --c-sage:      88 24% 72%;  /* verde claro                */
  --c-creme:     38 54% 95%;  /* fundo                      */
  --c-areia:     34 38% 88%;  /* bordas                     */
  --c-tinta:     26 26% 18%;  /* texto principal            */
  --c-suave:     26 12% 42%;  /* texto secundário           */
}
```

Elas alimentam o Tailwind (`bg-terracota`, `text-oliva`, `border-areia`…), o
fundo animado e a cortina da transição. Trocar esses 8 valores reveste o site
inteiro — útil para vender o mesmo template a vários clientes.

Exemplo de paleta alternativa (clínica mais fria):

```css
--c-terracota: 190 45% 45%;
--c-goiaba:    195 55% 62%;
--c-oliva:     215 30% 38%;
--c-sage:      195 30% 78%;
```

---

## 4. Planos / tabela de preços

Em `src/data/site.ts`, array `planos`:

```ts
{
  id: 'vitalidade',            // identificador único
  nome: 'Reeducação & Vitalidade',
  etiqueta: 'Mais escolhido',  // badge no topo do card
  preco: 'R$ 250',
  periodo: 'por mês · 3 meses',
  resumo: 'O programa completo...',
  itens: ['...', '...'],       // lista com os checks
  destaque: true,              // deixa o card verde e elevado
  selo: 'Resultado em 12 semanas', // faixa acima do card (opcional)
}
```

- Adicione ou remova objetos à vontade: a grade se ajusta sozinha.
- Para 4 planos, troque `lg:grid-cols-3` por `lg:grid-cols-4` em
  `src/components/Pricing.tsx`.
- O card inteiro já é clicável e envia o nome do plano para o formulário.

---

## 5. WhatsApp

Em `src/data/site.ts`:

```ts
export const WHATSAPP_NUMBER = '5511999999999'; // país + DDD + número, só dígitos
```

Todos os botões (hero, sobre, contato, footer) e o envio do formulário usam esse
número via `whatsappLink('mensagem')`.

---

## 6. Como funciona a animação "expand-to-contact"

Arquivo: `src/lib/selection.tsx`.

1. O componente clicado chama `irParaContato(elemento, { plano })` ou
   `{ etapa }`.
2. Uma cortina é criada **exatamente sobre o card clicado** e cresce até cobrir a
   tela (*morph*, `DURACAO_MORPH`).
3. Ao terminar o morph, a página rola até `#contato` por trás da cortina e as
   duas metades se abrem para cima e para baixo (*split*, `DURACAO_SPLIT`).
4. O `Contact` recebe a seleção, pré-preenche o campo **Formato desejado** (ou
   cria o chip da **Etapa de interesse**) e pisca o campo por ~2 s.

Para ligar a animação em qualquer outro botão:

```tsx
const ref = useRef<HTMLButtonElement>(null);
const { irParaContato } = useSelecao();

<button ref={ref} onClick={() => irParaContato(ref.current, { plano: 'Nome do plano' })}>
  Quero este formato
</button>
```

Passar `null` como primeiro argumento faz apenas o scroll suave, sem cortina.
Com `prefers-reduced-motion` ativo no sistema, a cortina é desligada
automaticamente.

---

## 7. Anatomia do Prato (pontos sobre a foto)

A seção mostra **um único prato central** com 4 pontos clicáveis. Cada ponto
abre um popup em um canto diferente da imagem.

Em `src/data/site.ts`, cada item de `prato.itens` tem:

```ts
x: 33,               // posição horizontal do ponto, em % da foto
y: 30,               // posição vertical do ponto, em % da foto
lado: 'cima-esq',    // 'cima-esq' | 'cima-dir' | 'baixo-esq' | 'baixo-dir'
```

Ao trocar a foto do prato, ajuste `x`/`y` para os pontos caírem sobre os
alimentos certos (o canto superior esquerdo da foto é `x: 0, y: 0`).
Abaixo de 640 px de largura o popup deixa de ser ancorado e entra no fluxo,
logo abaixo da foto — o ponto de corte está em `useAncoragem(640)` dentro de
`src/components/Plate.tsx`.

---

## 8. Envio do formulário

Hoje o `submit` monta a mensagem e abre o WhatsApp. Para integrar com e-mail,
Formspree, EmailJS ou um backend próprio, troque apenas o corpo de `enviar()` em
`src/components/Contact.tsx` (está marcado com `====== TROQUE AQUI ======`).

---

## 9. Fotos

Todas as imagens são URLs em `src/data/site.ts` (hero, sobre, prato,
depoimentos). Para usar arquivos locais, coloque-os em `public/` e aponte para
`/minha-foto.jpg`. Tamanhos sugeridos:

- Hero: 800×1000 px (retrato)
- Sobre: 900×1100 px
- Prato: 1000×1000 px (quadrada)
- Depoimentos: 200×200 px

---

## 10. Estrutura

```
src/
├── App.tsx                  ordem das seções
├── main.tsx
├── data/site.ts             ← TODO o conteúdo
├── lib/selection.tsx        contexto + animação expand-to-contact
├── styles/theme.css         tokens de cor e classes base
└── components/
    ├── FluidBackground.tsx  mesh gradient animado + reação ao scroll
    ├── Header.tsx           nav fixa + menu mobile
    ├── Aviso.tsx            faixa de template demonstrativo
    ├── Hero.tsx
    ├── About.tsx
    ├── Plate.tsx            prato central com pontos + popups
    ├── Journey.tsx          jornada em 4 etapas (sanfona + CTA)
    ├── Pricing.tsx          planos clicáveis
    ├── Testimonials.tsx
    ├── Contact.tsx          formulário com pré-preenchimento
    ├── Footer.tsx
    └── Reveal.tsx           utilitários de animação no scroll
```

---

## 11. Performance e acessibilidade

- O fundo usa 4 camadas com `blur` e `transform` (aceleradas por GPU) — sem
  `canvas`, sem WebGL.
- Animações de entrada rodam **uma vez** (`viewport={{ once: true }}`).
- `prefers-reduced-motion` desliga animações e transições.
- Cards de preço são navegáveis por teclado (`Tab` + `Enter`/`Espaço`) e têm
  anel de foco visível.
