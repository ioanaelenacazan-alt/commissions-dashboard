export default function ManualPeopleList({
  manualPeople,
  onEditPerson,
  onDeletePerson,
}) {
  if (manualPeople.length === 0) return null;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        Persoane adăugate manual
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {manualPeople.map((person) => (
          <div
            key={person.id}
            className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
          >
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              {person.name}
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {person.role}
            </p>

            <div className="mt-3 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <p>TM6: {person.tm6Count}</p>
              <p>Accesorii: {person.accessories}</p>
              <p>Demo Delivery: {person.demoDelivery}</p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => onEditPerson(person)}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Editează
              </button>

              <button
                type="button"
                onClick={() => onDeletePerson(person.id)}
                className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
              >
                Șterge
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
// Afișează persoanele introduse manual.