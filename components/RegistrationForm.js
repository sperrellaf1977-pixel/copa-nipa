"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function RegistrationForm() {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    age: "",
    preferred_position: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("registrations").insert([
      {
        full_name: form.full_name,
        phone: form.phone,
        age: form.age ? Number(form.age) : null,
        preferred_position: form.preferred_position,
        notes: form.notes,
        payment_status: "pendente",
      },
    ]);

    if (error) {
  console.error("Supabase error completo:", JSON.stringify(error, null, 2));
  setMessage(`Não foi possível enviar a inscrição: ${error.message}`);
} else {
      setMessage("Inscrição enviada com sucesso.");
      setForm({
        full_name: "",
        phone: "",
        age: "",
        preferred_position: "",
        notes: "",
      });
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
        className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/35"
        placeholder="Nome completo"
        required
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/35"
        placeholder="Telefone / WhatsApp"
        required
      />

      <input
        name="age"
        value={form.age}
        onChange={handleChange}
        className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/35"
        placeholder="Idade"
      />

      <select
        name="preferred_position"
        value={form.preferred_position}
        onChange={handleChange}
        className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70 outline-none"
        required
      >
        <option value="">Posição preferida</option>
        <option value="Ataque">Ataque</option>
        <option value="Meio">Meio</option>
        <option value="Defesa">Defesa</option>
        <option value="Lateral">Lateral</option>
        <option value="Goleiro">Goleiro</option>
      </select>

      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        className="min-h-[120px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/35"
        placeholder="Observações"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-2xl bg-[#1a8ad8] px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Enviar inscrição"}
      </button>

      {message && <p className="text-sm text-white/70">{message}</p>}
    </form>
  );
}