export default function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="flex min-w-[220px] flex-col gap-2">
      <label className="text-sm font-medium text-slate-600">{label}</label>

      <select
        value={value}
        onChange={onChange}
        className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-emerald-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}