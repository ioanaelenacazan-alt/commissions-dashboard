import * as XLSX from "xlsx";
import { normalizeExcelRows } from "./excel";

export async function readExcelFile(file) {
  const buffer = await file.arrayBuffer();

  const workbook = XLSX.read(buffer, {
    type: "array",
    cellDates: true,
  });

  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    defval: "",
    raw: true,
  });

  return normalizeExcelRows(jsonData);
}