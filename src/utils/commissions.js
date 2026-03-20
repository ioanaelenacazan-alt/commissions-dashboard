export function getTM6Commission(count) {
  if (count >= 3) return count * 120;
  if (count >= 1) return count * 100;
  return 0;
}

function isTM6Product(item) {
  return String(item || "")
    .trim()
    .toUpperCase()
    .includes("TM6");
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") return 0;

  if (typeof value === "number") return value;

  const text = String(value).trim();

  if (text.includes(",") && text.includes(".")) {
    return Number(text.replace(/\./g, "").replace(",", ".")) || 0;
  }

  if (text.includes(",")) {
    return Number(text.replace(",", ".")) || 0;
  }

  return Number(text) || 0;
}

function buildGroup(rows, personKey, roleLabel, filters) {
  const {
    selectedMonth = "ALL",
    showTM6 = true,
    showAccessories = true,
    includeDemoDelivery = true,
  } = filters;

  const peopleMap = {};

  rows.forEach((row) => {
    const personName = String(row?.[personKey] || "").trim();
    if (!personName) return;

    const rowMonth = String(row?.monthNumber || "").padStart(2, "0");
    const passesMonth =
      selectedMonth === "ALL" ? true : rowMonth === selectedMonth;

    if (!passesMonth) return;

    const key = `${roleLabel}-${personName}`;

    if (!peopleMap[key]) {
      peopleMap[key] = {
        id: key,
        name: personName,
        role: roleLabel,
        tm6Count: 0,
        accessoriesRaw: 0,
      };
    }

    if (isTM6Product(row?.item)) {
      peopleMap[key].tm6Count += 1;
    }

    peopleMap[key].accessoriesRaw += toNumber(row?.accessories);
  });

  return Object.values(peopleMap)
    .map((person) => {
      const tm6Commission = showTM6 ? getTM6Commission(person.tm6Count) : 0;

      // fara /1000 daca valoarea din Excel este deja in LEI
      const accessories = showAccessories ? person.accessoriesRaw / 1000 : 0;

      const demoDelivery =
        includeDemoDelivery && person.tm6Count > 0 ? 50 : 0;

      const totalCommission = tm6Commission + accessories + demoDelivery;

      return {
        id: person.id,
        name: person.name,
        role: person.role,
        tm6Count: person.tm6Count,
        tm6Commission,
        accessories,
        demoDelivery,
        totalCommission,
      };
    })
    .sort(
      (a, b) =>
        b.totalCommission - a.totalCommission || a.name.localeCompare(b.name),
    );
}

export function buildPeople(rows = [], filters = {}) {
  return {
    consultants: buildGroup(rows, "consultant", "Consultant", filters),
    teamLeaders: buildGroup(rows, "teamLeader", "Team Leader", filters),
  };
}
// calculează comisioanele pe baza datelor

// calcule TM6
// totaluri
// grupare persoane