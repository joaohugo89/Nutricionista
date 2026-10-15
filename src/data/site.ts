/* =========================================================================
   CONTEÚDO DO SITE — EDITE TUDO AQUI (textos, preços, fotos, WhatsApp)
   Nenhum componente precisa ser tocado para personalizar um cliente novo.
   ========================================================================= */

/** ALTERE AQUI: número no formato internacional, só dígitos. */
export const WHATSAPP_NUMBER = '5511999999999';

/** Monta o link do WhatsApp com mensagem pré-preenchida. */
export const whatsappLink = (mensagem: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;

export const brand = {
  nome: 'Carla Souza',
  papel: 'Nutricionista Funcional',
  registro: 'CRN-3 12.345',
  email: 'contato@carlasouza.com.br',
  cidade: 'São Paulo · Atendimento online e presencial',
};

/* ---------------------------- AVISO DE TEMPLATE ----------------------------
   Faixa exibida no topo e linha no rodapé deixando claro que o site é uma
   demonstração. Ao entregar para o cliente real, troque `avisoDemo.ativo`
   para false (ou apague o <Aviso /> em components/Header.tsx).
--------------------------------------------------------------------------- */
export const avisoDemo = {
  ativo: true,
  rotulo: 'Modelo demonstrativo',
  texto:
    'Projeto de demonstração: nome, números, depoimentos, registros e resultados são fictícios e servem apenas para ilustrar o layout para fins de venda do template.',
  textoCurto: 'Conteúdo fictício · template para demonstração.',
  rodape:
    'Site modelo para demonstração. Nome, CRN, preços, depoimentos e resultados são fictícios e não representam uma profissional real.',
};

export const nav = [
  { label: 'Sobre mim', href: '#sobre' },
  { label: 'O Prato Funcional', href: '#prato' },
  { label: 'Metodologia', href: '#jornada' },
  { label: 'Planos', href: '#planos' },
  { label: 'Depoimentos', href: '#depoimentos' },
];

/* ---------------------------- HERO ---------------------------- */
/* ALTERE AQUI: troque as URLs por fotos próprias (ideal 800x1000px). */
export const hero = {
  titulo: ['Nutrição Funcional para', 'Mais Energia e Saúde'],
  subtitulo:
    'Escuta de verdade, exames lidos com calma e um plano alimentar que cabe na sua rotina — sem dietas punitivas.',
  cta: 'Agendar Consulta',
  fotos: [
    { src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80', alt: 'Prato colorido e equilibrado' },
    { src: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80', alt: 'Alimentos frescos e naturais' },
    { src: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&q=80', alt: 'Suco verde funcional' },
  ],
  badges: ['+1.200 Vidas Transformadas', '12 Anos de Consultório', 'Atendimento Online'],
};

/* ---------------------------- SOBRE ---------------------------- */
export const sobre = {
  titulo: ['Atrás da mesa de consulta,', 'uma escuta acolhedora'],
  /* ALTERE AQUI: foto da profissional. */
  foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&q=80',
  citacao:
    'Comer não deveria ser uma luta diária de culpa e conquista, mas o gesto mais simples de cuidado com a própria vida.',
  texto: [
    'Sou nutricionista funcional há doze anos e, nesse tempo, aprendi que nenhum plano alimentar sobrevive a uma rotina que não foi escutada.',
    'Por isso cada atendimento começa pela sua história: horários, afetos, sintomas e o que já tentou antes. Só então desenhamos o caminho.',
  ],
  pilares: [
    { titulo: 'Escuta Clínica', texto: 'Anamnese longa, sem pressa e sem julgamento.' },
    { titulo: 'Base em Evidências', texto: 'Condutas apoiadas em exames e literatura atual.' },
    { titulo: 'Rotina Real', texto: 'Planos que funcionam na sua semana, não na ideal.' },
    { titulo: 'Autonomia', texto: 'Você aprende a escolher — não depende de mim para sempre.' },
  ],
};

/* ------------------- ANATOMIA DO PRATO FUNCIONAL ------------------- */
export type ItemPrato = {
  id: string;
  tag: string;
  titulo: string;
  resumo: string;
  beneficios: string[];
  cor: 'terracota' | 'oliva' | 'sage';
  /* Posição do ponto sobre a foto do prato, em % da imagem (0–100).
     ALTERE AQUI se trocar a foto, para os pontos caírem no alimento certo. */
  x: number;
  y: number;
  /* Canto em que o popup abre: cada alimento abre em um lugar diferente. */
  lado: 'cima-esq' | 'cima-dir' | 'baixo-esq' | 'baixo-dir';
};

export const prato = {
  titulo: 'Anatomia de um Prato Funcional',
  subtitulo:
    'Clique nos pontos sobre o prato para entender por que cada grupo está ali. Nada é enfeite: cada componente tem uma função.',
  /* ALTERE AQUI: foto do prato (imagem quadrada funciona melhor). */
  foto: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000&q=80',
  itens: [
    {
      id: 'proteina',
      tag: 'Proteína nobre',
      titulo: 'Salmão Selvagem Grelhado',
      resumo: 'Fonte de ômega-3 EPA/DHA, proteína completa e vitamina D em uma porção só.',
      beneficios: ['Reduz marcadores inflamatórios', 'Sustenta massa magra', 'Apoia humor e cognição'],
      cor: 'terracota',
      x: 33,
      y: 30,
      lado: 'cima-esq',
    },
    {
      id: 'folhas',
      tag: 'Base verde',
      titulo: 'Folhas Escuras & Brássicas',
      resumo: 'Sulforafano, folato e fibras que alimentam a microbiota e apoiam o fígado.',
      beneficios: ['Suporte à detoxificação hepática', 'Fibras prebióticas', 'Densidade de micronutrientes'],
      cor: 'oliva',
      x: 70,
      y: 26,
      lado: 'cima-dir',
    },
    {
      id: 'carbo',
      tag: 'Energia lenta',
      titulo: 'Carboidrato Integral',
      resumo: 'Grãos e tubérculos com amido resistente: energia estável, sem a queda das 15h.',
      beneficios: ['Glicemia mais estável', 'Saciedade prolongada', 'Alimento para bactérias boas'],
      cor: 'sage',
      x: 29,
      y: 70,
      lado: 'baixo-esq',
    },
    {
      id: 'gordura',
      tag: 'Gordura boa',
      titulo: 'Azeite, Abacate & Sementes',
      resumo: 'Gorduras monoinsaturadas e vitamina E que melhoram a absorção de nutrientes.',
      beneficios: ['Absorção de vitaminas A, D, E e K', 'Saúde cardiovascular', 'Equilíbrio hormonal'],
      cor: 'terracota',
      x: 72,
      y: 68,
      lado: 'baixo-dir',
    },
  ] as ItemPrato[],
};

/* ---------------------------- JORNADA ---------------------------- */
export type Etapa = { numero: string; titulo: string; periodo: string; texto: string; marcos: string[] };

export const jornada = {
  titulo: ['Uma jornada viva e orgânica,', 'longe de regras rígidas e tabelas frias.'],
  subtitulo:
    'Quatro etapas que respeitam o seu tempo. Em cada uma você sabe exatamente onde está e o que vem a seguir.',
  etapas: [
    {
      numero: '01',
      titulo: 'Escuta Profunda & Anamnese',
      periodo: 'Semana 1',
      texto:
        'Uma hora e meia para entender rotina, sono, intestino, histórico e exames. Saímos com hipóteses claras, não com uma dieta pronta.',
      marcos: ['Avaliação corporal completa', 'Leitura de exames recentes', 'Mapa de sintomas'],
    },
    {
      numero: '02',
      titulo: 'Plano à Medida da Sua Rotina',
      periodo: 'Semana 2',
      texto:
        'Construímos juntos o cardápio a partir do que você já come e gosta. Lista de compras, substituições e plano B para dias caóticos.',
      marcos: ['Cardápio flexível', 'Lista de compras', 'Suplementação quando necessário'],
    },
    {
      numero: '03',
      titulo: 'Acompanhamento & Ajuste Real',
      periodo: 'Semanas 3 a 12',
      texto:
        'Check-ins quinzenais para ajustar o que não encaixou. O plano muda junto com a sua vida — viagens, trabalho, ciclo hormonal.',
      marcos: ['Check-ins quinzenais', 'Canal direto para dúvidas', 'Reavaliação de exames'],
    },
    {
      numero: '04',
      titulo: 'Autonomia para Toda a Vida',
      periodo: 'A partir do 4º mês',
      texto:
        'Você passa a montar os próprios pratos com segurança. A alta é o objetivo: nutrição não deveria ser assinatura vitalícia.',
      marcos: ['Montagem autônoma de refeições', 'Manual pessoal de manutenção', 'Consultas de reforço opcionais'],
    },
  ] as Etapa[],
};

/* ---------------------------- PLANOS ---------------------------- */
/* ALTERE AQUI: nomes, preços, itens e qual card recebe destaque. */
export type Plano = {
  id: string;
  nome: string;
  etiqueta: string;
  preco: string;
  periodo: string;
  resumo: string;
  itens: string[];
  destaque?: boolean;
  selo?: string;
};

export const planos: Plano[] = [
  {
    id: 'individual',
    nome: 'Consulta Individual',
    etiqueta: 'Primeiro passo',
    preco: 'R$ 385',
    periodo: 'por consulta',
    resumo: 'Para quem quer entender o cenário atual antes de assumir um acompanhamento longo.',
    itens: ['Anamnese de 90 minutos', 'Leitura de exames', 'Plano alimentar inicial', 'Retorno em 30 dias'],
  },
  {
    id: 'vitalidade',
    nome: 'Reeducação & Vitalidade',
    etiqueta: 'Mais escolhido',
    preco: 'R$ 250',
    periodo: 'por mês · 3 meses',
    resumo: 'O programa completo: do diagnóstico à autonomia, com ajuste contínuo.',
    itens: [
      'Tudo da consulta individual',
      'Check-ins quinzenais',
      'Canal direto no WhatsApp',
      'Reavaliação de exames',
      'Lista de compras mensal',
    ],
    destaque: true,
    selo: 'Resultado em 12 semanas',
  },
  {
    id: 'digestiva',
    nome: 'Saúde Digestiva & Hormonal',
    etiqueta: 'Protocolo clínico',
    preco: 'R$ 260',
    periodo: 'por mês · 4 meses',
    resumo: 'Para SOP, tireoide, SIBO e intestino irritável — condutas específicas e monitoradas.',
    itens: ['Protocolo individualizado', 'Suplementação guiada', 'Acompanhamento semanal no 1º mês', 'Relatório para o médico'],
  },
];

/* ---------------------------- DEPOIMENTOS ---------------------------- */
export const depoimentos = [
  {
    nome: 'Mariana Rocha',
    contexto: 'Reeducação & Vitalidade',
    texto:
      'Cheguei exausta achando que o problema era força de vontade. Era ferritina no chão e café demais. Em três meses voltei a ter energia à tarde.',
    metrica: '+3,3 kg de massa magra',
    foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  },
  {
    nome: 'Beatriz Lemos',
    contexto: 'Saúde Digestiva',
    texto:
      'Convivi com inchaço diário por anos. O protocolo foi gradual e explicado passo a passo — pela primeira vez entendi o meu intestino.',
    metrica: '34 semanas de acompanhamento',
    foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
  {
    nome: 'Juliana Prado',
    contexto: 'Consulta Individual',
    texto:
      'O plano cabe na minha rotina de plantões. Nada de marmita impossível: a Carla montou tudo com o que eu realmente consigo fazer.',
    metrica: 'HbA1c de 6,1 para 5,4',
    foto: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80',
  },
];

/* ---------------------------- CONTATO ---------------------------- */
export const objetivos = [
  'Mais energia e disposição',
  'Emagrecimento saudável',
  'Saúde digestiva',
  'Equilíbrio hormonal',
  'Performance esportiva',
  'Ainda estou descobrindo',
];

export const horarios = ['Manhã (8h–12h)', 'Tarde (12h–18h)', 'Noite (18h–21h)', 'Sábado pela manhã'];
