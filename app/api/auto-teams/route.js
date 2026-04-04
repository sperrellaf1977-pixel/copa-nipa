import { createClient } from "@supabase/supabase-js";

const TEAMS = ["Brasil", "Portugal", "Alemanha", "Espanha", "Itália", "Argentina"];

export async function POST() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase
      .from("registrations")
      .select("*");

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return Response.json({ success: true });
    }

    // embaralhar jogadores
    const shuffled = [...data].sort(() => Math.random() - 0.5);

    // distribuir
    const updates = shuffled.map((player, index) => {
      const team = TEAMS[index % TEAMS.length];

      return supabase
        .from("registrations")
        .update({ team })
        .eq("id", player.id);
    });

    await Promise.all(updates);

    return Response.json({ success: true });
  } catch (err) {
    return Response.json(
      { error: "Erro ao distribuir times" },
      { status: 500 }
    );
  }
}