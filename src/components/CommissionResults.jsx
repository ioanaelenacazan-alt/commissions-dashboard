import PersonCard from "./PersonCard";
import EmptyState from "./EmptyState";

export default function CommissionResults({ selectedPeople }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        Rezultate comisioane
      </h2>

      <div className="mt-4">
        {selectedPeople.length === 0 ? (
          <EmptyState message="Selectează un consultant sau un team leader pentru a vedea comisionul." />
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {selectedPeople.map((person, index) => (
              <PersonCard key={person.id ?? index} person={person} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}