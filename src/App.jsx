import { useMemo, useState } from "react";
import CommissionResults from "./components/CommissionResults";
import ManualPeopleList from "./components/ManualPeopleList";
import ControlPanel from "./components/ControlPanel";
import PersonForm from "./components/PersonForm";
import Header from "./layout/Header";

import { buildPeople } from "./utils/commissions";
import { readExcelFile } from "./utils/readExcelFile";
import { exportCommissionPdf } from "./utils/exportCommissionPdf";
import { months } from "./constants/months";

import useManualPeople from "./hooks/useManualPeople";
import useDarkMode from "./hooks/useDarkMode";
import useCommissionSelection from "./hooks/useCommissionSelection";

export default function App() {
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("ALL");
  const [selectedConsultant, setSelectedConsultant] = useState("ALL");
  const [selectedTeamLeader, setSelectedTeamLeader] = useState("ALL");
  const [error, setError] = useState("");

  const { darkMode, setDarkMode } = useDarkMode();

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

  const result = useMemo(() => {
    return buildPeople(rows, { selectedMonth });
  }, [rows, selectedMonth]);

  const { consultantOptions, teamLeaderOptions, selectedPeople } =
    useCommissionSelection({
      result,
      manualPeople,
      selectedConsultant,
      selectedTeamLeader,
    });

  const resetSelections = () => {
    setSelectedMonth("ALL");
    setSelectedConsultant("ALL");
    setSelectedTeamLeader("ALL");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setError("");
      setFileName(file.name);

      const data = await readExcelFile(file);
      setRows(data);
      resetSelections();
    } catch (err) {
      console.error(err);
      setError("Eroare la citire Excel.");
      setRows([]);
      setFileName("");
      resetSelections();
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
      setError("Selectează un consultant sau un team leader pentru export PDF.");
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
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-500/10" />
        <div className="absolute right-[-100px] top-40 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-500/10" />
        <div className="absolute bottom-16 left-1/3 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-500/10" />

        <svg
          className="absolute left-[-140px] top-[-20px] h-[520px] w-[520px] text-slate-300/40 dark:text-slate-500/20"
          viewBox="0 0 520 520"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M90 220C120 140 210 90 300 110C375 126 430 175 448 250C465 320 438 388 380 430"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M70 270C95 185 170 128 255 126C345 124 420 174 452 255C480 324 465 398 418 446"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="8 10"
            strokeLinecap="round"
          />
          <path
            d="M130 320C170 360 230 382 290 375C350 368 404 334 430 286"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>

        <svg
          className="absolute bottom-[-120px] right-[-180px] h-[560px] w-[560px] text-slate-300/40 dark:text-slate-500/20"
          viewBox="0 0 560 560"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M120 310C155 210 245 150 345 168C430 183 497 244 515 330C530 405 500 470 440 510"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M85 345C120 245 205 183 302 188C392 192 470 243 510 322"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="6 10"
            strokeLinecap="round"
          />
          <path
            d="M180 390C225 425 282 440 340 431C398 422 450 392 485 346"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8">
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

          <ManualPeopleList
            manualPeople={manualPeople}
            onEditPerson={handleEditPerson}
            onDeletePerson={handleDeletePerson}
          />

          <CommissionResults selectedPeople={selectedPeople} />
        </div>
      </div>
    </div>
  );
}