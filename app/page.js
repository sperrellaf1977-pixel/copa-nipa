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

const teamStyles = {
  Brasil:    { chip: "text-[#86efac]",  bg: "from-[#052e16] to-[#14532d]",  border: "border-[#166534]/50", flag: "🇧🇷" },
  Portugal:  { chip: "text-[#fca5a5]",  bg: "from-[#450a0a] to-[#7f1d1d]",  border: "border-[#991b1b]/50", flag: "🇵🇹" },
  Alemanha:  { chip: "text-[#fde68a]",  bg: "from-[#1c1917] to-[#292524]",  border: "border-[#78716c]/50", flag: "🇩🇪" },
  Espanha:   { chip: "text-[#fca5a5]",  bg: "from-[#450a0a] to-[#92400e]",  border: "border-[#b91c1c]/50", flag: "🇪🇸" },
  "Itália":  { chip: "text-[#bfdbfe]",  bg: "from-[#0c1445] to-[#1e3a8a]",  border: "border-[#1d4ed8]/50", flag: "🇮🇹" },
  Argentina: { chip: "text-[#bae6fd]",  bg: "from-[#082f49] to-[#0c4a6e]",  border: "border-[#0284c7]/50", flag: "🇦🇷" },
};
const getTeamStyle = (team) => teamStyles[team] || { chip: "text-white/70", bg: "from-[#0f172a] to-[#1e293b]", border: "border-white/10", flag: "⚽" };

const awards = [
  { title: "Craque de cada jogo", icon: "⭐" },
  { title: "Craque da rodada", icon: "🏅" },
  { title: "Artilheiro", icon: "⚽" },
  { title: "Melhor goleiro", icon: "🧤" },
  { title: "Craque do torneio", icon: "🏆" },
];

const sponsorPlans = [
  { name: "Naming Rights", price: "R$ 10.000", subtitle: "1 cota disponível", highlight: "Cota principal", icon: "👑",
    features: ["A marca dá nome oficial ao torneio", "Exemplo: Copa Nipa + nome da marca", "Maior exposição em toda a comunicação", "Presença no site oficial e nas mídias", "Associação direta à identidade do evento", "Possibilidade de ativações especiais"] },
  { name: "Patrocínio de Time", price: "R$ 4.000", subtitle: "6 cotas disponíveis", highlight: "Uma marca por equipe", icon: "🎽",
    features: ["Patrocínio exclusivo de uma das 6 equipes", "Marca na parte frontal do uniforme", "Associação direta à equipe no torneio", "Presença nas mídias oficiais da equipe", "Exposição recorrente ao longo das rodadas", "Proximidade com o público do condomínio"] },
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
    <div className="min-h-screen text-white" style={{ background: "linear-gradient(160deg, #0a0f1e 0%, #0d1428 40%, #0a0e1a 100%)" }}>

      {/* Fundo decorativo */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(30,64,175,0.12) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* NAVBAR */}
      <nav style={{ borderBottom: "1px solid rgba(249,115,22,0.15)", background: "rgba(10,14,26,0.85)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(30,64,175,0.2))", border: "2px solid rgba(249,115,22,0.3)", borderRadius: "14px", padding: "4px" }}>
                <img src="/logo-nipa.png" alt="Nova Ipanema" className="h-12 w-12 rounded-xl object-contain" />
              </div>
              <div>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", color: "rgba(249,115,22,0.7)", textTransform: "uppercase" }}>Nova Ipanema</div>
                <div style={{ fontSize: "20px", fontWeight: 900, letterSpacing: "-0.02em", background: "linear-gradient(90deg, #fff 60%, rgba(249,115,22,0.8))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Copa Nipa 2026
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[["jogos","Jogos"],["classificacao","Classificação"],["premiacoes","Premiações"],["galeria","Galeria"],["inscricao","Inscrição"],["patrocinadores","Patrocinadores"]].map(([id, label]) => (
                <a key={id} href={`#${id}`} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: "999px", padding: "6px 16px", fontSize: "13px", color: "rgba(255,255,255,0.6)", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.target.style.borderColor = "rgba(249,115,22,0.4)"; e.target.style.color = "#fff"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.color = "rgba(255,255,255,0.6)"; }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10">

        {/* HERO */}
        <section className="mb-20">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: "999px", padding: "6px 16px", marginBottom: "24px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f97316", display: "inline-block", boxShadow: "0 0 8px #f97316" }} />
            <span style={{ fontSize: "13px", color: "#fb923c", fontWeight: 600 }}>Copa Nipa 2026 • 6 seleções • 7 sábados • Barra da Tijuca</span>
          </div>

          <h1 style={{ fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: "24px" }}>
            O melhor torneio<br />
            <span style={{ background: "linear-gradient(90deg, #f97316, #fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>de futebol society</span><br />
            da Barra da Tijuca
          </h1>

          <p style={{ maxWidth: "580px", fontSize: "17px", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", marginBottom: "36px" }}>
            A Copa Nipa nasce com posicionamento forte, visual moderno e espírito competitivo.
            Um campeonato com identidade própria e calendário definido.
          </p>

          <div className="flex flex-wrap gap-3 mb-14">
            <a href="#inscricao" style={{ background: "linear-gradient(135deg, #f97316, #ea580c)", borderRadius: "14px", padding: "13px 28px", fontSize: "14px", fontWeight: 700, color: "#fff", textDecoration: "none", boxShadow: "0 8px 32px rgba(249,115,22,0.35)" }}>
              Fazer inscrição
            </a>
            <a href="#patrocinadores" style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px", padding: "13px 28px", fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.8)", textDecoration: "none", background: "rgba(255,255,255,0.03)" }}>
              Seja patrocinador
            </a>
            <a href={whatsappLink} target="_blank" rel="noreferrer" style={{ border: "1px solid rgba(37,211,102,0.3)", borderRadius: "14px", padding: "13px 28px", fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.8)", textDecoration: "none", background: "rgba(37,211,102,0.08)" }}>
              💬 WhatsApp
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[["7", "sábados de competição", "#f97316"], ["R$ 120", "inscrição com uniforme", "#22c55e"], ["Top 4", "avançam para semifinal", "#3b82f6"]].map(([v, l, c]) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "24px", borderTop: `3px solid ${c}` }}>
                <div style={{ fontSize: "32px", fontWeight: 900, color: c }}>{v}</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "6px" }}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* JOGOS */}
        <section id="jogos" className="mb-20">
          <div className="mb-8">
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.3em", color: "rgba(249,115,22,0.7)", textTransform: "uppercase", marginBottom: "8px" }}>Jogos</div>
            <h2 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em" }}>Calendário oficial</h2>
          </div>
          <div className="grid gap-3">
            {matches.map((match) => {
              const hs = getTeamStyle(match.home_team);
              const as_ = getTeamStyle(match.away_team);
              const score = match.home_score !== null && match.away_score !== null ? `${match.home_score} x ${match.away_score}` : "VS";
              const done = match.status === "Finalizado";
              return (
                <div key={match.id} style={{ background: `linear-gradient(135deg, ${done ? "rgba(249,115,22,0.05)" : "rgba(255,255,255,0.02)"}, rgba(255,255,255,0.01))`, border: `1px solid ${done ? "rgba(249,115,22,0.2)" : "rgba(255,255,255,0.06)"}`, borderRadius: "16px", padding: "16px 20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", color: done ? "#fb923c" : "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>{match.stage}</span>
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>{match.match_date}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "12px" }}>
                    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "12px 16px", fontSize: "16px", fontWeight: 800, color: hs.chip }}>
                      {hs.flag} {match.home_team}
                    </div>
                    <div style={{ textAlign: "center", fontSize: done ? "22px" : "16px", fontWeight: 900, color: done ? "#f97316" : "rgba(255,255,255,0.3)", minWidth: "60px" }}>{score}</div>
                    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "12px 16px", fontSize: "16px", fontWeight: 800, color: as_.chip, textAlign: "right" }}>
                      {match.away_team} {as_.flag}
                    </div>
                  </div>
                  <div style={{ marginTop: "10px", fontSize: "11px", color: done ? "rgba(249,115,22,0.6)" : "rgba(255,255,255,0.25)" }}>{match.status}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CLASSIFICAÇÃO */}
        <section id="classificacao" className="mb-20">
          <div className="mb-8">
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.3em", color: "rgba(249,115,22,0.7)", textTransform: "uppercase", marginBottom: "8px" }}>Classificação</div>
            <h2 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em" }}>Tabela geral</h2>
          </div>
          <div style={{ overflow: "hidden", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "rgba(249,115,22,0.08)", borderBottom: "1px solid rgba(249,115,22,0.15)" }}>
                  {["#", "Time", "PTS", "PJ", "VIT", "EMP", "DER", "SG"].map((h) => (
                    <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "rgba(249,115,22,0.7)", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {standings.map((row, i) => (
                  <tr key={row.team} style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: i < 4 ? "rgba(249,115,22,0.04)" : "transparent" }}>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: i < 4 ? "#f97316" : "rgba(255,255,255,0.4)" }}>{i + 1}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 700 }}>
                      {getTeamStyle(row.team).flag} {row.team}
                      {i < 4 && <span style={{ marginLeft: "8px", fontSize: "10px", background: "rgba(249,115,22,0.15)", color: "#fb923c", border: "1px solid rgba(249,115,22,0.3)", borderRadius: "999px", padding: "2px 8px" }}>↑ Semi</span>}
                    </td>
                    <td style={{ padding: "14px 16px", fontWeight: 900, color: "#f97316", fontSize: "16px" }}>{row.pts}</td>
                    <td style={{ padding: "14px 16px", color: "rgba(255,255,255,0.6)" }}>{row.pj}</td>
                    <td style={{ padding: "14px 16px", color: "#86efac" }}>{row.vit}</td>
                    <td style={{ padding: "14px 16px", color: "rgba(255,255,255,0.5)" }}>{row.emp}</td>
                    <td style={{ padding: "14px 16px", color: "#fca5a5" }}>{row.der}</td>
                    <td style={{ padding: "14px 16px", color: row.sg > 0 ? "#86efac" : row.sg < 0 ? "#fca5a5" : "rgba(255,255,255,0.5)", fontWeight: 700 }}>{row.sg > 0 ? `+${row.sg}` : row.sg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: "12px", fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>Os 4 primeiros avançam para as semifinais.</p>
        </section>

        {/* PREMIAÇÕES */}
        <section id="premiacoes" className="mb-20">
          <div className="mb-8">
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.3em", color: "rgba(249,115,22,0.7)", textTransform: "uppercase", marginBottom: "8px" }}>Premiações</div>
            <h2 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em" }}>Destaques do torneio</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {awards.map((award) => (
              <div key={award.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "24px", textAlign: "center", transition: "all 0.2s" }}>
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{award.icon}</div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>{award.title}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "6px" }}>Acompanhamento durante o torneio</div>
              </div>
            ))}
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria" className="mb-20">
          <div className="mb-8">
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.3em", color: "rgba(249,115,22,0.7)", textTransform: "uppercase", marginBottom: "8px" }}>Galeria</div>
            <h2 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em" }}>Fotos e melhores momentos</h2>
          </div>
          {galleryRounds.length === 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {["Rodada 1","Rodada 2","Rodada 3","Rodada 4","Rodada 5","Finais"].map((title, i) => (
                <div key={title} style={{ overflow: "hidden", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
                  <div style={{ height: "200px", background: `linear-gradient(135deg, rgba(249,115,22,0.${i % 2 === 0 ? "08" : "05"}), rgba(30,64,175,0.1))`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "48px", opacity: 0.3 }}>📸</span>
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    <div style={{ fontWeight: 700, fontSize: "15px" }}>{title}</div>
                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginTop: "4px", fontStyle: "italic" }}>Fotos em breve</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            galleryRounds.map((round) => (
              <div key={round.title} className="mb-10">
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: 800 }}>{round.title}</h3>
                  {round.subtitle && <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>{round.subtitle}</span>}
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {round.photos.map((photo) => (
                    <div key={photo.id} style={{ overflow: "hidden", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <img src={photo.image_url} alt={round.title} style={{ width: "100%", height: "220px", objectFit: "cover", transition: "transform 0.3s" }}
                        onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>

        {/* INSCRIÇÃO */}
        <section id="inscricao" className="mb-20">
          <div style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.08), rgba(30,64,175,0.08))", border: "1px solid rgba(249,115,22,0.2)", borderRadius: "28px", padding: "48px" }}>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.3em", color: "rgba(249,115,22,0.7)", textTransform: "uppercase", marginBottom: "12px" }}>Inscrição individual</div>
                <h2 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "16px" }}>Inscreva-se para jogar a Copa Nipa</h2>
                <p style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(255,255,255,0.6)", marginBottom: "24px" }}>
                  As inscrições são individuais, no valor de R$ 120, com direito a uniforme completo: camisa e calção.
                  O atleta informa sua posição preferida para ajudar na montagem equilibrada das equipes.
                </p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "14px", padding: "12px 20px", fontSize: "14px", color: "#86efac", fontWeight: 600 }}>
                  💰 R$ 120 — inclui camisa + calção
                </div>
                <div style={{ marginTop: "16px", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                  Posições: ataque • meio • defesa • lateral • goleiro
                </div>
              </div>
              <RegistrationForm />
            </div>
          </div>
        </section>

        {/* PATROCINADORES */}
        <section id="patrocinadores">
          <div className="mb-8">
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.3em", color: "rgba(249,115,22,0.7)", textTransform: "uppercase", marginBottom: "8px" }}>Patrocinadores</div>
            <h2 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.02em" }}>Cotas e oportunidades de marca</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 mb-12">
            {[["100+","atletas envolvidos","#f97316"],["500+","pessoas impactadas","#3b82f6"],["3 meses","de exposição da marca","#22c55e"]].map(([v,l,c]) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "28px", borderLeft: `4px solid ${c}` }}>
                <div style={{ fontSize: "36px", fontWeight: 900, color: c }}>{v}</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "6px" }}>{l}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] mb-12">
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "24px", padding: "36px" }}>
              <p style={{ fontSize: "16px", lineHeight: 1.9, color: "rgba(255,255,255,0.65)" }}>
                A Copa Nipa é mais do que um torneio — é uma plataforma de relacionamento e presença de marca dentro de um dos ambientes residenciais mais relevantes da Barra da Tijuca.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.9, color: "rgba(255,255,255,0.65)", marginTop: "20px" }}>
                Ao patrocinar a Copa Nipa, sua marca se conecta com um público recorrente, presente e altamente engajado.
              </p>
              <div style={{ marginTop: "28px", background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: "14px", padding: "16px 20px", fontSize: "14px", color: "#fb923c", fontWeight: 600 }}>
                🏆 Seja o naming rights ou patrocine um dos 6 times da Copa Nipa.
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "24px", padding: "36px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "20px" }}>Entregas e benefícios</h3>
              <div style={{ display: "grid", gap: "10px" }}>
                {brandBenefits.map((b, i) => (
                  <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "rgba(255,255,255,0.65)" }}>
                    <span style={{ color: "#f97316", fontWeight: 700, flexShrink: 0 }}>0{i+1}.</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.3em", color: "rgba(249,115,22,0.7)", textTransform: "uppercase", marginBottom: "8px" }}>Parceiros confirmados</div>
            <h3 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "20px" }}>Marcas que já estão com a Copa Nipa</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {confirmedPartners.map((p) => (
                <div key={p} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "24px", textAlign: "center", fontWeight: 700, fontSize: "16px" }}>
                  {p}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {sponsorPlans.map((plan) => (
              <div key={plan.name} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: "24px", padding: "32px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: "200px", height: "200px", background: "radial-gradient(circle, rgba(249,115,22,0.06), transparent 70%)", pointerEvents: "none" }} />
                <div style={{ fontSize: "24px", marginBottom: "12px" }}>{plan.icon}</div>
                <div style={{ display: "inline-flex", background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: "999px", padding: "4px 12px", fontSize: "12px", color: "#fb923c", fontWeight: 600, marginBottom: "12px" }}>{plan.highlight}</div>
                <div style={{ fontSize: "22px", fontWeight: 800, marginBottom: "4px" }}>{plan.name}</div>
                <div style={{ fontSize: "28px", fontWeight: 900, color: "#f97316", marginBottom: "4px" }}>{plan.price}</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "24px" }}>{plan.subtitle}</div>
                <ul style={{ display: "grid", gap: "10px", marginBottom: "28px" }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", gap: "8px", fontSize: "14px", color: "rgba(255,255,255,0.65)" }}>
                      <span style={{ color: "#f97316" }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href={whatsappLink} target="_blank" rel="noreferrer" style={{ display: "block", background: "linear-gradient(135deg, #f97316, #ea580c)", borderRadius: "14px", padding: "14px", textAlign: "center", fontSize: "14px", fontWeight: 700, color: "#fff", textDecoration: "none", boxShadow: "0 8px 24px rgba(249,115,22,0.3)" }}>
                  Solicitar proposta
                </a>
              </div>
            ))}
          </div>

          <div style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.1), rgba(30,64,175,0.1))", border: "1px solid rgba(249,115,22,0.2)", borderRadius: "28px", padding: "56px", textAlign: "center" }}>
            <h3 style={{ fontSize: "32px", fontWeight: 900, letterSpacing: "-0.02em", marginBottom: "16px" }}>
              Dê nome ao torneio ou<br />patrocine um dos times
            </h3>
            <p style={{ maxWidth: "520px", margin: "0 auto 32px", fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }}>
              Naming rights por R$ 10.000 ou patrocínio de equipe por R$ 4.000. Uma oportunidade real de posicionar sua marca na Barra da Tijuca.
            </p>
            <a href={whatsappLink} target="_blank" rel="noreferrer" style={{ display: "inline-block", background: "linear-gradient(135deg, #f97316, #ea580c)", borderRadius: "16px", padding: "16px 40px", fontSize: "15px", fontWeight: 700, color: "#fff", textDecoration: "none", boxShadow: "0 12px 40px rgba(249,115,22,0.4)" }}>
              Falar sobre patrocínio
            </a>
          </div>
        </section>

        {/* RODAPÉ */}
        <footer style={{ marginTop: "80px", paddingTop: "40px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="/logo-nipa.png" alt="Nova Ipanema" style={{ height: "40px", width: "40px", borderRadius: "10px", objectFit: "contain" }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: "15px" }}>Copa Nipa 2026</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Nova Ipanema — Barra da Tijuca</div>
            </div>
          </div>
          <a href={whatsappLink} target="_blank" rel="noreferrer" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
            💬 (21) 99340-5995
          </a>
        </footer>
      </main>
    </div>
  );
}
