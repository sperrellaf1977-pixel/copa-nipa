export default function Patrocinadores() {
  const plans = [
    {
      name: "Naming Rights",
      price: "R$ 10.000",
      subtitle: "1 cota disponível",
      highlight: "Cota principal do torneio",
      features: [
        "A marca dá nome oficial ao torneio",
        "Exemplo: Copa Nipa + nome da marca",
        "Maior exposição em toda a comunicação",
        "Presença no site oficial e nas mídias do torneio",
        "Associação direta à identidade do evento",
        "Possibilidade de ativações especiais durante o campeonato",
      ],
    },
    {
      name: "Patrocínio de Time",
      price: "R$ 4.000",
      subtitle: "6 cotas disponíveis",
      highlight: "Uma marca por equipe",
      features: [
        "Patrocínio exclusivo de uma das 6 equipes",
        "Marca na parte frontal do uniforme do time",
        "Associação direta à equipe durante todo o torneio",
        "Presença da marca nas mídias oficiais relacionadas à equipe",
        "Exposição recorrente ao longo das rodadas",
        "Excelente oportunidade de proximidade e identificação com o público",
      ],
    },
  ];

  const confirmedPartners = [
    "Coco Bambu",
    "Marcio Bittencourt Sports",
    "JOMA",
    "Mitre",
  ];

  const brandBenefits = [
    "Presença da marca no site oficial do torneio",
    "Presença da marca em todas as mídias oficiais da Copa Nipa",
    "Publicidade da marca no entorno do campo por até 3 meses",
    "Possibilidade de ativação com a base de dados do condomínio",
    "Associação a um dos torneios mais tradicionais de futebol society da Barra da Tijuca",
    "Conexão com um público qualificado, recorrente e altamente engajado",
  ];

  return (
    <div className="min-h-screen bg-[#05070b] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(15,110,180,0.18),transparent_22%),radial-gradient(circle_at_85%_20%,rgba(25,160,90,0.10),transparent_20%),linear-gradient(180deg,#071018_0%,#05070b_55%,#04060a_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.08]" />

      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-14">
        <section className="mb-16">
          <div className="mb-5 inline-flex rounded-full border border-[#1a8ad8]/30 bg-[#1a8ad8]/10 px-4 py-2 text-sm text-[#b8e2ff]">
            Copa Nipa • Oportunidade comercial • Barra da Tijuca
          </div>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.95] tracking-[-0.05em] sm:text-6xl">
            Patrocine a
            <span className="block text-[#1a8ad8]">
              Copa Nipa 2026
            </span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
            A Copa Nipa é um dos torneios de futebol society mais tradicionais da Barra da Tijuca,
            reunindo atletas, moradores e marcas em um ambiente de alta recorrência, conexão local
            e visibilidade qualificada ao longo de sete semanas.
          </p>
        </section>

        <section className="mb-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-3xl font-black">100+</div>
            <div className="mt-2 text-white/60">atletas envolvidos no torneio</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-3xl font-black">500+</div>
            <div className="mt-2 text-white/60">pessoas impactadas dentro do condomínio</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-3xl font-black">7</div>
            <div className="mt-2 text-white/60">semanas consecutivas de exposição</div>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-white/42">
              Por que patrocinar
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Visibilidade real dentro de um ambiente qualificado
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
              <p className="text-base leading-8 text-white/70">
                A Copa Nipa é mais do que um torneio — é uma plataforma de relacionamento e presença
                de marca dentro de um dos ambientes residenciais mais relevantes da Barra da Tijuca.
                Ao patrocinar a Copa Nipa, sua marca se conecta com um público recorrente, presente
                e altamente engajado.
              </p>

              <p className="mt-6 text-base leading-8 text-white/70">
                Mais do que exposição, é uma oportunidade de associação a esporte, comunidade,
                experiência e pertencimento. Um patrocínio que gera lembrança, presença e conexão.
              </p>

              <div className="mt-8 rounded-2xl border border-[#1a8ad8]/20 bg-[#1a8ad8]/10 px-5 py-4 text-sm text-[#b8e2ff]">
                Seja o naming rights do torneio ou patrocine um dos 6 times da Copa Nipa.
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
              <h3 className="text-xl font-bold">Entregas e benefícios</h3>

              <div className="mt-6 grid gap-3">
                {brandBenefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/75"
                  >
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-white/42">
              Parceiros já confirmados
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Marcas que já estão com a Copa Nipa
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {confirmedPartners.map((partner) => (
              <div
                key={partner}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 text-center transition hover:bg-white/[0.045]"
              >
                <div className="text-lg font-bold">{partner}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-white/42">
              Formatos de parceria
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Cotas de patrocínio disponíveis
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-xl transition hover:-translate-y-0.5 hover:border-white/15"
              >
                <div className="inline-flex rounded-full border border-[#1a8ad8]/20 bg-[#1a8ad8]/10 px-3 py-1 text-xs font-semibold text-[#b8e2ff]">
                  {plan.highlight}
                </div>

                <div className="mt-4 text-2xl font-bold">{plan.name}</div>
                <div className="mt-2 text-xl font-semibold text-[#1a8ad8]">
                  {plan.price}
                </div>
                <div className="mt-1 text-sm text-white/50">{plan.subtitle}</div>

                <ul className="mt-6 space-y-3 text-sm text-white/72">
                  {plan.features.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>

                <button className="mt-8 w-full rounded-2xl bg-[#1a8ad8] py-3 text-sm font-semibold text-white transition hover:scale-[1.01]">
                  Solicitar proposta
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 text-center">
            <h3 className="text-3xl font-bold">
              Dê nome ao torneio ou patrocine um dos times
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Naming rights da Copa Nipa por R$ 10.000 ou patrocínio de uma das 6 equipes por R$ 4.000.
              Uma oportunidade real para posicionar sua marca dentro de um dos torneios mais tradicionais
              de futebol society da Barra da Tijuca.
            </p>

            <button className="mt-8 rounded-2xl bg-[#1a8ad8] px-8 py-4 text-sm font-bold text-white transition hover:scale-[1.02]">
              Falar sobre patrocínio
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}