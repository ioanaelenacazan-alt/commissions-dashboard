import * as XLSX from "xlsx";

function ExcelUploader({ setExcelData }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log("Date Excel:", jsonData);
      setExcelData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex justify-start">
      <label className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm cursor-pointer transition">
        <span>Încarcă fișier Excel</span>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
    </div>
  );
}

export default ExcelUploader;