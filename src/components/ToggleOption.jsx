export default function ToggleOption({ checked, onChange, children }) {
  return (
    <label className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-emerald-600"
      />
      {children}
    </label>
  );
}
// Permite activarea/dezactivarea unor opțiuni.checkbox styled