function ExportCSVButton({ data, fileName }) {
  console.log(data);
  console.log(fileName);
  const handleExport = () => {
    if (!data.length) return;

    const headers = ["title", "amount", "category", "date"];

    const csvRows = [
      headers.join(","),
      ...data.map((item) =>
        headers
          .map((header) => {
            if (header === "date") {
              return `"${new Date(item[header])
                .toLocaleDateString("en-GB")
                .replace(/\//g, "-")}"`;
            }

            return item[header];
          })
          .join(","),
      ),
    ];

    const csvString = csvRows.join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${fileName}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };
  return <button onClick={handleExport}>Export CSV</button>;
}

export default ExportCSVButton;
