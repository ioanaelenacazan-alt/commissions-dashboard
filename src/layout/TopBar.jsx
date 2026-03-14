import { Search, CalendarDays } from "lucide-react";

function TopBar({
  searchTerm,
  setSearchTerm,
  selectedMonth,
  setSelectedMonth,
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        
        <div className="relative w-full md:max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Caută consultant / team leader"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="relative w-full md:w-56">
          <CalendarDays
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full appearance-none pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Toate lunile</option>
            <option value="01">Ianuarie</option>
            <option value="02">Februarie</option>
            <option value="03">Martie</option>
            <option value="04">Aprilie</option>
            <option value="05">Mai</option>
            <option value="06">Iunie</option>
            <option value="07">Iulie</option>
            <option value="08">August</option>
            <option value="09">Septembrie</option>
            <option value="10">Octombrie</option>
            <option value="11">Noiembrie</option>
            <option value="12">Decembrie</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TopBar;