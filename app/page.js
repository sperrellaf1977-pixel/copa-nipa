import RegistrationForm from "../components/RegistrationForm";
export default function Home() {
  const whatsappLink = "https://wa.me/5521993405995";

  const teamStyles = {
    Brasil: {
      chip: "text-[#9be37a]",
      bg: "from-[#0b2d16] via-[#12351d] to-[#4f5b11]",
      border: "border-[#2f8f4e]/30",
    },
    Portugal: {
      chip: "text-[#ffb36b]",
      bg: "from-[#0d3a22] via-[#11472a] to-[#6d1b1b]",
      border: "border-[#2d8a57]/30",
    },
    Alemanha: {
      chip: "text-[#ffd36e]",
      bg: "from-[#1b1b1b] via-[#3a1010] to-[#6b5413]",
      border: "border-[#7a5b1f]/30",
    },
    Espanha: {
      chip: "text-[#ffd36e]",
      bg: "from-[#5b1111] via-[#7b1a1a] to-[#6b5413]",
      border: "border-[#a13d2d]/30",
    },
    Itália: {
      chip: "text-[#cfeec7]",
      bg: "from-[#113822] via-[#f2f2f2]/10 to-[#6d1b1b]",
      border: "border-[#2f8f4e]/25",
    },
    Argentina: {
      chip: "text-[#b8e2ff]",
      bg: "from-[#0c2b3d] via-[#184d73] to-[#5b6a16]",
      border: "border-[#3a8ed0]/30",
    },
  };

  const matches = [
    {
      stage: "Rodada 1",
      home: "Brasil",
      away: "Portugal",
      score: "3 x 1",
      date: "01 de agosto de 2026",
      status: "Finalizado",
    },
    {
      stage: "Rodada 1",
      home: "Alemanha",
      away: "Espanha",
      score: "1 x 1",
      date: "01 de agosto de 2026",
      status: "Finalizado",
    },
    {
      stage: "Rodada 1",
      home: "Itália",
      away: "Argentina",
      score: "2 x 2",
      date: "01 de agosto de 2026",
      status: "Finalizado",
    },
    {
      stage: "Rodada 2",
      home: "Brasil",
      away: "Alemanha",
      date: "08 de agosto de 2026",
      status: "Em breve",
    },
    {
      stage: "Rodada 2",
      home: "Portugal",
      away: "Itália",
      date: "08 de agosto de 2026",
      status: "Em breve",
    },
    {
      stage: "Rodada 2",
      home: "Espanha",
      away: "Argentina",
      date: "08 de agosto de 2026",
      status: "Em breve",
    },
    {
      stage: "Rodada 3",
      home: "Brasil",
      away: "Espanha",
      date: "15 de agosto de 2026",
      status: "Em breve",
    },
    {
      stage: "Rodada 3",
      home: "Portugal",
      away: "Argentina",
      date: "15 de agosto de 2026",
      status: "Em breve",
    },
    {
      stage: "Rodada 3",
      home: "Alemanha",
      away: "Itália",
      date: "15 de agosto de 2026",
      status: "Em breve",
    },
    {
      stage: "Rodada 4",
      home: "Brasil",
      away: "Itália",
      date: "22 de agosto de 2026",
      status: "Em breve",
    },
    {
      stage: "Rodada 4",
      home: "Portugal",
      away: "Alemanha",
      date: "22 de agosto de 2026",
      status: "Em breve",
    },
    {
      stage: "Rodada 4",
      home: "Espanha",
      away: "Argentina",
      date: "22 de agosto de 2026",
      status: "Em breve",
    },
    {
      stage: "Rodada 5",
      home: "Brasil",
      away: "Argentina",
      date: "29 de agosto de 2026",
      status: "Em breve",
    },
    {
      stage: "Rodada 5",
      home: "Portugal",
      away: "Espanha",
      date: "29 de agosto de 2026",
      status: "Em breve",
    },
    {
      stage: "Rodada 5",
      home: "Alemanha",
      away: "Itália",
      date: "29 de agosto de 2026",
      status: "Em breve",
    },
    {
      stage: "Semifinal",
      home: "1º colocado",
      away: "4º colocado",
      date: "05 de setembro de 2026",
      status: "A definir",
    },
    {
      stage: "Semifinal",
      home: "2º colocado",
      away: "3º colocado",
      date: "05 de setembro de 2026",
      status: "A definir",
    },
    {
      stage: "Final",
      home: "Vencedor SF1",
      away: "Vencedor SF2",
      date: "12 de setembro de 2026",
      status: "Grande Final",
    },
  ];

  const standings = [
    { team: "Brasil", pts: 3, pj: 1, vit: 1, emp: 0, der: 0, sg: 2 },
    { team: "Alemanha", pts: 1, pj: 1, vit: 0, emp: 1, der: 0, sg: 0 },
    { team: "Espanha", pts: 1, pj: 1, vit: 0, emp: 1, der: 0, sg: 0 },
    { team: "Itália", pts: 1, pj: 1, vit: 0, emp: 1, der: 0, sg: 0 },
    { team: "Argentina", pts: 1, pj: 1, vit: 0, emp: 1, der: 0, sg: 0 },
    { team: "Portugal", pts: 0, pj: 1, vit: 0, emp: 0, der: 1, sg: -2 },
  ];

  const awards = [
    "Craque de cada jogo",
    "Craque da rodada",
    "Artilheiro",
    "Melhor goleiro",
    "Craque do torneio",
  ];

  const sponsorPlans = [
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
        "Excelente oportunidade de proximidade com o público",
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
    "Marca na parte frontal do uniforme de uma das equipes",
    "Publicidade da marca no entorno do campo por até 3 meses",
    "Possibilidade de ativação com a base de dados do condomínio",
    "Associação a um dos torneios mais tradicionais de futebol society da Barra da Tijuca",
  ];

  const gallery = [
    { title: "Rodada 1", subtitle: "Abertura do torneio e primeiros destaques" },
    { title: "Rodada 2", subtitle: "Sequência da fase classificatória" },
    { title: "Rodada 3", subtitle: "Disputa por posições na tabela" },
    { title: "Rodada 4", subtitle: "Rodada decisiva para o top 4" },
    { title: "Rodada 5", subtitle: "Última rodada da fase regular" },
    { title: "Finais", subtitle: "Semifinais e grande decisão" },
  ];

  const getTeamStyle = (team) =>
    teamStyles[team] || {
      chip: "text-[#b8e2ff]",
      bg: "from-[#0b1a2a] via-[#0e2234] to-[#05070b]",
      border: "border-white/10",
    };

  return (
    <div className="min-h-screen bg-[#05070b] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(15,110,180,0.18),transparent_22%),radial-gradient(circle_at_85%_20%,rgba(25,160,90,0.10),transparent_20%),linear-gradient(180deg,#071018_0%,#05070b_55%,#04060a_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.08]" />

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-12">
        <section className="mb-16">
          <div className="mb-8 rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="/logo-nipa.png"
                  alt="Logo Nova Ipanema"
                  className="h-14 w-14 rounded-xl object-contain bg-white/5 p-1"
                />
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/45">
                    Copa Nipa
                  </div>
                  <div className="mt-1 text-xl font-black tracking-tight">
                    Nova Ipanema
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-sm text-white/65">
                <a href="#jogos" className="rounded-full border border-white/10 px-4 py-2 hover:bg-white/5">
                  Jogos
                </a>
                <a href="#classificacao" className="rounded-full border border-white/10 px-4 py-2 hover:bg-white/5">
                  Classificação
                </a>
                <a href="#premiacoes" className="rounded-full border border-white/10 px-4 py-2 hover:bg-white/5">
                  Premiações
                </a>
                <a href="#galeria" className="rounded-full border border-white/10 px-4 py-2 hover:bg-white/5">
                  Galeria
                </a>
                <a href="#inscricao" className="rounded-full border border-white/10 px-4 py-2 hover:bg-white/5">
                  Inscrição
                </a>
                <a href="#patrocinadores" className="rounded-full border border-white/10 px-4 py-2 hover:bg-white/5">
                  Patrocinadores
                </a>
              </div>
            </div>
          </div>

          <div className="mb-5 inline-flex rounded-full border border-[#1a8ad8]/30 bg-[#1a8ad8]/10 px-4 py-2 text-sm text-[#b8e2ff]">
            Copa Nipa 2026 • 6 seleções • 7 sábados • Barra da Tijuca
          </div>

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            O melhor torneio de futebol society
            <span className="block text-[#1a8ad8]">
              da Barra da Tijuca
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            A Copa Nipa nasce com posicionamento forte, visual moderno e espírito competitivo.
            Um campeonato com identidade própria, calendário definido, cobertura contínua e espaço
            para patrocinadores se conectarem a um público qualificado.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#inscricao"
              className="rounded-2xl bg-[#1a8ad8] px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
            >
              Fazer inscrição
            </a>
            <a
              href="#patrocinadores"
              className="rounded-2xl border border-white/15 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
            >
              Seja patrocinador
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#25D366]/20"
            >
              Falar no WhatsApp
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
              <div className="text-3xl font-black">7</div>
              <div className="mt-2 text-sm text-white/58">sábados de competição</div>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
              <div className="text-3xl font-black">R$ 120</div>
              <div className="mt-2 text-sm text-white/58">inscrição com uniforme</div>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
              <div className="text-3xl font-black">Top 4</div>
              <div className="mt-2 text-sm text-white/58">avançam para semifinal</div>
            </div>
          </div>
        </section>

        <section id="jogos" className="mb-16">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-white/42">Jogos</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Calendário oficial da Copa Nipa
            </h2>
          </div>

          <div className="grid gap-4">
            {matches.map((match, index) => {
              const homeStyle = getTeamStyle(match.home);
              const awayStyle = getTeamStyle(match.away);

              return (
                <div
                  key={index}
                  className={`rounded-xl border ${homeStyle.border} bg-gradient-to-r ${homeStyle.bg} p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]`}
                >
                  <div className="flex justify-between text-sm">
                    <span className={`font-semibold ${homeStyle.chip}`}>{match.stage}</span>
                    <span className="text-white/50">{match.date}</span>
                  </div>

                  <div className="mt-4 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
                    <div className={`rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-lg font-bold ${homeStyle.chip}`}>
                      {match.home}
                    </div>

                    <div className="text-center text-xl font-black text-white">
                      {match.score || "VS"}
                    </div>

                    <div className={`rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-right text-lg font-bold ${awayStyle.chip}`}>
                      {match.away}
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-white/50">
                    {match.status}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="classificacao" className="mb-16">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-white/42">
              Classificação
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Tabela geral
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-white/55">
                <tr>
                  <th className="px-4 py-4">#</th>
                  <th className="px-4 py-4">Time</th>
                  <th className="px-4 py-4">PTS</th>
                  <th className="px-4 py-4">PJ</th>
                  <th className="px-4 py-4">VIT</th>
                  <th className="px-4 py-4">EMP</th>
                  <th className="px-4 py-4">DER</th>
                  <th className="px-4 py-4">SG</th>
                </tr>
              </thead>

              <tbody>
                {standings.map((row, index) => (
                  <tr
                    key={row.team}
                    className={`border-t border-white/10 ${
                      index < 4 ? "bg-[#1a8ad8]/[0.08]" : ""
                    }`}
                  >
                    <td className="px-4 py-4 font-bold">{index + 1}</td>
                    <td className="px-4 py-4 font-semibold">{row.team}</td>
                    <td className="px-4 py-4">{row.pts}</td>
                    <td className="px-4 py-4">{row.pj}</td>
                    <td className="px-4 py-4">{row.vit}</td>
                    <td className="px-4 py-4">{row.emp}</td>
                    <td className="px-4 py-4">{row.der}</td>
                    <td className="px-4 py-4">{row.sg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-white/50">
            Os 4 primeiros avançam para as semifinais.
          </p>
        </section>

        <section id="premiacoes" className="mb-16">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-white/42">
              Premiações
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Destaques do torneio
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {awards.map((award) => (
              <div
                key={award}
                className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5 transition hover:bg-white/[0.045]"
              >
                <div className="text-sm font-semibold text-white">{award}</div>
                <div className="mt-2 text-sm text-white/55">
                  Acompanhamento durante o torneio
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="galeria" className="mb-16">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-white/42">
              Galeria
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Fotos e melhores momentos das rodadas
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
              Esta área está pronta para receber as fotos de cada sábado, destaques dos jogos,
              bastidores e conteúdos dos patrocinadores ao longo do torneio.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((item, index) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition hover:border-white/15 hover:bg-white/[0.045]"
              >
                <div className="relative flex h-56 items-end overflow-hidden bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-black/20 p-5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(26,138,216,0.22),transparent_28%)]" />
                  <div className="relative rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">
                    Álbum {index + 1}
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-base font-semibold">{item.title}</div>
                  <div className="mt-2 text-sm text-white/60">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="inscricao" className="mb-16">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl lg:p-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/42">
                  Inscrição individual
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                  Inscreva-se para jogar a Copa Nipa
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/68">
                  As inscrições são individuais, no valor de R$ 120, com direito a uniforme completo:
                  camisa e calção. O atleta informa sua posição preferida para ajudar na montagem
                  equilibrada das equipes.
                </p>

                <div className="mt-6 inline-flex rounded-2xl border border-[#18a55a]/25 bg-[#18a55a]/10 px-4 py-3 text-sm text-[#baf2d2]">
                  Valor da inscrição: R$ 120 • inclui camisa + calção
                </div>

                <div className="mt-6 text-sm text-white/55">
                  Posições: ataque • meio • defesa • lateral • goleiro
                </div>
              </div>
<RegistrationForm />
               
            </div>
          </div>
        </section>

        <section id="patrocinadores">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-white/42">
              Patrocinadores
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Cotas e oportunidades de marca
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">
              A Copa Nipa pode ser apresentada como uma propriedade premium do condomínio,
              com recorrência de público, conteúdo contínuo e exposição qualificada ao longo
              de sete semanas.
            </p>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-3xl font-black">100+</div>
              <div className="mt-2 text-white/60">atletas envolvidos no torneio</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-3xl font-black">500+</div>
              <div className="mt-2 text-white/60">pessoas impactadas dentro do condomínio</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-3xl font-black">3 meses</div>
              <div className="mt-2 text-white/60">de exposição da marca no entorno do campo</div>
            </div>
          </div>

          <div className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
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

          <div className="mb-12">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.2em] text-white/42">
                Parceiros já confirmados
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight">
                Marcas que já estão com a Copa Nipa
              </h3>
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
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-2">
            {sponsorPlans.map((plan) => (
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

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 block w-full rounded-2xl bg-[#1a8ad8] py-3 text-center text-sm font-semibold text-white transition hover:scale-[1.01]"
                >
                  Solicitar proposta
                </a>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 text-center">
            <h3 className="text-3xl font-bold">
              Dê nome ao torneio ou patrocine um dos times
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Naming rights da Copa Nipa por R$ 10.000 ou patrocínio de uma das 6 equipes por
              R$ 4.000. Uma oportunidade real para posicionar sua marca dentro de um dos torneios
              mais tradicionais de futebol society da Barra da Tijuca.
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-2xl bg-[#1a8ad8] px-8 py-4 text-sm font-bold text-white transition hover:scale-[1.02]"
            >
              Falar sobre patrocínio
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}