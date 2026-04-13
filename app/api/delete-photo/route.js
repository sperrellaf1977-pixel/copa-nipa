import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const { id, image_url } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Extrair nome do arquivo da URL
    const fileName = image_url.split("/gallery/")[1];
    if (fileName) {
      await supabase.storage.from("gallery").remove([fileName]);
    }

    const { error } = await supabase.from("gallery").delete().eq("id", id);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: "Erro ao deletar foto" }, { status: 500 });
  }
}
