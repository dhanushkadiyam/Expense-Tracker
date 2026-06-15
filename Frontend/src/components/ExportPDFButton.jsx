import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
function ExportPDFButton({ data, fileName }) {
  console.log(data);
  console.log(fileName);
  const handleExport = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`${fileName.toUpperCase()} REPORT`, 14, 15);
    doc.setFontSize(11);

    doc.text(
      `Generated: ${new Date()
        .toLocaleDateString("en-GB")
        .replace(/\//g, "-")}`,
      14,
      27,
    );
    const tableData = data.map((item) => [
      item.title,
      item.amount,
      item.category,
      new Date(item.date).toLocaleDateString("en-GB").replace(/\//g, "-"),
    ]);
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    autoTable(doc, {
      startY: 40,
      head: [["Title", "Amount", "Category", "Date"]],
      body: tableData,
      theme: "striped",
    });
    doc.setFontSize(14);

    doc.text(`Total ${fileName}: ₹${total}`, 14, doc.lastAutoTable.finalY + 15);
    doc.save(`${fileName}.pdf`);
  };
  return <button onClick={handleExport}>Export PDF</button>;
}

export default ExportPDFButton;
