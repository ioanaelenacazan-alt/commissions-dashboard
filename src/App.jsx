import { useEffect, useMemo, useState } from "react";
import { buildPeople } from "./utils/commissions";
import { readExcelFile } from "./utils/readExcelFile";
import { exportCommissionPdf } from "./utils/exportCommissionPdf";
import { months } from "./constants/months";
import useManualPeople from "./hooks/useManualPeople";

import ControlPanel from "./components/ControlPanel";
import PersonForm from "./components/PersonForm";
import PersonCard from "./components/PersonCard";
import EmptyState from "./components/EmptyState";
import Header from "./layout/Header";

function dedupePeople(list) {
  const map = new Map();

  list.forEach((person) => {
    const key = `${person.name}-${person.role}`;
    const existing = map.get(key);

    if (!existing) {
      map.set(key, person);
      return;
    }

    if (person.source === "manual") {
      map.set(key, person);
    }
  });

  return Array.from(map.values());
}

function dedupeOptions(options) {
  const seen = new Set();

  return options.filter((option) => {
    if (seen.has(option.value)) return false;
    seen.add(option.value);
    return true;
  });
}

function calculateTm6Commission(tm6Count) {
  const count = Number(tm6Count) || 0;

  if (count <= 0) return 0;
  if (count >= 3) return count * 120;

  return count * 100;
}

function enrichManualPerson(person, options) {
  const tm6Count = Number(person.tm6Count) || 0;
  const accessories = Number(person.accessories) || 0;
  const demoDelivery = Number(person.demoDelivery) || 0;

  const tm6CommissionRaw = calculateTm6Commission(tm6Count);

  const tm6Commission = options.showTM6 ? tm6CommissionRaw : 0;
  const visibleAccessories = options.showAccessories ? accessories : 0;
  const visibleDemoDelivery = options.includeDemoDelivery ? demoDelivery : 0;

  return {
    ...person,
    tm6Count,
    accessories: visibleAccessories,
    demoDelivery: visibleDemoDelivery,
    tm6Commission,
    totalCommission: tm6Commission + visibleAccessories + visibleDemoDelivery,
  };
}

export default function App() {
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("ALL");
  const [selectedConsultant, setSelectedConsultant] = useState("ALL");
  const [selectedTeamLeader, setSelectedTeamLeader] = useState("ALL");
  const [showTM6, setShowTM6] = useState(true);
  const [showAccessories, setShowAccessories] = useState(true);
  const [includeDemoDelivery, setIncludeDemoDelivery] = useState(true);
  const [error, setError] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const {
    manualPeople,
    formData,
    editingId,
    handleChange,
    handleSavePerson,
    handleEditPerson,
    handleDeletePerson,
    resetForm,
  } = useManualPeople(setError);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setError("");
      setFileName(file.name);

      const data = await readExcelFile(file);
      setRows(data);

      setSelectedMonth("ALL");
      setSelectedConsultant("ALL");
      setSelectedTeamLeader("ALL");
    } catch (err) {
      console.error(err);
      setError("Eroare la citire Excel.");
      setRows([]);
      setFileName("");
    }
  };

  const handleConsultantChange = (value) => {
    setSelectedConsultant(value);
    setSelectedTeamLeader("ALL");
    setError("");
  };

  const handleTeamLeaderChange = (value) => {
    setSelectedTeamLeader(value);
    setSelectedConsultant("ALL");
    setError("");
  };

  const result = useMemo(() => {
    return buildPeople(rows, {
      selectedMonth,
      showTM6,
      showAccessories,
      includeDemoDelivery,
    });
  }, [rows, selectedMonth, showTM6, showAccessories, includeDemoDelivery]);

  const consultantOptions = useMemo(() => {
    return dedupeOptions([
      { value: "ALL", label: "Toți consultanții" },
      ...result.consultants.map((p) => ({
        value: p.name,
        label: p.name,
      })),
      ...manualPeople
        .filter((p) => p.role === "Consultant")
        .map((p) => ({
          value: p.name,
          label: p.name,
        })),
    ]);
  }, [result.consultants, manualPeople]);

  const teamLeaderOptions = useMemo(() => {
    return dedupeOptions([
      { value: "ALL", label: "Toți Team Leaderii" },
      ...result.teamLeaders.map((p) => ({
        value: p.name,
        label: p.name,
      })),
      ...manualPeople
        .filter((p) => p.role === "Team Leader")
        .map((p) => ({
          value: p.name,
          label: p.name,
        })),
    ]);
  }, [result.teamLeaders, manualPeople]);

  const selectedPeople = useMemo(() => {
    if (selectedConsultant !== "ALL") {
      return dedupePeople([
        ...result.consultants.filter((p) => p.name === selectedConsultant),
        ...manualPeople
          .filter(
            (p) => p.role === "Consultant" && p.name === selectedConsultant,
          )
          .map((p) =>
            enrichManualPerson(p, {
              showTM6,
              showAccessories,
              includeDemoDelivery,
            }),
          ),
      ]);
    }

    if (selectedTeamLeader !== "ALL") {
      return dedupePeople([
        ...result.teamLeaders.filter((p) => p.name === selectedTeamLeader),
        ...manualPeople
          .filter(
            (p) => p.role === "Team Leader" && p.name === selectedTeamLeader,
          )
          .map((p) =>
            enrichManualPerson(p, {
              showTM6,
              showAccessories,
              includeDemoDelivery,
            }),
          ),
      ]);
    }

    return [];
  }, [
    selectedConsultant,
    selectedTeamLeader,
    result.consultants,
    result.teamLeaders,
    manualPeople,
    showTM6,
    showAccessories,
    includeDemoDelivery,
  ]);

  const handleManualSave = () => {
    const savedPerson = handleSavePerson();

    if (!savedPerson) return false;

    if (savedPerson.role === "Consultant") {
      setSelectedConsultant(savedPerson.name);
      setSelectedTeamLeader("ALL");
    }

    if (savedPerson.role === "Team Leader") {
      setSelectedTeamLeader(savedPerson.name);
      setSelectedConsultant("ALL");
    }

    return savedPerson;
  };

  const handleExport = () => {
    setError("");

    if (selectedPeople.length === 0) {
      setError(
        "Selectează un consultant sau un team leader pentru export PDF.",
      );
      return;
    }

    exportCommissionPdf({
      visiblePeople: selectedPeople.map((person) => ({
        ...person,
        tm6Count: Number(person.tm6Count) || 0,
        accessories: Number(person.accessories) || 0,
        demoDelivery: Number(person.demoDelivery) || 0,
      })),
      selectedMonth,
      selectedConsultant,
      selectedTeamLeader,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="mt-6 space-y-8">
          <ControlPanel
            fileName={fileName}
            error={error}
            onFileUpload={handleFileUpload}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedConsultant={selectedConsultant}
            setSelectedConsultant={handleConsultantChange}
            selectedTeamLeader={selectedTeamLeader}
            setSelectedTeamLeader={handleTeamLeaderChange}
            consultantOptions={consultantOptions}
            teamLeaderOptions={teamLeaderOptions}
            months={months}
            showTM6={showTM6}
            setShowTM6={setShowTM6}
            showAccessories={showAccessories}
            setShowAccessories={setShowAccessories}
            includeDemoDelivery={includeDemoDelivery}
            setIncludeDemoDelivery={setIncludeDemoDelivery}
            onExport={handleExport}
          />

          <PersonForm
            formData={formData}
            editingId={editingId}
            onChange={handleChange}
            onSave={handleManualSave}
            onCancel={resetForm}
            error={error}
          />

          {manualPeople.length > 0 && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Persoane adăugate manual
              </h2>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {manualPeople.map((person) => (
                  <div
                    key={person.id}
                    className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700"
                  >
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      {person.name}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {person.role}
                    </p>

                    <div className="mt-3 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                      <p>TM6: {person.tm6Count}</p>
                      <p>Accesorii: {person.accessories}</p>
                      <p>Demo Delivery: {person.demoDelivery}</p>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditPerson(person)}
                        className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Editează
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeletePerson(person.id)}
                        className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300"
                      >
                        Șterge
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Rezultate comisioane
            </h2>

            {selectedPeople.length === 0 ? (
              <EmptyState message="Selectează un consultant sau un team leader pentru a vedea comisionul." />
            ) : (
              <div className="grid gap-4 xl:grid-cols-2">
                {selectedPeople.map((person, index) => (
                  <PersonCard key={person.id ?? index} person={person} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
