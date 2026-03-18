import { Sun, Moon } from "lucide-react";

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-8 text-white shadow-xl md:p-10 dark:border-slate-700">
      
      {/* glow effects */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute -left-10 bottom-0 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative flex items-center justify-between">
        
        {/* TEXT */}
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            App Comisioane
          </h1>

          <p className="mt-2 text-sm text-slate-200 md:text-base">
            Calculează rapid comisioanele pentru consultanți și team leaderi.
          </p>
        </div>

        {/* DARK MODE BUTTON */}
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/20"
        >
          {darkMode ? (
            <>
              <Sun size={18} />
              Light
            </>
          ) : (
            <>
              <Moon size={18} />
              Dark
            </>
          )}
        </button>
      </div>
    </header>
  );
}