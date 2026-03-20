import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const initialFormData = {
  name: "",
  role: "Consultant",
  tm6Count: "",
  accessories: "",
  demoDelivery: "",
};

function normalizeName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function toSafeNumber(value) {
  if (value === "" || value === null || value === undefined) return 0;

  const number = Number(value);

  if (Number.isNaN(number)) return 0;
  if (number < 0) return null;

  return number;
}

export default function useManualPeople(setError) {
  const [manualPeople, setManualPeople] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const savedPeople = localStorage.getItem("manualPeople");

    if (!savedPeople) return;

    try {
      const parsed = JSON.parse(savedPeople);
      setManualPeople(Array.isArray(parsed) ? parsed : []);
    } catch {
      setManualPeople([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("manualPeople", JSON.stringify(manualPeople));
  }, [manualPeople]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "number" && value !== "" && Number(value) < 0) {
      setError("Valorile numerice nu pot fi negative.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setError("");
  };

  const handleEditPerson = (person) => {
    setFormData({
      name: person.name || "",
      role: person.role || "Consultant",
      tm6Count: person.tm6Count ?? "",
      accessories: person.accessories ?? "",
      demoDelivery: person.demoDelivery ?? "",
    });

    setEditingId(person.id);
    setError("");
  };

  const handleDeletePerson = (id) => {
    setManualPeople((prev) => prev.filter((person) => person.id !== id));

    if (editingId === id) {
      resetForm();
    }
  };

  const handleSavePerson = () => {
    const cleanName = String(formData.name || "").trim();
    const normalizedRole = formData.role;

    if (!cleanName) {
      setError("Te rog completează numele.");
      toast.error("Te rog completează numele."); // 👈 AICI
      return false;
    }

    if (normalizedRole !== "Consultant" && normalizedRole !== "Team Leader") {
      setError("Rolul trebuie să fie Consultant sau Team Leader.");
      toast.error("Rol invalid."); // 👈 AICI
      return false;
    }

    const tm6Count = toSafeNumber(formData.tm6Count);
    const accessories = toSafeNumber(formData.accessories);
    const demoDelivery = toSafeNumber(formData.demoDelivery);

    if (tm6Count === null || accessories === null || demoDelivery === null) {
      setError("Valorile numerice nu pot fi negative.");
      return false;
    }

    const normalizedCurrentName = normalizeName(cleanName);

    const duplicatePerson = manualPeople.find((person) => {
      const sameName = normalizeName(person.name) === normalizedCurrentName;
      const sameRole = person.role === normalizedRole;
      const differentPerson = person.id !== editingId;

      return sameName && sameRole && differentPerson;
    });

    if (duplicatePerson) {
      setError("Există deja o persoană cu același nume și același rol.");
      return false;
    }

    const personToSave = {
      id: editingId || crypto.randomUUID(),
      name: cleanName,
      role: normalizedRole,
      tm6Count,
      accessories,
      demoDelivery,
      source: "manual",
    };

    if (editingId) {
      setManualPeople((prev) =>
        prev.map((person) => (person.id === editingId ? personToSave : person)),
      );
    } else {
      setManualPeople((prev) => [...prev, personToSave]);
    }

    // 👇 AICI
    toast.success(editingId ? "Persoană actualizată!" : "Persoană adăugată!");

    resetForm();
    return personToSave;
  };

  return {
    manualPeople,
    formData,
    editingId,
    handleChange,
    handleSavePerson,
    handleEditPerson,
    handleDeletePerson,
    resetForm,
  };
}

// Este hook-ul care gestionează complet datele introduse manual, 
// de la validare până la persistare în localStorage

// ține lista de persoane (state)
// validează datele (ex: valori corecte)
// salvează în localStorage