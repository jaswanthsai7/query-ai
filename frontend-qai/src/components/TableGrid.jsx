const TableGrid = () => {
  const data = [
    { category: "Food", amount: "$120", date: "2025-07-20" },
    { category: "Transport", amount: "$50", date: "2025-07-21" },
    { category: "Shopping", amount: "$200", date: "2025-07-22" },
  ];

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold text-white mb-4">Expense Summary</h2>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <table className="w-full rounded-lg overflow-hidden text-left border border-white/20">
          <thead className="bg-white/10 text-white/80 sticky top-0 z-10">
            <tr>
              <th className="p-3">Category</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-white/10 transition-colors border-b border-white/10"
              >
                <td className="p-3">{row.category}</td>
                <td className="p-3">{row.amount}</td>
                <td className="p-3">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableGrid;
