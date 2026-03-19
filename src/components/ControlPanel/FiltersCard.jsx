export default function FiltersCard({
  selectedMonth,
  setSelectedMonth,
  selectedConsultant,
  setSelectedConsultant,
  selectedTeamLeader,
  setSelectedTeamLeader,
  consultantOptions,
  teamLeaderOptions,
  months,
}) {
  const selectClassName =
    "w-full min-w-0 rounded-2xl border border-slate-300 bg-white px-5 py-4 text-base font-medium text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-400 dark:focus:ring-slate-700";

  const labelClassName =
    "mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200";

  return (
    <div className="grid w-full min-w-0 gap-4 md:grid-cols-3">
      <div className="flex flex-col">
        <label htmlFor="month-select" className={labelClassName}>
          Luna
        </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className={selectClassName}
        >
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="consultant-select" className={labelClassName}>
          Consultant
        </label>
        <select
          id="consultant-select"
          value={selectedConsultant}
          onChange={(e) => setSelectedConsultant(e.target.value)}
          className={selectClassName}
        >
          {consultantOptions.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="teamleader-select" className={labelClassName}>
          Team Leader
        </label>
        <select
          id="teamleader-select"
          value={selectedTeamLeader}
          onChange={(e) => setSelectedTeamLeader(e.target.value)}
          className={selectClassName}
        >
          {teamLeaderOptions.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}