import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const round_title = formData.get("round_title");
    const round_subtitle = formData.get("round_subtitle");

    if (!file || !round_title) {
      return Response.json({ error: "Arquivo e título são obrigatórios" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, buffer, { contentType: file.type });

    if (uploadError) {
      return Response.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    const { error: dbError } = await supabase.from("gallery").insert([
      {
        round_title,
        round_subtitle: round_subtitle || "",
        image_url: urlData.publicUrl,
      },
    ]);

    if (dbError) {
      return Response.json({ error: dbError.message }, { status: 500 });
    }

    return Response.json({ success: true, url: urlData.publicUrl });
  } catch (err) {
    return Response.json({ error: "Erro ao fazer upload" }, { status: 500 });
  }
}
