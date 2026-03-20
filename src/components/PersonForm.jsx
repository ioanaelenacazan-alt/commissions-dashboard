import { useEffect, useState } from "react";

export default function PersonForm({
  formData,
  editingId,
  onChange,
  onSave,
  onCancel,
  error,
}) {
  const isEditing = editingId !== null && editingId !== undefined;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setIsOpen(true);
    }
  }, [isEditing]);

  const handleToggle = () => {
    if (isEditing) return;
    setIsOpen((prev) => !prev);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsOpen(false);
  };

  const handleSave = () => {
    const savedPerson = onSave?.();

    if (savedPerson) {
      setIsOpen(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            Persoană manuală
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {isEditing ? "Editează" : "Adăugare persoanǎ"}
          </h2>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Adaugă sau modifică rapid o persoană.
          </p>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className="rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
        >
          {isEditing
            ? "Editezi persoana"
            : isOpen
              ? "Închide formularul"
              : "Adaugă persoană"}
        </button>
      </div>

      {isOpen && (
        <div className="mt-6 border-t border-slate-100 pt-6 dark:border-slate-800">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Nume
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="Ex: Cazan Ioana"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-emerald-900/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Rol
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={onChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-emerald-900/40"
              >
                <option value="Consultant">Consultant</option>
                <option value="Team Leader">Team Leader</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                TM6 vândute
              </label>
              <input
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                name="tm6Count"
                value={formData.tm6Count}
                onChange={onChange}
                placeholder="0"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-emerald-900/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Accesorii (lei)
              </label>
              <input
                type="text"
                inputMode="decimal"
                name="accessories"
                value={formData.accessories}
                onChange={onChange}
                placeholder="0,00"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-emerald-900/40"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Demo / Delivery
              </label>
              <input
                type="number"
                min="50"
                step="10"
                inputMode="numeric"
                name="demoDelivery"
                value={formData.demoDelivery}
                onChange={onChange}
                placeholder="0"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:ring-emerald-900/40"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
            >
              {isEditing ? "Salvează modificările" : "Adaugă persoană"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                Anulează
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
// Permite adăugarea sau editarea manuală a persoanelor și valorilor.
