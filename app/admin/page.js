"use client";

import { useEffect, useState } from "react";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function sbFetch(table, options = {}) {
  const { order, filter } = options;
  let url = `${SUPABASE_URL}/rest/v1/${table}?select=*`;
  if (order) url += `&order=${order}`;
  if (filter) url += `&${filter}`;
  const res = await fetch(url, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  return res.json();
}

async function sbUpdate(table, id, data) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: "PATCH",
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(data),
  });
  return res;
}

async function sbDelete(table, id) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: "DELETE",
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  return res;
}

const TABS = ["Inscrições", "Resultados", "Galeria", "Times"];

export default function AdminPage() {
  const [tab, setTab] = useState("Inscrições");

  return (
    <div className="min-h-screen bg-[#05070b] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">⚽ Copa Nipa — Admin</h1>
            <p className="mt-1 text-sm text-white/50">Painel de controle do torneio</p>
          </div>
          <a href="/" target="_blank" className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/60 hover:bg-white/5">
            Ver site →
          </a>
        </div>

        <div className="mb-8 flex gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${tab === t ? "bg-[#1a8ad8] text-white" : "text-white/50 hover:text-white"}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === "Inscrições" && <TabInscricoes />}
        {tab === "Resultados" && <TabResultados />}
        {tab === "Galeria" && <TabGaleria />}
        {tab === "Times" && <TabTimes />}
      </div>
    </div>
  );
}

function TabInscricoes() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    const data = await sbFetch("registrations", { order: "id.desc" });
    setRegistrations(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function togglePayment(item) {
    const next = item.payment_status === "pendente" ? "pago" : item.payment_status === "pago" ? "cancelado" : "pendente";
    await fetch("/api/update-payment", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, payment_status: next }),
    });
    load();
  }

  async function updateTeam(item, team) {
    await fetch("/api/update-team", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, team }),
    });
    load();
  }

  async function updateRating(item, rating) {
    const newRating = item.rating === rating ? null : rating;
    const res = await fetch("/api/update-rating", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, rating: newRating }),
    });
    const json = await res.json();
    if (json.error) alert("Erro ao salvar nota: " + json.error);
    load();
  }

  async function deleteRegistration(item) {
    if (!confirm(`Excluir inscrição de ${item.full_name}? Esta ação não pode ser desfeita.`)) return;
    const res = await fetch("/api/delete-registration", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id }),
    });
    const json = await res.json();
    if (json.error) alert("Erro ao excluir: " + json.error);
    load();
  }



  const filtered = registrations.filter((r) =>
    r.full_name?.toLowerCase().includes(search.toLowerCase()) || r.phone?.includes(search)
  );

  const statusColor = (s) =>
    s === "pago" ? "bg-green-500/20 text-green-300" :
    s === "cancelado" ? "bg-red-500/20 text-red-300" : "bg-yellow-500/20 text-yellow-300";

  const teams = ["Brasil", "Portugal", "Alemanha", "Espanha", "Itália", "Argentina"];
  const paid = registrations.filter((r) => r.payment_status === "pago").length;

  return (
    <div>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[["Total", registrations.length, "text-white"], ["Pagos", paid, "text-green-400"], ["Pendentes", registrations.length - paid, "text-yellow-400"]].map(([l, v, c]) => (
          <div key={l} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className={`text-3xl font-black ${c}`}>{v}</div>
            <div className="mt-1 text-sm text-white/50">{l}</div>
          </div>
        ))}
      </div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nome ou telefone..."
        className="mb-4 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none placeholder:text-white/35" />
      {loading ? <p className="text-white/40">Carregando...</p> : (
        <div className="grid gap-3">
          {filtered.map((r) => (
            <div key={r.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-bold">{r.full_name}</div>
                  <div className="mt-1 text-sm text-white/50">
                    {r.phone} {r.age ? `• ${r.age} anos` : ""} {r.preferred_position ? `• ${r.preferred_position}` : ""} {r.nickname ? `• "${r.nickname}"` : ""}
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {r.resident_type && (
                      <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400">
                        {r.resident_type}
                      </span>
                    )}
                    {r.pelada_frequency && (
                      <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
                        Pelada: {r.pelada_frequency}
                      </span>
                    )}
                  </div>
                  {r.notes && <div className="mt-1 text-xs text-white/40 italic">{r.notes}</div>}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => togglePayment(r)} className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${statusColor(r.payment_status || "pendente")}`}>
                    {r.payment_status || "pendente"}
                  </button>
                  <button onClick={() => deleteRegistration(r)} className="rounded-xl border border-red-500/20 px-2.5 py-1.5 text-xs text-red-400 hover:bg-red-500/10" title="Excluir inscrição">
                    🗑️
                  </button>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-xs text-white/40">Time:</span>
                {teams.map((t) => (
                  <button key={t} onClick={() => updateTeam(r, t)}
                    className={`rounded-lg px-2.5 py-1 text-xs transition ${r.team === t ? "bg-[#1a8ad8] text-white" : "border border-white/10 text-white/50 hover:border-white/20"}`}>
                    {t}
                  </button>
                ))}
                {r.team && (
                  <button onClick={() => updateTeam(r, null)} className="rounded-lg border border-red-500/20 px-2.5 py-1 text-xs text-red-400 hover:bg-red-500/10">Remover</button>
                )}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-white/40">Nota (1-5):</span>
                {[1,2,3,4,5].map((n) => (
                  <button key={n} onClick={() => updateRating(r, n)}
                    className={`rounded-lg w-8 h-8 text-sm font-bold transition ${
                      r.rating === n
                        ? "bg-orange-500 text-white"
                        : "border border-white/10 text-white/40 hover:border-orange-500/40 hover:text-orange-400"
                    }`}>
                    {n}
                  </button>
                ))}
                {r.rating && (
                  <span className="ml-2 text-xs text-orange-400 font-semibold">{"⭐".repeat(r.rating)}</span>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-white/40">Nenhuma inscrição encontrada.</p>}
        </div>
      )}
    </div>
  );
}

function TabResultados() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ home_score: "", away_score: "", status: "" });
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const data = await sbFetch("matches", { order: "id.asc" });
    setMatches(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function startEdit(match) {
    setEditing(match.id);
    setForm({ home_score: match.home_score ?? "", away_score: match.away_score ?? "", status: match.status });
  }

  async function save(match) {
    setSaving(true);
    const homeScore = form.home_score !== "" ? parseInt(form.home_score) : null;
    const awayScore = form.away_score !== "" ? parseInt(form.away_score) : null;
    const status = homeScore !== null && awayScore !== null ? "Finalizado" : form.status;
    await fetch("/api/update-match", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: match.id, home_score: homeScore, away_score: awayScore, status }),
    });
    setEditing(null);
    setSaving(false);
    load();
  }

  const stages = [...new Set(matches.map((m) => m.stage))];

  return (
    <div>
      <p className="mb-6 text-sm text-white/50">Clique em <strong className="text-white">Editar</strong> para atualizar o placar. A classificação é recalculada automaticamente.</p>
      {loading ? <p className="text-white/40">Carregando...</p> : stages.map((stage) => (
        <div key={stage} className="mb-8">
          <h3 className="mb-3 text-lg font-bold text-[#1a8ad8]">{stage}</h3>
          <div className="grid gap-3">
            {matches.filter((m) => m.stage === stage).map((match) => (
              <div key={match.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                {editing === match.id ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-semibold">{match.home_team}</span>
                    <input type="number" min="0" max="99" value={form.home_score} onChange={(e) => setForm({ ...form, home_score: e.target.value })}
                      className="w-16 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-center text-sm outline-none" placeholder="0" />
                    <span className="text-white/40">x</span>
                    <input type="number" min="0" max="99" value={form.away_score} onChange={(e) => setForm({ ...form, away_score: e.target.value })}
                      className="w-16 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-center text-sm outline-none" placeholder="0" />
                    <span className="font-semibold">{match.away_team}</span>
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                      className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none">
                      <option value="Em breve">Em breve</option>
                      <option value="Finalizado">Finalizado</option>
                      <option value="A definir">A definir</option>
                      <option value="Grande Final">Grande Final</option>
                    </select>
                    <button onClick={() => save(match)} disabled={saving} className="rounded-xl bg-[#1a8ad8] px-4 py-2 text-sm font-semibold disabled:opacity-50">
                      {saving ? "Salvando..." : "Salvar"}
                    </button>
                    <button onClick={() => setEditing(null)} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/50">Cancelar</button>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{match.home_team}</span>
                      <span className="rounded-xl border border-white/10 bg-black/20 px-4 py-1.5 font-black">
                        {match.home_score !== null ? `${match.home_score} x ${match.away_score}` : "— x —"}
                      </span>
                      <span className="font-semibold">{match.away_team}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`rounded-lg px-2.5 py-1 text-xs ${match.status === "Finalizado" ? "bg-green-500/20 text-green-300" : match.status === "Grande Final" ? "bg-yellow-500/20 text-yellow-300" : "bg-white/5 text-white/40"}`}>
                        {match.status}
                      </span>
                      <button onClick={() => startEdit(match)} className="rounded-xl border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:bg-white/5">Editar</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TabGaleria() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ round_title: "Rodada 1", round_subtitle: "", file: null });
  const [preview, setPreview] = useState(null);
  const [msg, setMsg] = useState("");

  const rounds = ["Rodada 1","Rodada 2","Rodada 3","Rodada 4","Rodada 5","Semifinal","Final"];

  async function load() {
    setLoading(true);
    const data = await sbFetch("gallery", { order: "created_at.desc" });
    setPhotos(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, file }));
    setPreview(URL.createObjectURL(file));
  }

  async function upload() {
    if (!form.file) return;
    setUploading(true);
    setMsg("");
    const fd = new FormData();
    fd.append("file", form.file);
    fd.append("round_title", form.round_title);
    fd.append("round_subtitle", form.round_subtitle);
    const res = await fetch("/api/upload-photo", { method: "POST", body: fd });
    const json = await res.json();
    if (json.success) {
      setMsg("Foto enviada com sucesso!");
      setForm({ round_title: "Rodada 1", round_subtitle: "", file: null });
      setPreview(null);
      load();
    } else {
      setMsg("Erro: " + json.error);
    }
    setUploading(false);
  }

  async function deletePhoto(photo) {
    if (!confirm("Deletar esta foto?")) return;
    await fetch("/api/delete-photo", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: photo.id, image_url: photo.image_url }),
    });
    load();
  }

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h3 className="mb-4 font-bold">Adicionar foto</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-white/50">Rodada</label>
            <select value={form.round_title} onChange={(e) => setForm({ ...form, round_title: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none">
              {rounds.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-white/50">Legenda (opcional)</label>
            <input value={form.round_subtitle} onChange={(e) => setForm({ ...form, round_subtitle: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm outline-none placeholder:text-white/30" placeholder="Ex: Gol do Brasil" />
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-1 block text-xs text-white/50">Foto</label>
          <input type="file" accept="image/*" onChange={handleFile}
            className="text-sm text-white/60 file:mr-3 file:rounded-xl file:border-0 file:bg-[#1a8ad8] file:px-4 file:py-2 file:text-sm file:text-white" />
        </div>
        {preview && <img src={preview} alt="Preview" className="mt-4 h-40 rounded-xl object-cover" />}
        <button onClick={upload} disabled={uploading || !form.file} className="mt-4 rounded-xl bg-[#1a8ad8] px-6 py-2.5 text-sm font-semibold disabled:opacity-50">
          {uploading ? "Enviando..." : "Enviar foto"}
        </button>
        {msg && <p className="mt-3 text-sm text-white/60">{msg}</p>}
      </div>

      <h3 className="mb-4 font-bold">Fotos na galeria ({photos.length})</h3>
      {loading ? <p className="text-white/40">Carregando...</p> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <div key={photo.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <img src={photo.image_url} alt={photo.round_title} className="h-44 w-full object-cover" />
              <div className="flex items-center justify-between p-3">
                <div>
                  <div className="text-sm font-semibold">{photo.round_title}</div>
                  {photo.round_subtitle && <div className="text-xs text-white/40">{photo.round_subtitle}</div>}
                </div>
                <button onClick={() => deletePhoto(photo)} className="rounded-lg border border-red-500/20 px-2.5 py-1 text-xs text-red-400 hover:bg-red-500/10">Deletar</button>
              </div>
            </div>
          ))}
          {photos.length === 0 && <p className="text-white/40">Nenhuma foto ainda.</p>}
        </div>
      )}
    </div>
  );
}

// ─── ABA: TIMES ─────────────────────────────────────
function TabTimes() {
  const DEFAULT_NAMES = ["Time 1", "Time 2", "Time 3", "Time 4", "Time 5", "Time 6"];
  const [teamNames, setTeamNames] = useState([...DEFAULT_NAMES]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const POSITION_ORDER = ["Goleiro", "Defesa", "Lateral", "Meio", "Ataque", "Outros"];
  const POS_COLOR = {
    Goleiro: "text-yellow-400", Defesa: "text-blue-400",
    Lateral: "text-sky-400", Meio: "text-green-400",
    Ataque: "text-red-400", Outros: "text-white/40",
  };

  async function handlePreview() {
    setLoading(true);
    setMsg("");
    setPreview(null);
    const res = await fetch("/api/auto-teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ preview: true, teamNames }),
    });
    const json = await res.json();
    if (json.error) setMsg("Erro: " + json.error);
    else setPreview(json.teamStats);
    setLoading(false);
  }

  async function handleConfirm() {
    if (!confirm("Confirmar distribuição? Os times atuais serão substituídos.")) return;
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/auto-teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ preview: false, teamNames }),
    });
    const json = await res.json();
    if (json.error) setMsg("Erro: " + json.error);
    else { setMsg("✅ Times distribuídos com sucesso!"); setPreview(json.teamStats); }
    setSaving(false);
  }

  return (
    <div>
      <p className="mb-6 text-sm text-white/50">
        A distribuição usa o método <strong className="text-white">serpentina por posição</strong> — atletas são ordenados por nota em cada posição e distribuídos alternadamente entre os times para máximo equilíbrio.
      </p>

      {/* Nomes dos times */}
      <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="mb-4 text-sm font-bold text-white">Nomes dos times <span className="font-normal text-white/40">(personalize com o nome dos patrocinadores)</span></p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {teamNames.map((name, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-white/40 w-12">Time {i+1}</span>
              <input
                value={name}
                onChange={(e) => {
                  const updated = [...teamNames];
                  updated[i] = e.target.value;
                  setTeamNames(updated);
                }}
                className="flex-1 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none placeholder:text-white/30"
                placeholder={`Time ${i+1}`}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => setTeamNames([...DEFAULT_NAMES])}
          className="mt-3 text-xs text-white/30 hover:text-white/60"
        >
          Resetar nomes
        </button>
      </div>

      {/* Aviso */}
      <div className="mb-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.05] p-4 text-sm text-yellow-300">
        ⚠️ Todos os inscritos serão distribuídos. Inscritos sem nota receberão nota 3 (média) por padrão.
      </div>

      {/* Botões */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={handlePreview}
          disabled={loading}
          className="rounded-2xl border border-[#1a8ad8] bg-[#1a8ad8]/10 px-6 py-3 text-sm font-semibold text-[#1a8ad8] disabled:opacity-50"
        >
          {loading ? "Calculando..." : "🔍 Ver prévia da distribuição"}
        </button>
        {preview && (
          <button
            onClick={handleConfirm}
            disabled={saving}
            className="rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {saving ? "Salvando..." : "✅ Confirmar e salvar times"}
          </button>
        )}
      </div>

      {msg && <p className={`mb-6 text-sm font-semibold ${msg.includes("✅") ? "text-green-400" : "text-red-400"}`}>{msg}</p>}

      {/* Preview dos times */}
      {preview && (
        <div>
          <p className="mb-4 text-sm font-bold text-white">Prévia da distribuição:</p>

          {/* Resumo comparativo */}
          <div className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-white/50">Time</th>
                  <th className="px-4 py-3 text-center text-xs text-white/50">Atletas</th>
                  <th className="px-4 py-3 text-center text-xs text-white/50">Nota média</th>
                  <th className="px-4 py-3 text-center text-xs text-yellow-400">GOL</th>
                  <th className="px-4 py-3 text-center text-xs text-blue-400">DEF</th>
                  <th className="px-4 py-3 text-center text-xs text-sky-400">LAT</th>
                  <th className="px-4 py-3 text-center text-xs text-green-400">MEI</th>
                  <th className="px-4 py-3 text-center text-xs text-red-400">ATA</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(preview).map(([team, stats], i) => (
                  <tr key={team} className={`border-t border-white/5 ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}>
                    <td className="px-4 py-3 font-bold">{team}</td>
                    <td className="px-4 py-3 text-center">{stats.count}</td>
                    <td className="px-4 py-3 text-center font-bold text-orange-400">{stats.avgRating}</td>
                    <td className="px-4 py-3 text-center text-yellow-400">{stats.posBreakdown?.Goleiro?.length || 0}</td>
                    <td className="px-4 py-3 text-center text-blue-400">{stats.posBreakdown?.Defesa?.length || 0}</td>
                    <td className="px-4 py-3 text-center text-sky-400">{stats.posBreakdown?.Lateral?.length || 0}</td>
                    <td className="px-4 py-3 text-center text-green-400">{stats.posBreakdown?.Meio?.length || 0}</td>
                    <td className="px-4 py-3 text-center text-red-400">{stats.posBreakdown?.Ataque?.length || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards detalhados por time */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(preview).map(([team, stats]) => (
              <div key={team} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-bold">{team}</span>
                  <span className="rounded-lg bg-orange-500/20 px-2 py-1 text-xs font-bold text-orange-400">
                    média {stats.avgRating} ⭐
                  </span>
                </div>
                {POSITION_ORDER.map((pos) => {
                  const players = stats.posBreakdown?.[pos] || [];
                  if (!players.length) return null;
                  return (
                    <div key={pos} className="mb-2">
                      <span className={`text-xs font-bold ${POS_COLOR[pos]}`}>{pos} ({players.length})</span>
                      <div className="mt-1 grid gap-1">
                        {players.map((p) => (
                          <div key={p.id} className="flex items-center justify-between rounded-lg bg-black/20 px-3 py-1.5">
                            <span className="text-xs text-white/80">{p.full_name}</span>
                            <span className="text-xs text-orange-400 font-semibold">{p.rating ? `${p.rating}★` : "–"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
