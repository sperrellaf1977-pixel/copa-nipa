export default function Home() {
  const navigation = [
    "Home",
    "O Torneio",
    "Tabela",
    "Resultados",
    "Estatísticas",
    "Galeria",
    "Inscrição",
    "Patrocinadores",
  ];

  const sponsors = [
    { name: "Cota Master", desc: "Naming rights, destaque principal e ativações premium ao longo das 7 rodadas" },
    { name: "Patrocinador Ouro", desc: "Logo em destaque no site, uniformes, backdrop e conteúdos digitais" },
    { name: "Patrocinador Prata", desc: "Presença digital, exposição no evento e ações de relacionamento" },
  ];

  const matches = [
    { stage: "Rodada 1", home: "Time 1", away: "Time 2", date: "01 de agosto de 2026", status: "Em breve" },
    { stage: "Rodada 1", home: "Time 3", away: "Time 4", date: "01 de agosto de 2026", status: "Em breve" },
    { stage: "Rodada 1", home: "Time 5", away: "Time 6", date: "01 de agosto de 2026", status: "Em breve" },
    { stage: "Rodada 2", home: "Time 1", away: "Time 3", date: "08 de agosto de 2026", status: "Em breve" },
    { stage: "Rodada 2", home: "Time 2", away: "Time 5", date: "08 de agosto de 2026", status: "Em breve" },
    { stage: "Rodada 2", home: "Time 4", away: "Time 6", date: "08 de agosto de 2026", status: "Em breve" },
    { stage: "Rodada 3", home: "Time 1", away: "Time 4", date: "15 de agosto de 2026", status: "Em breve" },
    { stage: "Rodada 3", home: "Time 2", away: "Time 6", date: "15 de agosto de 2026", status: "Em breve" },
    { stage: "Rodada 3", home: "Time 3", away: "Time 5", date: "15 de agosto de 2026", status: "Em breve" },
    { stage: "Rodada 4", home: "Time 1", away: "Time 5", date: "22 de agosto de 2026", status: "Em breve" },
    { stage: "Rodada 4", home: "Time 2", away: "Time 3", date: "22 de agosto de 2026", status: "Em breve" },
    { stage: "Rodada 4", home: "Time 4", away: "Time 6", date: "22 de agosto de 2026", status: "Em breve" },
    { stage: "Rodada 5", home: "Time 1", away: "Time 6", date: "29 de agosto de 2026", status: "Em breve" },
    { stage: "Rodada 5", home: "Time 2", away: "Time 4", date: "29 de agosto de 2026", status: "Em breve" },
    { stage: "Rodada 5", home: "Time 3", away: "Time 5", date: "29 de agosto de 2026", status: "Em breve" },
    { stage: "Semifinais", home: "1º colocado", away: "4º colocado", date: "05 de setembro de 2026", status: "Classificação" },
    { stage: "Semifinais", home: "2º colocado", away: "3º colocado", date: "05 de setembro de 2026", status: "Classificação" },
    { stage: "Final", home: "Vencedor SF1", away: "Vencedor SF2", date: "12 de setembro de 2026", status: "Grande Final" },
  ];

  const standings = [
    { team: "Time 1", pts: 0, pj: 0, vit: 0, sg: 0 },
    { team: "Time 2", pts: 0, pj: 0, vit: 0, sg: 0 },
    { team: "Time 3", pts: 0, pj: 0, vit: 0, sg: 0 },
    { team: "Time 4", pts: 0, pj: 0, vit: 0, sg: 0 },
    { team: "Time 5", pts: 0, pj: 0, vit: 0, sg: 0 },
    { team: "Time 6", pts: 0, pj: 0, vit: 0, sg: 0 },
  ];

  const stats = [
    { title: "Craque de cada jogo", value: "Eleito após cada partida" },
    { title: "Craque da rodada", value: "Destaque semanal" },
    { title: "Artilheiro", value: "Ranking de gols" },
    { title: "Melhor goleiro", value: "Defesas e regularidade" },
    { title: "Craque do torneio", value: "Principal premiação" },
  ];

  const gallery = ["Rodada 1", "Rodada 2", "Rodada 3", "Rodada 4", "Rodada 5", "Finais"];

  return (
    <div className="min-h-screen bg-[#06070a] text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_28%),radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,#0a0b0f_0%,#06070a_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">Copa Nipa</div>
              <div className="mt-2 text-2xl font-black tracking-tight">Nova Ipanema</div>
            </div>
            <nav className="flex flex-wrap gap-3 text-sm text-white/65">
              {navigation.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/[^a-záàâãéèêíïóôõöúç]+/g, "-")}`}
                  className="rounded-full border border-white/10 px-4 py-2 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-8 lg:px-10 lg:pb-24 lg:pt-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-5 inline-flex rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-sm text-[#f5deb3] backdrop-blur">
                01 de agosto a 12 de setembro de 2026 • 7 sábados • 6 times • 72 atletas
              </div>
              <h1 className="max-w-4xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                Um torneio do condomínio com estética de grande evento.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                A Copa Nipa nasce com proposta premium, linguagem moderna e experiência contínua ao longo de sete sábados. Um campeonato com identidade própria, conteúdo recorrente, visibilidade para patrocinadores e acompanhamento completo de tabela, resultados e destaques individuais.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#inscrição" className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]">
                  Fazer inscrição
                </a>
                <a href="#patrocinadores" className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Ver cotas de patrocínio
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur">
                <div className="text-xs uppercase tracking-[0.25em] text-white/45">Formato</div>
                <div className="mt-3 text-2xl font-bold">Grupo único</div>
                <p className="mt-3 text-sm leading-7 text-white/65">Todos contra todos. Os 4 melhores avançam para as semifinais e os vencedores disputam a final em 12 de setembro.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur">
                <div className="text-xs uppercase tracking-[0.25em] text-white/45">Inscrição</div>
                <div className="mt-3 text-2xl font-bold">R$ 120</div>
                <p className="mt-3 text-sm leading-7 text-white/65">Inscrição individual com direito a uniforme completo: camisa e calção.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur">
                <div className="text-xs uppercase tracking-[0.25em] text-white/45">Atualizações</div>
                <div className="mt-3 text-2xl font-bold">Resultados + tabela</div>
                <p className="mt-3 text-sm leading-7 text-white/65">Estrutura pronta para receber placares, recalcular classificação e destacar artilheiros e craques.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur">
                <div className="text-xs uppercase tracking-[0.25em] text-white/45">Conteúdo</div>
                <div className="mt-3 text-2xl font-bold">Galeria por rodada</div>
                <p className="mt-3 text-sm leading-7 text-white/65">Página dedicada para subir fotos, melhores momentos e imagens dos destaques de cada sábado.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10" id="o-torneio">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af37]">Posicionamento</p>
            <h2 className="mt-4 text-2xl font-bold">Premium, moderno e relevante</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">Mais do que um campeonato interno, a Copa Nipa foi pensada como uma propriedade esportiva do condomínio, com identidade forte, experiência visual refinada e potencial de crescer ano após ano.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af37]">Calendário</p>
            <h2 className="mt-4 text-2xl font-bold">7 sábados de competição</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">O campeonato começa em 01 de agosto de 2026, passa por cinco rodadas de fase classificatória, semifinal em 05 de setembro e final em 12 de setembro.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af37]">Diferenciais</p>
            <h2 className="mt-4 text-2xl font-bold">Conteúdo, estatísticas e marca</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">O projeto prevê cobertura visual por rodada, premiações individuais e uma plataforma preparada para atualização contínua de resultados, classificação e destaques.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4 lg:px-10" id="tabela">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/45">Tabela</p>
            <h2 className="mt-2 text-3xl font-bold">Calendário oficial da Copa Nipa</h2>
          </div>
          <p className="text-sm text-white/50">Fase classificatória + semifinal + final</p>
        </div>
        <div className="grid gap-3">
          {matches.map((match, index) => (
            <div key={index} className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[140px,1fr,180px,110px] md:items-center">
              <div className="text-sm font-semibold text-[#d4af37]">{match.stage}</div>
              <div className="text-base font-medium">{match.home} <span className="text-white/35">vs</span> {match.away}</div>
              <div className="text-sm text-white/60">{match.date}</div>
              <div className="rounded-full border border-white/10 px-3 py-2 text-center text-xs text-white/65">{match.status}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10" id="resultados">
        <div className="mb-8 grid gap-4 md:grid-cols-5">
          {stats.map((award) => (
            <div key={award.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
              <div className="text-sm font-semibold text-white">{award.title}</div>
              <div className="mt-2 text-sm text-white/55">{award.value}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-white/45">Classificação</p>
            <h2 className="mt-2 text-2xl font-bold">Tabela geral automática</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-white/55">
                  <tr>
                    <th className="px-4 py-3 font-medium">Time</th>
                    <th className="px-4 py-3 font-medium">PTS</th>
                    <th className="px-4 py-3 font-medium">PJ</th>
                    <th className="px-4 py-3 font-medium">VIT</th>
                    <th className="px-4 py-3 font-medium">SG</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((row) => (
                    <tr key={row.team} className="border-t border-white/10">
                      <td className="px-4 py-3">{row.team}</td>
                      <td className="px-4 py-3">{row.pts}</td>
                      <td className="px-4 py-3">{row.pj}</td>
                      <td className="px-4 py-3">{row.vit}</td>
                      <td className="px-4 py-3">{row.sg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/60">Quando os resultados forem lançados, esta tabela pode ser recalculada automaticamente com classificação em tempo real.</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-white/45">Painel do torneio</p>
            <h2 className="mt-2 text-2xl font-bold">Resultados, líderes e destaques</h2>
            <div className="mt-6 grid gap-4">
              {[
                "Resultados de cada rodada",
                "Artilharia atualizada automaticamente",
                "Melhor goleiro com ranking de desempenho",
                "Craque de cada jogo e craque da rodada",
                "Definição dos semifinalistas e finalistas",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10" id="estatísticas">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/45">Estatísticas</p>
          <h2 className="mt-2 text-3xl font-bold">Premiações e narrativa do campeonato</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            "Craque de cada jogo",
            "Craque da rodada",
            "Artilheiro",
            "Melhor goleiro",
            "Craque do torneio",
          ].map((item) => (
            <div key={item} className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
              <div className="text-lg font-semibold">{item}</div>
              <div className="mt-2 text-sm text-white/60">Espaço para acompanhamento e atualização durante o torneio.</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10" id="galeria">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/45">Galeria</p>
          <h2 className="mt-2 text-3xl font-bold">Fotos e melhores momentos das rodadas</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">Página preparada para receber fotos de cada sábado, destaques dos craques da rodada, bastidores e registros dos patrocinadores.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((album) => (
            <div key={album} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
              <div className="flex h-56 items-center justify-center bg-white/5 text-sm text-white/35">Espaço para fotos</div>
              <div className="p-5">
                <div className="text-base font-semibold">{album}</div>
                <div className="mt-2 text-sm text-white/60">Atualize imagens, destaques e conteúdos após cada sábado.</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10" id="inscrição">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/45">Inscrição individual</p>
              <h2 className="mt-2 text-3xl font-bold">Inscreva-se para jogar a Copa Nipa</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">As inscrições são individuais, no valor de R$ 120, com direito a uniforme completo: camisa e calção. O atleta informa sua posição preferida para ajudar na montagem equilibrada das equipes.</p>
              <div className="mt-6 inline-flex rounded-2xl border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-3 text-sm text-[#f5deb3]">
                Valor da inscrição: R$ 120 • inclui camisa + calção
              </div>
            </div>
            <form className="grid gap-4">
              <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/35" placeholder="Nome completo" />
              <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/35" placeholder="Telefone / WhatsApp" />
              <input className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/35" placeholder="Idade" />
              <select className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70 outline-none">
                <option>Posição preferida</option>
                <option>Ataque</option>
                <option>Meio</option>
                <option>Defesa</option>
                <option>Lateral</option>
                <option>Goleiro</option>
              </select>
              <textarea className="min-h-[120px] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/35" placeholder="Observações" />
              <button type="button" className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.01]">
                Enviar inscrição
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10" id="patrocinadores">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-white/45">Patrocínio</p>
          <h2 className="mt-2 text-3xl font-bold">Cotas e oportunidades de marca</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/65">A Copa Nipa pode ser apresentada como uma propriedade premium do condomínio, com recorrência de público, presença digital e exposição qualificada ao longo de sete semanas.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {sponsors.map((item) => (
            <div key={item.name} className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-xl">
              <div className="text-lg font-bold">{item.name}</div>
              <p className="mt-3 text-sm leading-7 text-white/70">{item.desc}</p>
              <button className="mt-6 rounded-2xl border border-white/15 px-4 py-2 text-sm font-semibold transition hover:bg-white/10">
                Solicitar proposta
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
