import { SummaryCard, SummaryRow } from "./SummaryCard.jsx";

const winrateClass = (wr) => (wr > 50 ? "pos" : wr < 50 ? "neg" : "even");

export function StatsSummary({ stats }) {
  return (
    <div class="summary">
      <h2 class="summaryTitle">Stats globales (2025)</h2>
      <div class="summaryGrid">
        <SummaryCard label="Répartition des joueurs">
          <div class="summaryRows">
            <SummaryRow
              tag={<span class="tag good">Bien</span>}
              value={`${stats.goodReps} joueurs`}
              muted={`${stats.goodShare.toFixed(0)}%`}
            />
            <SummaryRow
              tag={<span class="tag evil">Mal</span>}
              value={`${stats.evilReps} joueurs`}
              muted={`${stats.evilShare.toFixed(0)}%`}
            />
          </div>
        </SummaryCard>

        <SummaryCard label="Winrate par faction">
          <div class="summaryRows">
            <SummaryRow
              tag={<span class="tag good">Bien</span>}
              value={
                <span class={`summaryValue winrate ${winrateClass(stats.goodWR)}`}>
                  {stats.goodWR.toFixed(1)}%
                </span>
              }
            />
            <SummaryRow
              tag={<span class="tag evil">Mal</span>}
              value={
                <span class={`summaryValue winrate ${winrateClass(stats.evilWR)}`}>
                  {stats.evilWR.toFixed(1)}%
                </span>
              }
            />
          </div>
        </SummaryCard>

        <SummaryCard label="Diversité">
          <div class="summaryBig">{stats.uniqueArmies}</div>
          <div class="summaryMuted">
            armées jouées sur {stats.totalPossibleArmies} • {stats.diversityPct.toFixed(0)}%
          </div>
        </SummaryCard>
      </div>
    </div>
  );
}
