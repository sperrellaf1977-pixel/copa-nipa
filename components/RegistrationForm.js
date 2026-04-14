"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function RegistrationForm() {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    age: "",
    preferred_position: "",
    resident_type: "",
    pelada_frequency: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
        resident_type: form.resident_type,
        pelada_frequency: form.pelada_frequency,
        notes: form.notes,
        payment_status: "pendente",
      },
    ]);

    if (error) {
      console.error("Supabase error:", JSON.stringify(error, null, 2));
      setMessage(`Não foi possível enviar a inscrição: ${error.message}`);
    } else {
      setMessage("Inscrição enviada com sucesso! Entraremos em contato em breve.");
      setForm({
        full_name: "",
        phone: "",
        age: "",
        preferred_position: "",
        resident_type: "",
        pelada_frequency: "",
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

      <select
        name="resident_type"
        value={form.resident_type}
        onChange={handleChange}
        className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70 outline-none"
        required
      >
        <option value="">Você é morador ou convidado?</option>
        <option value="Morador">Morador</option>
        <option value="Convidado">Convidado</option>
      </select>

      <select
        name="pelada_frequency"
        value={form.pelada_frequency}
        onChange={handleChange}
        className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70 outline-none"
        required
      >
        <option value="">Qual pelada você costuma frequentar?</option>
        <option value="Terça">Terça-feira</option>
        <option value="Quinta">Quinta-feira</option>
        <option value="Final de semana">Final de semana</option>
        <option value="Mais de uma">Mais de uma</option>
        <option value="Não frequento">Não frequento pelada</option>
      </select>

      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        className="min-h-[100px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/35"
        placeholder="Observações (opcional)"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Enviar inscrição"}
      </button>

      {message && (
        <p className={`text-sm ${message.includes("sucesso") ? "text-green-400" : "text-red-400"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
