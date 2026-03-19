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
    "w-full min-w-0 rounded-2xl border border-slate-300 bg-white px-5 py-4 text-base font-medium text-slate-900 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100";

  return (
    <div className="grid w-full min-w-0 gap-4 md:grid-cols-3">
      <select
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

      <select
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

      <select
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
  );
}