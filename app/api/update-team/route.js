import { createClient } from "@supabase/supabase-js";

export async function POST() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data: players, error } = await supabase
      .from("registrations")
      .select("*")
      .order("rating", { ascending: false });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    if (!players || players.length === 0) {
      return Response.json({ error: "Sem jogadores" }, { status: 400 });
    }

    const teams = ["Brasil", "Portugal", "Alemanha", "Espanha"];

    const teamAssignments = [];
    let direction = 1;
    let index = 0;

    players.forEach((player) => {
      const team = teams[index];

      teamAssignments.push({
        id: player.id,
        team,
      });

      if (direction === 1) {
        index++;
        if (index === teams.length - 1) direction = -1;
      } else {
        index--;
        if (index === 0) direction = 1;
      }
    });

    // Atualiza no banco
    for (const item of teamAssignments) {
      await supabase
        .from("registrations")
        .update({ team: item.team })
        .eq("id", item.id);
    }

    return Response.json({ success: true });

  } catch (err) {
    return Response.json(
      { error: "Erro ao gerar times" },
      { status: 500 }
    );
  }
}