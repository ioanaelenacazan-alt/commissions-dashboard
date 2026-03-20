export default function ExcelUploader({ onFileSelect, fileName }) {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-medium text-slate-600">
        Fișier Excel
      </label>

      <label className="flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-emerald-500 hover:bg-emerald-50">
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={onFileSelect}
          className="hidden"
        />

        <div>
          <p className="text-sm font-medium text-slate-700">
            Click pentru upload
          </p>
          <p className="mt-1 text-xs text-slate-500">
            sau trage fișierul aici
          </p>
        </div>
      </label>

      {fileName ? (
        <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Fișier încărcat: <strong>{fileName}</strong>
        </div>
      ) : null}
    </div>
  );
}
// Gestionează procesul de citire și transformare a fișierului Excel.