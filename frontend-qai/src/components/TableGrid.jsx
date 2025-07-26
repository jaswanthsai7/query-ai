const TableGrid = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-white text-center py-10">
        No expense data to display.
      </div>
    );
  }

  // Columns to exclude from display
  const excludedColumns = ["Id", "expenseid", "userId"];

  // Extract column keys dynamically, excluding those columns
  const columns = Array.from(
    new Set(data.flatMap(row => Object.keys(row)))
  ).filter(col => !excludedColumns.includes(col));

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold text-white mb-4">Expense Summary</h2>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full rounded-lg overflow-hidden text-left border border-white/20">
          <thead className="bg-white/10 text-white/80 sticky top-0 z-10">
            <tr>
              {columns.map(col => (
                <th key={col} className="p-3 capitalize">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-white/10 transition-colors border-b border-white/10"
              >
                {columns.map(col => {
                  let value = row[col];

                  // Format date fields (strings containing "date" or "createdat") as yyyy-MM-dd
                  if (
                    value &&
                    typeof value === "string" &&
                    (col.toLowerCase().includes("date") || col.toLowerCase().includes("createdat"))
                  ) {
                    const dt = new Date(value);
                    if (!isNaN(dt)) {
                      const year = dt.getFullYear();
                      const month = (dt.getMonth() + 1).toString().padStart(2, "0");
                      const day = dt.getDate().toString().padStart(2, "0");
                      value = `${year}-${month}-${day}`;
                    }
                  }

                  // Format amount fields as currency
                  if (col.toLowerCase().includes("amount") && typeof value === "number") {
                    value = `$${value.toFixed(2)}`;
                  }

                  return (
                    <td key={col} className="p-3">
                      {value?.toString() ?? ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableGrid;
