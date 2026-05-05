"use client";

const teamStyles = {
  "LRA":               { backgroundColor: "#f5c000", color: "#000000", border: "1px solid #e0b000" },
  "Coco Bambu":        { backgroundColor: "#3b1a0a", color: "#ffffff", border: "1px solid #5c2a10" },
  "Bittencourt Sports":{ backgroundColor: "#1a5c1a", color: "#ffffff", border: "1px solid #2d8a2d" },
  "Grupo Rão":         { backgroundColor: "#cc0000", color: "#ffffff", border: "1px solid #ff0000" },
  "Ogro Steaks":       { backgroundColor: "#ffffff", color: "#cc0000", border: "1px solid #cccccc" },
  "Mitre":             { backgroundColor: "#7ec8e3", color: "#000000", border: "1px solid #5ab5d4" },
};

const defaultStyle = { backgroundColor: "#1e293b", color: "#ffffff", border: "1px solid #334155" };

export default function MatchRow({ match, isFirst }) {
  const hs = teamStyles[match.home_team] || defaultStyle;
  const as_ = teamStyles[match.away_team] || defaultStyle;
  const done = match.status === "Finalizado";
  const score = match.home_score !== null && match.away_score !== null
    ? `${match.home_score} — ${match.away_score}` : "x";

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center",
      gap: "8px",
      padding: "10px 16px",
      borderTop: isFirst ? "none" : "1px solid rgba(255,255,255,0.05)",
    }}>
      <span style={{
        ...hs,
        borderRadius: "10px",
        padding: "8px 12px",
        fontSize: "14px",
        fontWeight: "800",
        textAlign: "center",
        display: "block",
      }}>
        {match.home_team}
      </span>
      <span style={{
        minWidth: "52px",
        textAlign: "center",
        fontSize: "16px",
        fontWeight: "900",
        color: done ? "#f97316" : "rgba(255,255,255,0.25)",
      }}>
        {score}
      </span>
      <span style={{
        ...as_,
        borderRadius: "10px",
        padding: "8px 12px",
        fontSize: "14px",
        fontWeight: "800",
        textAlign: "center",
        display: "block",
      }}>
        {match.away_team}
      </span>
    </div>
  );
}
