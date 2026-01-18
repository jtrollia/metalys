const factionLabelFR = (f) => (f === "Good" ? "Bien" : f === "Evil" ? "Mal" : "—");
const winrateClass = (wr) => (wr > 50 ? "pos" : wr < 50 ? "neg" : "even");

export function ArmyCard({ army }) {
  const factionClass = army.faction === "Good" ? "good" : "evil";

  return (
    <article class="card">
      <div class="cardHeader">
        <h2 class="army">{army.army}</h2>
        <span class={`pill faction ${factionClass}`}>{factionLabelFR(army.faction)}</span>
      </div>

      <div class="grid">
        <div>
          <span class="k">Joueurs</span>
          <span class="v">{army.reps}</span>
        </div>
        <div>
          <span class="k">Victoires</span>
          <span class="v">{army.win}</span>
        </div>
        <div>
          <span class="k">Égalités</span>
          <span class="v">{army.draw}</span>
        </div>
        <div>
          <span class="k">Défaites</span>
          <span class="v">{army.loss}</span>
        </div>
        <div>
          <span class="k">Winrate</span>
          <span class={`v winrate ${winrateClass(army.winRate)}`}>
            {army.winRate.toFixed(1)}%
          </span>
        </div>
        <div>
          <span class="k">Top 1</span>
          <span class="v">{army.top1}</span>
        </div>
        <div>
          <span class="k">Top 2</span>
          <span class="v">{army.top2}</span>
        </div>
        <div>
          <span class="k">Top 3</span>
          <span class="v">{army.top3}</span>
        </div>
      </div>
    </article>
  );
}
