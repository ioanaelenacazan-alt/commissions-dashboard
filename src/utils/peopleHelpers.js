export function dedupePeople(list) {
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

export function dedupeOptions(options) {
  const seen = new Set();

  return options.filter((option) => {
    if (seen.has(option.value)) return false;
    seen.add(option.value);
    return true;
  });
}

export function calculateTm6Commission(tm6Count) {
  const count = Number(tm6Count) || 0;

  if (count <= 0) return 0;
  if (count >= 3) return count * 120;

  return count * 100;
}

export function enrichManualPerson(person) {
  const tm6Count = Number(person.tm6Count) || 0;
  const accessories = Number(person.accessories) || 0;
  const demoDelivery = Number(person.demoDelivery) || 0;

  const tm6Commission = calculateTm6Commission(tm6Count);

  return {
    ...person,
    source: "manual",
    tm6Count,
    accessories,
    demoDelivery,
    tm6Commission,
    totalCommission: tm6Commission + accessories + demoDelivery,
  };
}