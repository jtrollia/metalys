import { SORTS } from "../utils.js";

export function Controls({ q, setQ, faction, setFaction, sortId, setSortId }) {
  return (
    <div class="controls">
      <label class="field">
        <span>Recherche</span>
        <input
          value={q}
          onInput={(e) => setQ(e.target.value)}
          placeholder="Ex: Mordor, Rangers, Dunland…"
          inputMode="search"
        />
      </label>

      <label class="field">
        <span>Faction</span>
        <select value={faction} onChange={(e) => setFaction(e.target.value)}>
          <option value="All">Toutes</option>
          <option value="Good">Bien</option>
          <option value="Evil">Mal</option>
        </select>
      </label>

      <label class="field">
        <span>Tri</span>
        <select value={String(sortId)} onChange={(e) => setSortId(Number(e.target.value))}>
          {SORTS.map((s, i) => (
            <option key={i} value={String(i)}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
