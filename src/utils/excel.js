export function parseAmount(value) {
  if (value === null || value === undefined || value === "") return 0;

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  let text = String(value).trim();

  if (!text) return 0;

  // scoate moneda, spații și alte caractere inutile
  text = text.replace(/[^\d,.-]/g, "");

  // caz: 1.234,56
  if (text.includes(".") && text.includes(",")) {
    const lastDot = text.lastIndexOf(".");
    const lastComma = text.lastIndexOf(",");

    if (lastComma > lastDot) {
      text = text.replace(/\./g, "").replace(",", ".");
    } else {
      text = text.replace(/,/g, "");
    }
  } else if (text.includes(",")) {
    // caz: 123,45
    text = text.replace(",", ".");
  }

  const parsed = parseFloat(text);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function getMonthNumberFromDate(value) {
  if (value === null || value === undefined || value === "") return "";

  if (typeof value === "number") {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const jsDate = new Date(excelEpoch.getTime() + value * 86400000);

    if (isNaN(jsDate.getTime())) return "";
    return String(jsDate.getUTCMonth() + 1).padStart(2, "0");
  }

  if (value instanceof Date && !isNaN(value.getTime())) {
    return String(value.getMonth() + 1).padStart(2, "0");
  }

  const text = String(value).trim();

  if (!text) return "";

  const isoMatch = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    return isoMatch[2];
  }

  const roMatch = text.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})/);
  if (roMatch) {
    return String(roMatch[2]).padStart(2, "0");
  }

  const dateObj = new Date(text);
  if (!isNaN(dateObj.getTime())) {
    return String(dateObj.getMonth() + 1).padStart(2, "0");
  }

  return "";
}

export function getMonthLabel(monthNumber) {
  const monthNames = {
    "01": "Ianuarie",
    "02": "Februarie",
    "03": "Martie",
    "04": "Aprilie",
    "05": "Mai",
    "06": "Iunie",
    "07": "Iulie",
    "08": "August",
    "09": "Septembrie",
    10: "Octombrie",
    11: "Noiembrie",
    12: "Decembrie",
  };

  return monthNames[monthNumber] || "";
}

function pickValue(row, keys) {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null && row[key] !== "") {
      return row[key];
    }
  }
  return "";
}

export function normalizeExcelRows(rows = []) {
  return rows.map((row, index) => {
    const rawDate = pickValue(row, [
      "DATA_FACTURA",
      "DATA FACTURA",
      "DATA",
      "Data",
      "data",
      "Data Factura",
      "data factura",
      "DATA EMITERE",
      "Data Emitere",
      "data emitere",
      "DATE",
      "Date",
      "date",
    ]);

    const rawConsultant = pickValue(row, [
      "CONSULTANT",
      "Consultant",
      "consultant",
      "DENUMIRE CONSULTANT",
      "Consultant Name",
      "Nume Consultant",
    ]);

    const rawTeamLeader = pickValue(row, [
      "TL",
      "Tl",
      "tl",
      "TEAM LEADER",
      "Team Leader",
      "team leader",
      "DENUMIRE TEAM LEADER",
    ]);

    const rawItem = pickValue(row, [
      "ITEM",
      "Item",
      "item",
      "PRODUS",
      "Produs",
      "produs",
      "PRODUCT",
      "Product",
    ]);

    const rawAccessories = pickValue(row, [
      "ACC_COMISION",
      "ACC COMISION",
      "acc_comision",
      "ACCESORII",
      "Accesorii",
      "accesorii",
      "ACCESSORIES",
      "Accessories",
    ]);

    const monthNumber = getMonthNumberFromDate(rawDate);

    return {
      id: index + 1,
      monthNumber,
      month: getMonthLabel(monthNumber),
      consultant: String(rawConsultant || "").trim(),
      teamLeader: String(rawTeamLeader || "").trim(),
      item: String(rawItem || "").trim().toUpperCase(),
      accessories: parseAmount(rawAccessories),
      raw: row,
    };
  });
}
