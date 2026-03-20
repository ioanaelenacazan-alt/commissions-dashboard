import { CalendarDays, Search } from "lucide-react";

function TopBar({
  searchTerm,
  setSearchTerm,
  selectedMonth,
  setSelectedMonth,
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col md:flex-row gap-4">
        <div className="flex items-center border rounded-lg px-3 py-2 flex-1">
          <Search className="text-gray-400 mr-2" size={18} />
          <input
            type="text"
            placeholder="Caută consultant sau team leader..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none w-full"
          />
        </div>

        <div className="flex items-center border rounded-lg px-3 py-2 min-w-[220px]">
          <CalendarDays className="text-gray-400 mr-2" size={18} />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="outline-none bg-transparent w-full"
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

// permite căutarea și filtrarea pe lună