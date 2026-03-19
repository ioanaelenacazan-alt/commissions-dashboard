import UploadCard from "./UploadCard";
import FiltersCard from "./FiltersCard";
import ExportCard from "./ExportCard";

export default function ControlPanel(props) {
  const handleResetFilters = () => {
    props.setSelectedMonth("ALL");
    props.setSelectedConsultant("ALL");
    props.setSelectedTeamLeader("ALL");
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-6">
        <UploadCard
          fileName={props.fileName}
          error={props.error}
          onFileUpload={props.onFileUpload}
        />

        <FiltersCard
          selectedMonth={props.selectedMonth}
          setSelectedMonth={props.setSelectedMonth}
          selectedConsultant={props.selectedConsultant}
          setSelectedConsultant={props.setSelectedConsultant}
          selectedTeamLeader={props.selectedTeamLeader}
          setSelectedTeamLeader={props.setSelectedTeamLeader}
          consultantOptions={props.consultantOptions}
          teamLeaderOptions={props.teamLeaderOptions}
          months={props.months}
        />

        <ExportCard
          onExport={props.onExport}
          onReset={handleResetFilters}
        />
      </div>
    </section>
  );
}
