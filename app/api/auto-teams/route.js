import { createClient } from "@supabase/supabase-js";

const DEFAULT_TEAMS = ["Time 1", "Time 2", "Time 3", "Time 4", "Time 5", "Time 6"];
const POSITION_ORDER = ["Goleiro", "Defesa", "Lateral", "Meio", "Ataque"];

function serpentine(players, numTeams) {
  const sorted = [...players].sort((a, b) => (b.rating || 0) - (a.rating || 0));
  const buckets = Array.from({ length: numTeams }, () => []);
  let forward = true;
  let idx = 0;
  for (const p of sorted) {
    buckets[idx].push(p);
    if (forward) { idx++; if (idx >= numTeams) { idx = numTeams - 1; forward = false; } }
    else { idx--; if (idx < 0) { idx = 0; forward = true; } }
  }
  return buckets;
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const preview = body.preview || false;
    const teamNames = body.teamNames && body.teamNames.length === 6 ? body.teamNames : DEFAULT_TEAMS;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("payment_status", "pago");

    if (error) return Response.json({ error: error.message }, { status: 500 });
    if (!data || data.length === 0) {
      return Response.json({ error: "Nenhum inscrito com pagamento confirmado." }, { status: 400 });
    }

    // Agrupa por posição
    const byPos = {};
    for (const pos of [...POSITION_ORDER, "Outros"]) byPos[pos] = [];
    for (const p of data) {
      const pos = POSITION_ORDER.includes(p.preferred_position) ? p.preferred_position : "Outros";
      byPos[pos].push(p);
    }

    // Distribui cada posição em serpentina entre os 6 times
    const buckets = Array.from({ length: 6 }, () => []);
    for (const pos of [...POSITION_ORDER, "Outros"]) {
      const distributed = serpentine(byPos[pos], 6);
      distributed.forEach((group, i) => buckets[i].push(...group));
    }

    // Monta stats por time
    const teamStats = {};
    for (let i = 0; i < 6; i++) {
      const name = teamNames[i];
      const players = buckets[i];
      const totalRating = players.reduce((s, p) => s + (p.rating || 3), 0);
      const avgRating = players.length ? (totalRating / players.length).toFixed(1) : "0.0";
      const posBreakdown = {};
      for (const p of players) {
        const pos = p.preferred_position || "Outros";
        if (!posBreakdown[pos]) posBreakdown[pos] = [];
        posBreakdown[pos].push(p);
      }
      teamStats[name] = { players, totalRating, avgRating, posBreakdown, count: players.length };
    }

    if (preview) return Response.json({ success: true, preview: true, teamStats });

    // Salva no banco
    const updates = [];
    for (let i = 0; i < 6; i++) {
      for (const p of buckets[i]) {
        updates.push(supabase.from("registrations").update({ team: teamNames[i] }).eq("id", p.id));
      }
    }
    await Promise.all(updates);

    return Response.json({ success: true, preview: false, teamStats });
  } catch (err) {
    return Response.json({ error: "Erro ao distribuir times" }, { status: 500 });
  }
}
