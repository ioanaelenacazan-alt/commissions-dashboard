export default function MetricBox({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <strong className="mt-2 block text-lg font-semibold text-slate-900">
        {value}
      </strong>
    </div>
  );
}
// Afișează metrici rapide (ex: totaluri).