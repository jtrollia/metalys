export const SORTS = [
  { key: "army", label: "Nom (A→Z)", dir: "asc" },
  { key: "winRate", label: "Winrate", dir: "desc" },
  { key: "reps", label: "Joueurs", dir: "desc" },
  { key: "top1", label: "Top 1", dir: "desc" },
];

export function compare(a, b, key, dir) {
  const av = a[key];
  const bv = b[key];
  const mult = dir === "asc" ? 1 : -1;
  if (typeof av === "string") return av.localeCompare(bv) * mult;
  return (av - bv) * mult;
}

export function extractArmiesArray(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.armies)) return data.armies;
  if (Array.isArray(data?.rows)) return data.rows;
  return [];
}

export function calculateGlobalStats(rows) {
  const arr = Array.isArray(rows) ? rows : [];
  const stats = {
    good: { reps: 0, win: 0, draw: 0, loss: 0 },
    evil: { reps: 0, win: 0, draw: 0, loss: 0 },
  };

  for (const r of arr) {
    const reps = Number(r.reps) || 0;
    const win = Number(r.win) || 0;
    const draw = Number(r.draw) || 0;
    const loss = Number(r.loss) || 0;

    if (r.faction === "Good") {
      stats.good.reps += reps;
      stats.good.win += win;
      stats.good.draw += draw;
      stats.good.loss += loss;
    } else if (r.faction === "Evil") {
      stats.evil.reps += reps;
      stats.evil.win += win;
      stats.evil.draw += draw;
      stats.evil.loss += loss;
    }
  }

  const totalReps = stats.good.reps + stats.evil.reps;
  const goodGames = stats.good.win + stats.good.draw + stats.good.loss;
  const evilGames = stats.evil.win + stats.evil.draw + stats.evil.loss;

  return {
    goodReps: stats.good.reps,
    evilReps: stats.evil.reps,
    totalReps,
    goodShare: totalReps ? (stats.good.reps / totalReps) * 100 : 0,
    evilShare: totalReps ? (stats.evil.reps / totalReps) * 100 : 0,
    goodWR: goodGames ? (stats.good.win / goodGames) * 100 : 0,
    evilWR: evilGames ? (stats.evil.win / evilGames) * 100 : 0,
    uniqueArmies: arr.length,
    totalPossibleArmies: 106,
    diversityPct: (arr.length / 106) * 100,
  };
}

export function filterAndSort(rows, query, faction, sortId, sorts) {
  let filtered = Array.isArray(rows) ? rows : [];

  const q = query.trim().toLowerCase();
  if (q) {
    filtered = filtered.filter((r) => r.army.toLowerCase().includes(q));
  }

  if (faction !== "All") {
    filtered = filtered.filter((r) => r.faction === faction);
  }

  const sort = sorts[sortId];
  if (sort) {
    filtered = [...filtered].sort((a, b) => compare(a, b, sort.key, sort.dir));
  }

  return filtered;
}
