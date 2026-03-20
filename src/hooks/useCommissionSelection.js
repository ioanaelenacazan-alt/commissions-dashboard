import { useMemo } from "react";
import {
  dedupeOptions,
  dedupePeople,
  enrichManualPerson,
} from "../utils/peopleHelpers";

export default function useCommissionSelection({
  result,
  manualPeople,
  selectedConsultant,
  selectedTeamLeader,
}) {
  const consultantOptions = useMemo(() => {
    const excelConsultants = result.consultants.map((person) => ({
      value: person.name,
      label: person.name,
    }));

    const manualConsultants = manualPeople
      .filter((person) => person.role === "Consultant")
      .map((person) => ({
        value: person.name,
        label: person.name,
      }));

    return dedupeOptions([
      { value: "ALL", label: "Toți consultanții" },
      ...excelConsultants,
      ...manualConsultants,
    ]);
  }, [result.consultants, manualPeople]);

  const teamLeaderOptions = useMemo(() => {
    const excelTeamLeaders = result.teamLeaders.map((person) => ({
      value: person.name,
      label: person.name,
    }));

    const manualTeamLeaders = manualPeople
      .filter((person) => person.role === "Team Leader")
      .map((person) => ({
        value: person.name,
        label: person.name,
      }));

    return dedupeOptions([
      { value: "ALL", label: "Toți Team Leaderii" },
      ...excelTeamLeaders,
      ...manualTeamLeaders,
    ]);
  }, [result.teamLeaders, manualPeople]);

  const selectedPeople = useMemo(() => {
    const selectedRole =
      selectedConsultant !== "ALL"
        ? "Consultant"
        : selectedTeamLeader !== "ALL"
          ? "Team Leader"
          : null;

    const selectedName =
      selectedConsultant !== "ALL"
        ? selectedConsultant
        : selectedTeamLeader !== "ALL"
          ? selectedTeamLeader
          : null;

    if (!selectedRole || !selectedName) {
      return [];
    }

    const excelPeople =
      selectedRole === "Consultant"
        ? result.consultants.filter((person) => person.name === selectedName)
        : result.teamLeaders.filter((person) => person.name === selectedName);

    const manualSelectedPeople = manualPeople
      .filter(
        (person) => person.role === selectedRole && person.name === selectedName,
      )
      .map((person) => enrichManualPerson(person));

    return dedupePeople([...excelPeople, ...manualSelectedPeople]);
  }, [
    selectedConsultant,
    selectedTeamLeader,
    result.consultants,
    result.teamLeaders,
    manualPeople,
  ]);

  return {
    consultantOptions,
    teamLeaderOptions,
    selectedPeople,
  };
}

// hook care pregătește și filtrează datele pentru afișare, 
// combinând datele din Excel cu cele introduse manual 
// eliminând duplicatele.
// Pentru a centraliza logica de filtrare și selecție într-un singur loc, separat de UI.