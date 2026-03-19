import { Moon, Sun } from "lucide-react";
function Header({ darkMode, setDarkMode }) {
  return (
    <header className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-8 text-white shadow-xl md:p-10">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute -left-10 bottom-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative flex items-center justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-5xl">
            App Comisioane
          </h1>

          <p className="mt-2 text-sm text-slate-100 md:text-base">
            Calculează rapid pentru consultanți și team leaderi.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label={
            darkMode ? "Activează modul light" : "Activează modul dark"
          }
          aria-pressed={darkMode}
          className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          {darkMode ? (
            <>
              <Sun size={18} aria-hidden="true" />
              Light
            </>
          ) : (
            <>
              <Moon size={18} aria-hidden="true" />
              Dark
            </>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
