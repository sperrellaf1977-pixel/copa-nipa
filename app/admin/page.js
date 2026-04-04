"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function nextStatus(current) {
  if (current === "pendente") return "pago";
  if (current === "pago") return "cancelado";
  return "pendente";
}

function statusClass(status) {
  if (status === "pago") {
    return "bg-green-500/20 text-green-300 px-2 py-1 rounded";
  }
  if (status === "cancelado") {
    return "bg-red-500/20 text-red-300 px-2 py-1 rounded";
  }
  return "bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded";
}

export default function AdminPage() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadRegistrations() {
    setLoading(true);

    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      setRegistrations([]);
    } else {
      console.log("DADOS:", data);
      setRegistrations(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadRegistrations();
  }, []);

  async function updatePaymentStatus(item) {
    const newStatus = nextStatus(item.payment_status || "pendente");

    await fetch("/api/update-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item.id,
        payment_status: newStatus,
      }),
    });

    loadRegistrations();
  }

  async function updateTeam(item, team) {
    await fetch("/api/update-team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item.id,
        team,
      }),
    });

    loadRegistrations();
  }

  async function updateRating(item, rating) {
    await fetch("/api/update-rating", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: item.id,
        rating,
      }),
    });

    loadRegistrations();
  }

  async function generateTeams() {
    if (!confirm("Deseja gerar os times automaticamente?")) return;

    await fetch("/api/auto-teams", {
      method: "POST",
    });

    loadRegistrations();
  }

  const total = registrations.length;
  const paid = registrations.filter((i) => i.payment_status === "pago").length;
  const pending = registrations.filter(
    (i) => !i.payment_status || i.payment_status === "pendente"
  ).length;
  const canceled = registrations.filter(
    (i) => i.payment_status === "cancelado"
  ).length;

  return (
    <main className="min-h-screen bg-[#05070b] text-white p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">Admin - Copa Nipa</h1>

        {/* DASHBOARD */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 p-4 rounded">Total: {total}</div>
          <div className="bg-green-500/10 p-4 rounded">Pagos: {paid}</div>
          <div className="bg-yellow-500/10 p-4 rounded">Pendentes: {pending}</div>
          <div className="bg-red-500/10 p-4 rounded">Cancelados: {canceled}</div>
        </div>

        {/* BOTÃO */}
        <div className="mb-6">
          <button
            onClick={generateTeams}
            className="bg-blue-600 px-5 py-3 rounded font-bold hover:bg-blue-700 transition"
          >
            Gerar times automaticamente
          </button>
        </div>

        {/* TABELA */}
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-white/60 border-b border-white/10">
              <th className="px-3 py-2 text-left">Nome</th>
              <th className="px-3 py-2 text-left">Telefone</th>
              <th className="px-3 py-2 text-left">Idade</th>
              <th className="px-3 py-2 text-left">Posição</th>
              <th className="px-3 py-2 text-left">Observações</th>
              <th className="px-3 py-2 text-center">Nota</th>
              <th className="px-3 py-2 text-left">Time</th>
              <th className="px-3 py-2 text-left">Pagamento</th>
              <th className="px-3 py-2 text-left">WhatsApp</th>
              <th className="px-3 py-2 text-left">Ação</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="11" className="text-center py-8">
                  Carregando...
                </td>
              </tr>
            ) : registrations.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center py-8 text-white/40">
                  Nenhuma inscrição encontrada
                </td>
              </tr>
            ) : (
              registrations.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-3 py-2">{item.full_name}</td>
                  <td className="px-3 py-2">{item.phone}</td>
                  <td className="px-3 py-2">{item.age}</td>
                  <td className="px-3 py-2">{item.preferred_position}</td>
                  <td className="px-3 py-2">{item.notes || "-"}</td>

                  {/* NOTA */}
                  <td className="px-3 py-2 text-center">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="1"
                      value={item.rating ?? ""}
                      onChange={(e) =>
                        updateRating(item, Number(e.target.value))
                      }
                      className="w-16 text-center bg-black/30 border border-white/10 px-2 py-1 rounded"
                    />
                  </td>

                  {/* TIME */}
                  <td className="px-3 py-2">
                    <select
                      value={item.team || ""}
                      onChange={(e) => updateTeam(item, e.target.value)}
                      className="bg-black/30 border border-white/10 px-2 py-1 rounded"
                    >
                      <option value="">Selecionar</option>
                      <option>Brasil</option>
                      <option>Portugal</option>
                      <option>Alemanha</option>
                      <option>Espanha</option>
                      <option>Itália</option>
                      <option>Argentina</option>
                    </select>
                  </td>

                  {/* STATUS */}
                  <td className="px-3 py-2">
                    <span className={statusClass(item.payment_status)}>
                      {item.payment_status || "pendente"}
                    </span>
                  </td>

                  {/* WHATSAPP */}
                  <td className="px-3 py-2">
                    <a
                      href={`https://wa.me/55${item.phone?.replace(/\D/g, "")}`}
                      target="_blank"
                      className="text-green-400 hover:underline"
                    >
                      WhatsApp
                    </a>
                  </td>

                  {/* BOTÃO */}
                  <td className="px-3 py-2">
                    <button
                      onClick={() => updatePaymentStatus(item)}
                      className="bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition"
                    >
                      Atualizar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>
    </main>
  );
}