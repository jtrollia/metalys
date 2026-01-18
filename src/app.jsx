import { useEffect, useMemo, useState } from "preact/hooks";
import { StatsSummary } from "./components/StatsSummary.jsx";
import { Controls } from "./components/Controls.jsx";
import { ArmyCard } from "./components/ArmyCard.jsx";
import { SORTS, extractArmiesArray, calculateGlobalStats, filterAndSort } from "./utils.js";

export default function App() {
  const defaultSortId = SORTS.findIndex((s) => s.key === "army");

  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [faction, setFaction] = useState("All");
  const [sortId, setSortId] = useState(defaultSortId);

  useEffect(() => {
    fetch("./2025.json")
      .then(async (r) => {
        const data = await r.json();
        const armies = extractArmiesArray(data);
        console.log("Rows loaded:", armies.length);
        setRows(armies);
      })
      .catch((e) => {
        console.error("JSON load failed:", e);
        setRows([]);
      });
  }, []);

  const globalStats = useMemo(() => calculateGlobalStats(rows), [rows]);

  const filtered = useMemo(
    () => filterAndSort(rows, q, faction, sortId, SORTS),
    [rows, q, faction, sortId]
  );

  return (
    <section class="panel">
      <StatsSummary stats={globalStats} />
      <Controls
        q={q}
        setQ={setQ}
        faction={faction}
        setFaction={setFaction}
        sortId={sortId}
        setSortId={setSortId}
      />
      <div class="meta">
        <strong>{filtered.length}</strong> armée(s) affichée(s)
      </div>
      <div class="list">
        {filtered.map((army) => (
          <ArmyCard key={army.army} army={army} />
        ))}
      </div>
    </section>
  );
}
