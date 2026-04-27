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

const teamColors = {
  "Amoedo":       { text: "text-yellow-400", bg: "bg-yellow-950",  border: "border-yellow-800" },
  "Coco Bambu":   { text: "text-green-400",  bg: "bg-green-950",   border: "border-green-800" },
  "Grupo Rão":    { text: "text-red-400",    bg: "bg-red-950",     border: "border-red-800" },
  "Ogro Steaks":  { text: "text-orange-400", bg: "bg-orange-950",  border: "border-orange-800" },
  "Bittencourt":  { text: "text-blue-400",   bg: "bg-blue-950",    border: "border-blue-800" },
  "Mitre":        { text: "text-sky-400",    bg: "bg-sky-950",     border: "border-sky-800" },
};
const getTeam = (t) => teamColors[t] || { text: "text-white/70", bg: "bg-slate-900", border: "border-slate-700" };

const awards = [
  { title: "Craque de cada jogo", icon: "⭐" },
  { title: "Craque da rodada", icon: "🏅" },
  { title: "Artilheiro", icon: "⚽" },
  { title: "Melhor goleiro", icon: "🧤" },
  { title: "Craque do torneio", icon: "🏆" },
];

const allSponsors = [
  { logo: "/logo-fatorial.png", name: "Fatorial Investimentos XP", url: "https://www.fatorial.com.br", tier: "naming" },
  { logo: "/logo-amoedo.png", name: "Amoedo", url: "https://www.amoedo.com.br", tier: "time" },
  { logo: "/logo-rao.png", name: "Grupo Rão", url: "https://www.mundorao.com", tier: "time" },
  { logo: "/logo-ogro.png", name: "Ogro Steaks", url: "https://www.ogrosteaks.com.br", tier: "time" },
  { logo: "/logo-cocobambu.png", name: "Coco Bambu", url: "https://www.cocobambu.com.br", tier: "time" },
  { logo: "/logo-mitre.png", name: "Mitre", url: "https://www.mitre.com", tier: "time" },
  { logo: "/logo-bittencourt.jfif", name: "Bittencourt Sports", url: null, tier: "time" },
  { logo: "/logo-netshoes.png", name: "Netshoes", url: "https://www.netshoes.com.br", tier: "apoio" },
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
              <img src="/logo-nipa.png" alt="Nova Ipanema" className="h-16 w-16 object-contain rounded-full" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500/70">Nova Ipanema</div>
                <div className="text-lg font-black tracking-tight leading-tight">Copa Nipa</div>
                <div className="text-xs text-white/50 font-semibold">Fatorial Investimentos XP</div>
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

      {/* BARRA DE PATROCINADORES */}
      <div className="border-b border-white/10 bg-[#080d18]">
        <div className="mx-auto max-w-7xl px-6 py-5">
          {/* Linha 1 - Naming */}
          <div className="mb-5 flex justify-center">
            <a href="https://www.fatorial.com.br" target="_blank" rel="noreferrer"
              className="opacity-90 transition hover:opacity-100">
              <img src="/logo-fatorial.png" alt="Fatorial Investimentos XP" className="h-14 w-auto object-contain" style={{mixBlendMode:"screen"}} />
            </a>
          </div>
          {/* Divisor */}
          <div className="mb-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/20">Patrocinadores de Time</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          {/* Linha 2 - Times */}
          <div className="mb-5 flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {allSponsors.filter(s => s.tier === "time").map((p) => (
              <a key={p.name} href={p.url || "#"} target={p.url ? "_blank" : "_self"} rel="noreferrer"
                className="opacity-80 transition hover:opacity-100">
                <img src={p.logo} alt={p.name} className="h-10 w-auto object-contain" style={{mixBlendMode:"screen"}} />
              </a>
            ))}
          </div>
          {/* Divisor */}
          <div className="mb-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/20">Apoio</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          {/* Linha 3 - Apoio */}
          <div className="flex justify-center">
            <a href="https://www.netshoes.com.br" target="_blank" rel="noreferrer"
              className="opacity-80 transition hover:opacity-100">
              <img src="/logo-netshoes.png" alt="Netshoes" className="h-8 w-auto object-contain" style={{mixBlendMode:"screen"}} />
            </a>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10">

        {/* HERO */}
        <section className="mb-20">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              <span className="text-sm font-semibold text-orange-400">Copa Nipa 2026 • 6 times • 7 sábados • Barra da Tijuca</span>
            </div>
          </div>

          <h1 className="mb-6 w-full text-center text-5xl font-black leading-[0.95] tracking-[-0.04em] lg:text-7xl">
            <span className="text-orange-500">O melhor torneio</span><br />
            <span className="text-orange-500">de futebol society</span><br />
            da Barra da Tijuca
          </h1>

          <p className="mb-10 w-full text-center text-lg leading-relaxed text-white/60">
            A Copa Nipa nasce com posicionamento forte, visual moderno e espírito competitivo.
            Um campeonato com identidade própria e calendário definido.
          </p>

          <div className="mb-14 flex flex-wrap justify-center gap-3">
            <a href="#inscricao" className="rounded-2xl bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_32px_rgba(249,115,22,0.35)] transition hover:bg-orange-600">
              Fazer inscrição
            </a>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="rounded-2xl border border-green-500/30 bg-green-500/10 px-7 py-3.5 text-sm font-semibold text-white/80 transition hover:bg-green-500/20">
              💬 WhatsApp
            </a>
          </div>

          <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-3">
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
                      ⚽ {match.home_team}
                    </div>
                    <div className={`min-w-[56px] text-center text-xl font-black ${done ? "text-orange-400" : "text-white/25"}`}>{score}</div>
                    <div className={`rounded-xl border px-4 py-3 text-base font-bold text-right ${at.bg} ${at.border} ${at.text}`}>
                      {match.away_team} ⚽
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
                      ⚽ {row.team}
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
              {["Rodada 1","Rodada 2","Rodada 3","Rodada 4","Rodada 5","Finais"].map((title) => (
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
        <section id="patrocinadores" className="mb-20">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500/70">Patrocinadores</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Nossos parceiros</h2>
          </div>

          {/* Naming */}
          <div className="mb-10 flex flex-col items-center">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Patrocinador Master</p>
            <a href="https://www.fatorial.com.br" target="_blank" rel="noreferrer"
              className="transition hover:scale-105">
              <img src="/logo-fatorial.png" alt="Fatorial Investimentos XP" className="h-20 w-auto object-contain" style={{mixBlendMode:"screen"}} />
            </a>
          </div>

          {/* Times */}
          <div className="mb-10">
            <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Patrocinadores de Time</p>
            <div className="flex w-full items-stretch gap-3">
              {allSponsors.filter(s => s.tier === "time").map((p) => (
                <a key={p.name} href={p.url || "#"} target={p.url ? "_blank" : "_self"} rel="noreferrer"
                  className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl border border-white/7 bg-white/[0.02] p-5 transition hover:border-orange-500/30 hover:bg-white/[0.05]">
                  <img src={p.logo} alt={p.name}
                    className="h-24 w-full object-contain"
                    style={{mixBlendMode:"screen"}} />
                  <span className="text-center text-xs text-white/40">{p.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Apoio */}
          <div className="flex flex-col items-center">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Apoio</p>
            <a href="https://www.netshoes.com.br" target="_blank" rel="noreferrer"
              className="flex items-center justify-center rounded-2xl border border-white/7 bg-white/[0.02] px-16 py-8 transition hover:border-orange-500/30 hover:bg-white/[0.05]">
              <img src="/logo-netshoes.png" alt="Netshoes" className="h-12 object-contain" style={{mixBlendMode:"screen"}} />
            </a>
          </div>
        </section>

        {/* RODAPÉ */}
        <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-10">
          <div className="flex items-center gap-3">
            <img src="/logo-nipa.png" alt="Nova Ipanema" className="h-14 w-14 object-contain rounded-full" />
            <div>
              <div className="font-black">Copa Nipa Fatorial Investimentos XP</div>
              <div className="text-xs text-white/40">Nova Ipanema — Barra da Tijuca — 2026</div>
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
