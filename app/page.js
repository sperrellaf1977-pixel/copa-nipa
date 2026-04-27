import { createClient } from "@supabase/supabase-js";
import RegistrationForm from "../components/RegistrationForm";

async function getData() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const [{ data: matches }, { data: gallery }] = await Promise.all([
    supabase.from("matches").select("*").order("id", { ascending: true }),
    supabase.from("gallery").select("*").order("created_at", { ascending: false }),
  ]);
  return { matches: matches || [], gallery: gallery || [] };
}

function calcStandings(matches) {
  const teams = {};
  matches.forEach((m) => {
    if (m.status !== "Finalizado") return;
    [m.home_team, m.away_team].forEach((t) => {
      if (!teams[t]) teams[t] = { team: t, pts: 0, pj: 0, vit: 0, emp: 0, der: 0, gp: 0, gc: 0 };
    });
    const h = teams[m.home_team];
    const a = teams[m.away_team];
    h.pj++; a.pj++;
    h.gp += m.home_score; h.gc += m.away_score;
    a.gp += m.away_score; a.gc += m.home_score;
    if (m.home_score > m.away_score) { h.pts += 3; h.vit++; a.der++; }
    else if (m.home_score < m.away_score) { a.pts += 3; a.vit++; h.der++; }
    else { h.pts += 1; a.pts += 1; h.emp++; a.emp++; }
  });
  return Object.values(teams)
    .sort((a, b) => b.pts - a.pts || (b.gp - b.gc) - (a.gp - a.gc) || b.gp - a.gp)
    .map((t) => ({ ...t, sg: t.gp - t.gc }));
}

const teamFlags = {
  Brasil: "🇧🇷", Portugal: "🇵🇹", Alemanha: "🇩🇪",
  Espanha: "🇪🇸", "Itália": "🇮🇹", Argentina: "🇦🇷",
};

const teamColors = {
  Brasil:    { text: "text-green-400",  bg: "bg-green-950",   border: "border-green-800" },
  Portugal:  { text: "text-red-400",    bg: "bg-red-950",     border: "border-red-800" },
  Alemanha:  { text: "text-yellow-400", bg: "bg-stone-900",   border: "border-stone-700" },
  Espanha:   { text: "text-orange-400", bg: "bg-red-950",     border: "border-orange-800" },
  "Itália":  { text: "text-blue-400",   bg: "bg-blue-950",    border: "border-blue-800" },
  Argentina: { text: "text-sky-400",    bg: "bg-sky-950",     border: "border-sky-800" },
};
const getTeam = (t) => teamColors[t] || { text: "text-white/70", bg: "bg-slate-900", border: "border-slate-700" };
const getFlag = (t) => teamFlags[t] || "⚽";

const awards = [
  { title: "Craque de cada jogo", icon: "⭐" },
  { title: "Craque da rodada", icon: "🏅" },
  { title: "Artilheiro", icon: "⚽" },
  { title: "Melhor goleiro", icon: "🧤" },
  { title: "Craque do torneio", icon: "🏆" },
];

const confirmedPartners = ["Coco Bambu", "Marcio Bittencourt Sports", "JOMA", "Mitre"];
const brandBenefits = [
  "Presença da marca no site oficial do torneio",
  "Presença em todas as mídias oficiais da Copa Nipa",
  "Marca na parte frontal do uniforme de uma das equipes",
  "Publicidade no entorno do campo por até 3 meses",
  "Possibilidade de ativação com a base do condomínio",
  "Associação ao torneio mais tradicional de society da Barra",
];
const sponsorPlans = [
  { name: "Naming Rights", price: "R$ 10.000", subtitle: "1 cota disponível", highlight: "Cota principal", icon: "👑",
    features: ["A marca dá nome oficial ao torneio", "Exemplo: Copa Nipa + nome da marca", "Maior exposição em toda a comunicação", "Presença no site oficial e nas mídias", "Associação direta à identidade do evento", "Possibilidade de ativações especiais"] },
  { name: "Patrocínio de Time", price: "R$ 4.000", subtitle: "6 cotas disponíveis", highlight: "Uma marca por equipe", icon: "🎽",
    features: ["Patrocínio exclusivo de uma das 6 equipes", "Marca na parte frontal do uniforme", "Associação direta à equipe no torneio", "Presença nas mídias oficiais da equipe", "Exposição recorrente ao longo das rodadas", "Proximidade com o público do condomínio"] },
];

export const revalidate = 0;

export default async function Home() {
  const { matches, gallery } = await getData();
  const standings = calcStandings(matches);
  const whatsappLink = "https://wa.me/5521993405995";

  const galleryByRound = gallery.reduce((acc, photo) => {
    if (!acc[photo.round_title]) acc[photo.round_title] = { title: photo.round_title, subtitle: photo.round_subtitle, photos: [] };
    acc[photo.round_title].photos.push(photo);
    return acc;
  }, {});
  const galleryRounds = Object.values(galleryByRound);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(30,64,175,0.1),transparent_50%)]" />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-orange-500/10 bg-[#0a0e1a]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div>
                <img src="/logo-nipa.png" alt="Nova Ipanema" className="h-12 w-12 rounded-xl object-contain" style={{mixBlendMode:"screen"}} />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500/70">Nova Ipanema</div>
                <div className="text-xl font-black tracking-tight">Copa Nipa 2026</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[["jogos","Jogos"],["classificacao","Classificação"],["premiacoes","Premiações"],["galeria","Galeria"],["inscricao","Inscrição"],["patrocinadores","Patrocinadores"]].map(([id, label]) => (
                <a key={id} href={`#${id}`} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:border-orange-500/40 hover:text-white">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* BARRA DE PATROCINADORES NO TOPO */}
      <div className="border-b border-white/10 bg-[#080d18]">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-500/60 shrink-0">Patrocinadores</span>
            {[
              { logo: "/logo-cocobambu.png", name: "Coco Bambu", url: "https://www.cocobambu.com.br" },
              { logo: "/logo-rao.png", name: "Grupo Rão", url: "https://www.mundorao.com" },
              { logo: "/logo-ogro.png", name: "Ogro Steaks", url: "https://www.ogrosteaks.com.br" },
              { logo: "/logo-amoedo.png", name: "Amoedo", url: "https://www.amoedo.com.br" },
              { logo: "/logo-mitre.png", name: "Mitre", url: "https://www.mitre.com" },
              { logo: "/logo-bittencourt.jfif", name: "Bittencourt Sports", url: null },
              { logo: "/logo-netshoes.png", name: "Netshoes", url: "https://www.netshoes.com.br" },
            ].map((p) => (
              <a key={p.name} href={p.url || "#"} target={p.url ? "_blank" : "_self"} rel="noreferrer"
                className="opacity-75 transition hover:opacity-100">
                <img src={p.logo} alt={p.name}
                  className="h-8 w-auto object-contain"
                  style={{mixBlendMode:"screen"}} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10">

        {/* HERO */}
        <section className="mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            <span className="text-sm font-semibold text-orange-400">Copa Nipa 2026 • 6 seleções • 7 sábados • Barra da Tijuca</span>
          </div>

          <h1 className="mb-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.04em] lg:text-7xl">
            O melhor torneio<br />
            <span className="text-orange-500">de futebol society</span><br />
            da Barra da Tijuca
          </h1>

          <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/60">
            A Copa Nipa nasce com posicionamento forte, visual moderno e espírito competitivo.
            Um campeonato com identidade própria e calendário definido.
          </p>

          <div className="mb-14 flex flex-wrap gap-3">
            <a href="#inscricao" className="rounded-2xl bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_32px_rgba(249,115,22,0.35)] transition hover:bg-orange-600">
              Fazer inscrição
            </a>
            <a href="#patrocinadores" className="rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white/80 transition hover:bg-white/[0.06]">
              Seja patrocinador
            </a>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="rounded-2xl border border-green-500/30 bg-green-500/10 px-7 py-3.5 text-sm font-semibold text-white/80 transition hover:bg-green-500/20">
              💬 WhatsApp
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[["7","sábados de competição","border-t-orange-500"],["R$ 120","inscrição com uniforme","border-t-green-500"],["Top 4","avançam para semifinal","border-t-blue-500"]].map(([v,l,c]) => (
              <div key={l} className={`rounded-2xl border border-white/7 bg-white/[0.02] p-6 border-t-2 ${c}`}>
                <div className="text-3xl font-black text-white">{v}</div>
                <div className="mt-2 text-sm text-white/50">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* JOGOS */}
        <section id="jogos" className="mb-20">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500/70">Jogos</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Calendário oficial</h2>
          </div>
          <div className="grid gap-3">
            {matches.map((match) => {
              const ht = getTeam(match.home_team);
              const at = getTeam(match.away_team);
              const done = match.status === "Finalizado";
              const score = match.home_score !== null && match.away_score !== null
                ? `${match.home_score} x ${match.away_score}` : "VS";
              return (
                <div key={match.id} className={`rounded-2xl border p-5 ${done ? "border-orange-500/20 bg-orange-500/[0.04]" : "border-white/6 bg-white/[0.02]"}`}>
                  <div className="mb-3 flex justify-between text-xs">
                    <span className={`font-bold uppercase tracking-wider ${done ? "text-orange-400" : "text-white/30"}`}>{match.stage}</span>
                    <span className="text-white/30">{match.match_date}</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div className={`rounded-xl border px-4 py-3 text-base font-bold ${ht.bg} ${ht.border} ${ht.text}`}>
                      {getFlag(match.home_team)} {match.home_team}
                    </div>
                    <div className={`min-w-[56px] text-center text-xl font-black ${done ? "text-orange-400" : "text-white/25"}`}>{score}</div>
                    <div className={`rounded-xl border px-4 py-3 text-base font-bold text-right ${at.bg} ${at.border} ${at.text}`}>
                      {match.away_team} {getFlag(match.away_team)}
                    </div>
                  </div>
                  <p className={`mt-2 text-xs ${done ? "text-orange-500/50" : "text-white/20"}`}>{match.status}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CLASSIFICAÇÃO */}
        <section id="classificacao" className="mb-20">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500/70">Classificação</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Tabela geral</h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/7 bg-white/[0.02]">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-orange-500/15 bg-orange-500/[0.05]">
                <tr>
                  {["#","Time","PTS","PJ","VIT","EMP","DER","SG"].map((h) => (
                    <th key={h} className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-orange-500/60">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {standings.map((row, i) => (
                  <tr key={row.team} className={`border-t border-white/[0.04] ${i < 4 ? "bg-orange-500/[0.03]" : ""}`}>
                    <td className={`px-4 py-4 font-bold ${i < 4 ? "text-orange-400" : "text-white/30"}`}>{i + 1}</td>
                    <td className="px-4 py-4 font-semibold">
                      {getFlag(row.team)} {row.team}
                      {i < 4 && <span className="ml-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-[10px] text-orange-400">↑ Semi</span>}
                    </td>
                    <td className="px-4 py-4 text-lg font-black text-orange-400">{row.pts}</td>
                    <td className="px-4 py-4 text-white/50">{row.pj}</td>
                    <td className="px-4 py-4 text-green-400">{row.vit}</td>
                    <td className="px-4 py-4 text-white/40">{row.emp}</td>
                    <td className="px-4 py-4 text-red-400">{row.der}</td>
                    <td className={`px-4 py-4 font-bold ${row.sg > 0 ? "text-green-400" : row.sg < 0 ? "text-red-400" : "text-white/40"}`}>
                      {row.sg > 0 ? `+${row.sg}` : row.sg}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-white/30">Os 4 primeiros avançam para as semifinais.</p>
        </section>

        {/* PREMIAÇÕES */}
        <section id="premiacoes" className="mb-20">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500/70">Premiações</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Destaques do torneio</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {awards.map((award) => (
              <div key={award.title} className="rounded-2xl border border-white/7 bg-white/[0.02] p-6 text-center">
                <div className="mb-3 text-3xl">{award.icon}</div>
                <div className="text-sm font-bold">{award.title}</div>
                <div className="mt-2 text-xs text-white/40">Acompanhamento durante o torneio</div>
              </div>
            ))}
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria" className="mb-20">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500/70">Galeria</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Fotos e melhores momentos</h2>
          </div>
          {galleryRounds.length === 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {["Rodada 1","Rodada 2","Rodada 3","Rodada 4","Rodada 5","Finais"].map((title, i) => (
                <div key={title} className="overflow-hidden rounded-2xl border border-white/7 bg-white/[0.02]">
                  <div className="flex h-48 items-center justify-center bg-gradient-to-br from-orange-500/5 to-blue-900/10">
                    <span className="text-5xl opacity-20">📸</span>
                  </div>
                  <div className="p-5">
                    <div className="font-bold">{title}</div>
                    <div className="mt-1 text-sm italic text-white/30">Fotos em breve</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            galleryRounds.map((round) => (
              <div key={round.title} className="mb-10">
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="text-xl font-black">{round.title}</h3>
                  {round.subtitle && <span className="text-sm text-white/40">{round.subtitle}</span>}
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {round.photos.map((photo) => (
                    <div key={photo.id} className="overflow-hidden rounded-2xl border border-white/7">
                      <img src={photo.image_url} alt={round.title} className="h-56 w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>

        {/* INSCRIÇÃO */}
        <section id="inscricao" className="mb-20">
          <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/[0.07] to-blue-900/[0.07] p-8 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500/70">Inscrição individual</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight">Inscreva-se para jogar a Copa Nipa</h2>
                <p className="mt-4 text-base leading-relaxed text-white/60">
                  As inscrições são individuais, no valor de R$ 120, com direito a uniforme completo: camisa e calção.
                  O atleta informa sua posição preferida para ajudar na montagem equilibrada das equipes.
                </p>
                <div className="mt-6 inline-flex rounded-2xl border border-green-500/25 bg-green-500/10 px-5 py-3 text-sm font-semibold text-green-400">
                  💰 R$ 120 — inclui camisa + calção
                </div>
                <p className="mt-4 text-sm text-white/40">Posições: ataque • meio • defesa • lateral • goleiro</p>
              </div>
              <RegistrationForm />
            </div>
          </div>
        </section>

        {/* PATROCINADORES */}
        <section id="patrocinadores">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500/70">Patrocinadores</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Cotas e oportunidades de marca</h2>
          </div>

          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            {[["100+","atletas envolvidos","border-l-orange-500"],["500+","pessoas impactadas","border-l-blue-500"],["3 meses","de exposição da marca","border-l-green-500"]].map(([v,l,c]) => (
              <div key={l} className={`rounded-2xl border border-white/7 bg-white/[0.02] p-6 border-l-4 ${c}`}>
                <div className="text-4xl font-black text-white">{v}</div>
                <div className="mt-2 text-sm text-white/50">{l}</div>
              </div>
            ))}
          </div>

          <div className="mb-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/7 bg-white/[0.02] p-8">
              <p className="text-base leading-relaxed text-white/65">
                A Copa Nipa é mais do que um torneio — é uma plataforma de relacionamento e presença de marca dentro de um dos ambientes residenciais mais relevantes da Barra da Tijuca.
              </p>
              <p className="mt-5 text-base leading-relaxed text-white/65">
                Ao patrocinar a Copa Nipa, sua marca se conecta com um público recorrente, presente e altamente engajado.
              </p>
              <div className="mt-8 rounded-2xl border border-orange-500/20 bg-orange-500/[0.07] px-5 py-4 text-sm font-semibold text-orange-400">
                🏆 Seja o naming rights ou patrocine um dos 6 times da Copa Nipa.
              </div>
            </div>
            <div className="rounded-3xl border border-white/7 bg-white/[0.02] p-8">
              <h3 className="mb-6 text-xl font-black">Entregas e benefícios</h3>
              <div className="grid gap-3">
                {brandBenefits.map((b, i) => (
                  <div key={b} className="flex gap-3 text-sm text-white/60">
                    <span className="font-bold text-orange-500">0{i+1}.</span>{b}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* NAMING RIGHTS */}
          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-500/70">Naming Rights</p>
            <h3 className="mb-5 text-2xl font-black">Copa Nipa Fatorial XP 2026</h3>
            <div className="flex items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/[0.05] p-8">
              <div className="text-center">
                <div className="text-4xl font-black text-white">FATORIAL XP</div>
                <div className="mt-2 text-sm text-orange-400">Naming Rights — Patrocinador Master</div>
              </div>
            </div>
          </div>

          {/* PATROCINADORES DE TIME */}
          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-500/70">Patrocinadores de Time</p>
            <h3 className="mb-5 text-2xl font-black">Marcas que nomeiam as equipes</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { name: "Coco Bambu", logo: "/logo-cocobambu.png", url: "https://www.cocobambu.com.br" },
                { name: "Grupo Rão", logo: "/logo-rao.png", url: "https://www.mundorao.com" },
                { name: "Ogro Steaks", logo: "/logo-ogro.png", url: "https://www.ogrosteaks.com.br" },
                { name: "Amoedo", logo: "/logo-amoedo.png", url: "https://www.amoedo.com.br" },
                { name: "Mitre", logo: "/logo-mitre.png", url: "https://www.mitre.com" },
                { name: "Bittencourt Sports", logo: "/logo-bittencourt.jfif", url: null },
              ].map((p) => (
                <a key={p.name} href={p.url || "#"} target={p.url ? "_blank" : "_self"} rel="noreferrer"
                  className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/7 bg-white/[0.02] p-5 transition hover:border-orange-500/30 hover:bg-white/[0.05]">
                  <img src={p.logo} alt={p.name} className="h-20 w-full object-contain" style={{mixBlendMode:"screen"}} />
                  <span className="text-center text-xs text-white/40">{p.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* APOIO */}
          <div className="mb-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-orange-500/70">Apoio</p>
            <h3 className="mb-5 text-2xl font-black">Apoiadores do torneio</h3>
            <div className="flex justify-center">
              <a href="https://www.netshoes.com.br" target="_blank" rel="noreferrer"
                className="flex items-center justify-center rounded-2xl border border-white/7 bg-white/[0.02] px-12 py-6 transition hover:border-orange-500/30 hover:bg-white/[0.05]">
                <img src="/logo-netshoes.png" alt="Netshoes" className="h-10 object-contain" style={{mixBlendMode:"screen"}} />
              </a>
            </div>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-2">
            {sponsorPlans.map((plan) => (
              <div key={plan.name} className="rounded-3xl border border-orange-500/20 bg-white/[0.02] p-8">
                <div className="mb-3 text-3xl">{plan.icon}</div>
                <div className="mb-3 inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">{plan.highlight}</div>
                <div className="text-2xl font-black">{plan.name}</div>
                <div className="mt-1 text-3xl font-black text-orange-500">{plan.price}</div>
                <div className="mt-1 mb-6 text-sm text-white/40">{plan.subtitle}</div>
                <ul className="mb-8 grid gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-white/60">
                      <span className="text-orange-500">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href={whatsappLink} target="_blank" rel="noreferrer"
                  className="block rounded-2xl bg-orange-500 py-4 text-center text-sm font-bold text-white shadow-[0_8px_24px_rgba(249,115,22,0.3)] transition hover:bg-orange-600">
                  Solicitar proposta
                </a>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/[0.07] to-blue-900/[0.07] p-14 text-center">
            <h3 className="text-4xl font-black leading-tight">Dê nome ao torneio ou<br />patrocine um dos times</h3>
            <p className="mx-auto mt-5 max-w-lg text-base text-white/60">
              Naming rights por R$ 10.000 ou patrocínio de equipe por R$ 4.000.
              Uma oportunidade real de posicionar sua marca na Barra da Tijuca.
            </p>
            <a href={whatsappLink} target="_blank" rel="noreferrer"
              className="mt-8 inline-block rounded-2xl bg-orange-500 px-10 py-4 text-base font-bold text-white shadow-[0_12px_40px_rgba(249,115,22,0.4)] transition hover:bg-orange-600">
              Falar sobre patrocínio
            </a>
          </div>
        </section>

        {/* RODAPÉ */}
        <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-10">
          <div className="flex items-center gap-3">
            <img src="/logo-nipa.png" alt="Nova Ipanema" className="h-10 w-10 rounded-xl object-contain" style={{mixBlendMode:"screen"}} />
            <div>
              <div className="font-black">Copa Nipa 2026</div>
              <div className="text-xs text-white/40">Nova Ipanema — Barra da Tijuca</div>
            </div>
          </div>
          <a href={whatsappLink} target="_blank" rel="noreferrer" className="text-sm text-white/40">
            💬 (21) 99340-5995
          </a>
        </footer>
      </main>
    </div>
  );
}
