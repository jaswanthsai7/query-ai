const TableGrid = () => {
  const data = [
    { category: "Food", amount: "$120", date: "2025-07-20" },
    { category: "Transport", amount: "$50", date: "2025-07-21" },
    { category: "Shopping", amount: "$200", date: "2025-07-22" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Expense Summary</h2>
      <table className="w-full rounded-lg overflow-hidden text-left border border-white/20">
        <thead className="bg-white/10 text-white/80">
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
  );
};

export default TableGrid;
