export function SummaryCard({ label, children }) {
  return (
    <article class="summaryCard">
      <div class="summaryLabel">{label}</div>
      {children}
    </article>
  );
}

export function SummaryRow({ tag, value, muted }) {
  return (
    <div class="summaryRow">
      {tag}
      <span class="summaryValue">{value}</span>
      {muted && <span class="summaryMuted">{muted}</span>}
    </div>
  );
}
