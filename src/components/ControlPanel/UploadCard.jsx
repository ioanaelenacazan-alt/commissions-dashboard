import { useRef } from "react";

export default function UploadCard({ fileName, error, onFileUpload }) {
  const fileInputRef = useRef(null);

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/20">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-200">
          Încarcă fișier Excel
        </h2>

        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={onFileUpload}
          className="hidden"
        />

        <button
          type="button"
          onClick={handleOpenFilePicker}
          className="w-fit rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700"
        >
          Alege fișier
        </button>

        {/* feedback curat */}
        {fileName ? (
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            ✔ {fileName}
          </p>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Niciun fișier selectat
          </p>
        )}

        {error && (
          <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
        )}
      </div>
    </div>
  );
}