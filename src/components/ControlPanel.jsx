function ControlPanel({
  fileName,
  error,
  onFileUpload,
  selectedMonth,
  setSelectedMonth,
  selectedConsultant,
  setSelectedConsultant,
  selectedTeamLeader,
  setSelectedTeamLeader,
  consultantOptions = [],
  teamLeaderOptions = [],
  months = [],
  showTM6,
  setShowTM6,
  showAccessories,
  setShowAccessories,
  includeDemoDelivery,
  setIncludeDemoDelivery,
  onExport,
}) {
  const handleResetFilters = () => {
    setSelectedMonth("ALL");
    setSelectedConsultant("ALL");
    setSelectedTeamLeader("ALL");
    setShowTM6(true);
    setShowAccessories(true);
    setIncludeDemoDelivery(true);
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Panou de control
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Încarcă fișierul, aplică filtrele și exportă rapid raportul.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          <div className="xl:col-span-2">
            <label
              htmlFor="excel-upload"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Fișier Excel
            </label>

            <label
              htmlFor="excel-upload"
              className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 px-4 py-4 transition hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/40"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                  {fileName ? "Fișier încărcat" : "Alege fișierul Excel"}
                </p>
                <p className="truncate text-sm text-emerald-700 dark:text-emerald-200">
                  {fileName || "Niciun fișier selectat"}
                </p>
              </div>

              <span className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                Browse
              </span>
            </label>

            <input
              id="excel-upload"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={onFileUpload}
              className="sr-only"
            />

            {error ? (
              <p
                role="alert"
                className="mt-2 text-sm font-medium text-red-600 dark:text-red-400"
              >
                {error}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="month-select"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Luna
            </label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-700"
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="consultant-select"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Consultant
            </label>
            <select
              id="consultant-select"
              value={selectedConsultant}
              onChange={(e) => setSelectedConsultant(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-700"
            >
              {consultantOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="teamleader-select"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Team Leader
            </label>
            <select
              id="teamleader-select"
              value={selectedTeamLeader}
              onChange={(e) => setSelectedTeamLeader(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-700"
            >
              {teamLeaderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div
            className="flex flex-wrap gap-3"
            aria-label="Filtre de afișare comisioane"
          >
            <button
              type="button"
              aria-pressed={showTM6}
              onClick={() => setShowTM6((prev) => !prev)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                showTM6
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              TM6
            </button>

            <button
              type="button"
              aria-pressed={showAccessories}
              onClick={() => setShowAccessories((prev) => !prev)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                showAccessories
                  ? "bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300"
                  : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              Accesorii
            </button>

            <button
              type="button"
              aria-pressed={includeDemoDelivery}
              onClick={() => setIncludeDemoDelivery((prev) => !prev)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                includeDemoDelivery
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                  : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              Demo / Delivery
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleResetFilters}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Resetează filtrele
            </button>

            <button
              type="button"
              onClick={onExport}
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-slate-100 dark:text-slate-900"
            >
              Descarcă PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ControlPanel;
