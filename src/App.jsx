import { useMemo, useState } from "react";
import Header from "./layout/Header";
import TopBar from "./layout/TopBar";
import SideBar from "./layout/SideBar";
import ExcelUploader from "./components/ExcelUploader";
import PersonCard from "./components/PersonCard";

function getMonthFromDate(rawValue) {
  if (!rawValue) return "";

  const value = String(rawValue).trim();

  if (value.includes("/")) {
    const parts = value.split("/");
    if (parts.length >= 2) {
      return parts[1].padStart(2, "0");
    }
  }

  if (value.includes(".")) {
    const parts = value.split(".");
    if (parts.length >= 2) {
      return parts[1].padStart(2, "0");
    }
  }

  if (value.includes("-")) {
    const parts = value.split("-");
    if (parts.length >= 3) {
      return parts[1].padStart(2, "0");
    }
  }

  return "";
}

function App() {
  const [excelData, setExcelData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const [showConsultants, setShowConsultants] = useState(true);
  const [showTeamLeaders, setShowTeamLeaders] = useState(true);

  const [showTM6, setShowTM6] = useState(true);
  const [showAccessories, setShowAccessories] = useState(true);

  const [includeDemoDelivery, setIncludeDemoDelivery] = useState(false);

  const groupedPeople = useMemo(() => {
    const map = {};

    excelData.forEach((row) => {
      const consultantName = row.CONSULTANT?.toString().trim();
      const teamLeaderName = row.TL?.toString().trim();
      const item = row.ITEM?.toString().trim().toUpperCase() || "";

      const accCommission =
        parseFloat(
          String(row.ACC_COMISION || "0")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim()
        ) || 0;

      const month = getMonthFromDate(row.DATA);

      const passesMonthFilter = selectedMonth ? month === selectedMonth : true;
      if (!passesMonthFilter) return;

      const isTM6 = item.includes("TM6");

      if (consultantName) {
        if (!map[consultantName]) {
          map[consultantName] = {
            name: consultantName,
            role: "Consultant",
            tm6: 0,
            accessories: 0,
          };
        }

        if (isTM6) {
          map[consultantName].tm6 += 1;
        }

        map[consultantName].accessories += accCommission;
      }

      if (teamLeaderName) {
        if (!map[teamLeaderName]) {
          map[teamLeaderName] = {
            name: teamLeaderName,
            role: "Team Leader",
            tm6: 0,
            accessories: 0,
          };
        }

        if (isTM6) {
          map[teamLeaderName].tm6 += 1;
        }

        map[teamLeaderName].accessories += accCommission;
      }
    });

    return Object.values(map).map((person) => {
      const tm6Commission =
        person.tm6 >= 3
          ? person.tm6 * 120
          : person.tm6 >= 1
          ? person.tm6 * 100
          : 0;

      const demoDeliveryValue = includeDemoDelivery && person.tm6 > 0 ? 30 : 0;

      return {
        ...person,
        total: tm6Commission + person.accessories + demoDeliveryValue,
      };
    });
  }, [excelData, selectedMonth, includeDemoDelivery]);

  const filteredPeople = groupedPeople.filter((person) => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const roleFilter =
      (person.role === "Consultant" && showConsultants) ||
      (person.role === "Team Leader" && showTeamLeaders);

    const searchFilter =
      !normalizedSearch || person.name.toLowerCase().includes(normalizedSearch);

    return roleFilter && searchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto px-6 pt-4">
        <ExcelUploader setExcelData={setExcelData} />
      </div>

      <TopBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6">
          <SideBar
            showConsultants={showConsultants}
            setShowConsultants={setShowConsultants}
            showTeamLeaders={showTeamLeaders}
            setShowTeamLeaders={setShowTeamLeaders}
            showTM6={showTM6}
            setShowTM6={setShowTM6}
            showAccessories={showAccessories}
            setShowAccessories={setShowAccessories}
            includeDemoDelivery={includeDemoDelivery}
            setIncludeDemoDelivery={setIncludeDemoDelivery}
          />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {excelData.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 col-span-full">
              <p className="text-gray-500 text-lg">Încarcă fișierul Excel.</p>
            </div>
          ) : filteredPeople.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 col-span-full">
              <p className="text-gray-500 text-lg">
                Nu există rezultate pentru filtrele selectate.
              </p>
            </div>
          ) : (
            filteredPeople.map((person, index) => (
              <PersonCard
                key={index}
                name={person.name}
                role={person.role}
                tm6={person.tm6}
                accessories={person.accessories}
                total={person.total}
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
