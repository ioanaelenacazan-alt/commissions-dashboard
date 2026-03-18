function formatLei(value) {
  return `${(Number(value) || 0).toLocaleString("ro-RO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} LEI`;
}

function safeNumber(value) {
  return Number(value) || 0;
}

export default function PersonCard({ person, onEdit, onDelete }) {
  const isManual = person?.source === "manual";
  const isConsultant = person?.role === "Consultant";

  const tm6Count = safeNumber(person?.tm6Count);
  const tm6Commission = safeNumber(person?.tm6Commission);
  const accessories = safeNumber(person?.accessories);
  const demoDelivery = safeNumber(person?.demoDelivery);
  const totalCommission = safeNumber(person?.totalCommission);

  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-xl font-semibold text-slate-900 dark:text-slate-100">
              {person?.name || "-"}
            </h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                isConsultant
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                  : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
              }`}
            >
              {person?.role || "-"}
            </span>

            {isManual && (
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                Manual
              </span>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          TM6: {tm6Count}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Comision TM6
          </p>
          <p className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-100">
            {formatLei(tm6Commission)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Accesorii
          </p>
          <p className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-100">
            {formatLei(accessories)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Demo / Delivery
          </p>
          <p className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-100">
            {formatLei(demoDelivery)}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/30">
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            Total comision
          </p>
          <p className="mt-2 text-lg font-bold text-emerald-700 dark:text-emerald-300">
            {formatLei(totalCommission)}
          </p>
        </div>
      </div>

      {(onEdit || onDelete) && (
        <div className="mt-4 flex gap-2">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(person)}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Editează
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(person.id)}
              className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
            >
              Șterge
            </button>
          )}
        </div>
      )}
    </div>
  );
}