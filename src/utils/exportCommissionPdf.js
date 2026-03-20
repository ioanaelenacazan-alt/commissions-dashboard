import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function formatLei(value) {
  return `${Number(value || 0).toFixed(2)} LEI`;
}

function getTm6Commission(tm6Count) {
  const count = Number(tm6Count) || 0;

  if (count >= 3) return count * 120;
  if (count >= 1) return count * 100;

  return 0;
}

function getSafePerson(person = {}) {
  const tm6Count = Number(person.tm6Count) || 0;
  const accessories = Number(person.accessories) || 0;
  const demoDelivery = Number(person.demoDelivery) || 0;

  const tm6Commission =
    person.tm6Commission !== undefined && person.tm6Commission !== null
      ? Number(person.tm6Commission) || 0
      : getTm6Commission(tm6Count);

  const totalCommission =
    person.totalCommission !== undefined && person.totalCommission !== null
      ? Number(person.totalCommission) || 0
      : tm6Commission + accessories + demoDelivery;

  return {
    name: person.name || "-",
    role: person.role || "-",
    tm6Count,
    tm6Commission,
    accessories,
    demoDelivery,
    totalCommission,
  };
}

function buildRows(people = []) {
  return people.map((person) => {
    const safePerson = getSafePerson(person);

    return [
      safePerson.name,
      safePerson.role,
      safePerson.tm6Count,
      formatLei(safePerson.tm6Commission),
      formatLei(safePerson.accessories),
      formatLei(safePerson.demoDelivery),
      formatLei(safePerson.totalCommission),
    ];
  });
}

export function exportCommissionPdf({
  visiblePeople = [],
  selectedMonth,
  selectedConsultant,
  selectedTeamLeader,
}) {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Raport comisioane", 14, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  const filters = [
    `Lună: ${selectedMonth || "ALL"}`,
    `Consultant: ${selectedConsultant || "ALL"}`,
    `Team Leader: ${selectedTeamLeader || "ALL"}`,
  ];

  doc.text(filters.join(" | "), 14, 28);

  autoTable(doc, {
    startY: 34,
    head: [
      [
        "Nume",
        "Rol",
        "TM6",
        "Comision TM6",
        "Accesorii",
        "Demo / Delivery",
        "Total",
      ],
    ],
    body:
      visiblePeople.length > 0
        ? buildRows(visiblePeople)
        : [["-", "-", "-", "-", "-", "-", "-"]],
    theme: "striped",
    headStyles: {
      fillColor: [52, 132, 190],
      textColor: 255,
    },
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: "middle",
    },
    columnStyles: {
      0: { cellWidth: 38 },
      1: { cellWidth: 28 },
      2: { halign: "center", cellWidth: 14 },
      3: { halign: "right", cellWidth: 28 },
      4: { halign: "right", cellWidth: 26 },
      5: { halign: "right", cellWidth: 30 },
      6: { halign: "right", cellWidth: 26 },
    },
  });

  doc.save("raport-comisioane.pdf");
}

// generează PDF-ul cu rezultatele