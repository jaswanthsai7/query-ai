import { useState, useMemo, Fragment } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

import { Listbox, Transition } from "@headlessui/react";
import {
  ChevronDown,
  Check,
  Calendar,
  CreditCard,
  Wallet,
  FileText,
  Edit3,
  Trash2,
} from "lucide-react";

// Reusable Dropdown
const CustomDropdown = ({ label, value, options, onChange, icon: Icon }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-2">
      {Icon && <Icon size={18} />} {label}
    </label>
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="w-full px-4 py-2 rounded-full border border-white/40 bg-white/10 text-white flex items-center justify-between focus:ring-2 focus:ring-orange-400">
          {value || `Select ${label}`}
          <ChevronDown className="w-4 h-4 text-white/70" />
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-2 w-full max-h-60 overflow-auto rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            {options.map((option, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 ${
                    active ? "bg-orange-100 text-orange-900" : "text-gray-900"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <div className="flex justify-between">
                    <span
                      className={selected ? "font-semibold" : "font-normal"}
                    >
                      {option}
                    </span>
                    {selected && <Check className="w-4 h-4 text-orange-500" />}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  </div>
);

const FillExpenses = ({ gradient = "from-orange-600 to-pink-600" }) => {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    date: "",
    paymentMethod: "",
    notes: "",
  });
  const [expenses, setExpenses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({});

  const categories = [
    "Food & Drinks",
    "Transport",
    "Shopping",
    "Bills & Utilities",
    "Entertainment",
    "Healthcare",
    "Travel",
    "Other",
  ];
  const paymentMethods = ["Cash", "Card", "UPI", "Net Banking", "Wallet"];
  const COLORS = [
    "#ff5a3d",
    "#4ade80",
    "#60a5fa",
    "#facc15",
    "#f97316",
    "#a855f7",
    "#14b8a6",
    "#ef4444",
  ];

  // Validation
  const validate = () => {
    const errs = {};
    if (!formData.category) errs.category = "Select a category";
    if (
      !formData.amount ||
      isNaN(Number(formData.amount)) ||
      Number(formData.amount) <= 0
    )
      errs.amount = "Enter a valid amount";
    if (!formData.date) errs.date = "Select a date";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const resetForm = () =>
    setFormData({
      category: "",
      amount: "",
      date: "",
      paymentMethod: "",
      notes: "",
    });

  // Add/Edit Expense
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { ...formData, amount: Number(formData.amount) };

    if (editingIndex !== null) {
      setExpenses((prev) =>
        prev.map((exp, i) => (i === editingIndex ? payload : exp))
      );
      setEditingIndex(null);
    } else {
      setExpenses((prev) => [...prev, payload]);
    }
    resetForm();
  };

  const handleEdit = (idx) => {
    setEditingIndex(idx);
    const exp = expenses[idx];
    setFormData({ ...exp, amount: String(exp.amount) });
  };

  const handleDelete = (idx) => {
    setExpenses((prev) => prev.filter((_, i) => i !== idx));
    if (editingIndex === idx) {
      setEditingIndex(null);
      resetForm();
    }
  };

  const totalExpense = useMemo(
    () => expenses.reduce((acc, exp) => acc + Number(exp.amount || 0), 0),
    [expenses]
  );

  // Pie Chart Data
  const chartData = useMemo(() => {
    return categories
      .map((cat) => {
        const total = expenses
          .filter((exp) => exp.category === cat)
          .reduce((sum, exp) => sum + Number(exp.amount || 0), 0);
        return { name: cat, value: total };
      })
      .filter((c) => c.value > 0);
  }, [expenses, categories]);

  // Area Chart Data
  const trendData = useMemo(() => {
    const dateMap = {};
    expenses.forEach((exp) => {
      const date = exp.date || new Date().toISOString().split("T")[0];
      dateMap[date] = (dateMap[date] || 0) + Number(exp.amount || 0);
    });
    return Object.keys(dateMap)
      .sort((a, b) => new Date(a) - new Date(b))
      .map((date) => ({ date, total: dateMap[date] }));
  }, [expenses]);

  return (
    <div className={`relative h-[calc(100vh-128px)] bg-gradient-to-br  overflow-hidden p-6`}>
      {/* Background Glows */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] rounded-full bg-white/10 blur-[100px]" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] rounded-full bg-white/10 blur-[100px]" />

      {/* Layout */}
      <div className="relative flex flex-col md:flex-row gap-6 z-10 h-full">
        {/* Form Section */}
        <form
          onSubmit={handleAddExpense}
          className="w-full md:w-1/3 bg-white/15 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/30 hover:shadow-2xl transition flex flex-col justify-between"
        >
          <div>
            <h2 className="text-2xl font-extrabold text-white text-center mb-6 tracking-tight">
              {editingIndex !== null ? "Edit Expense" : "Add Expense"}
            </h2>
            <div className="space-y-4">
              <CustomDropdown
                label="Category"
                icon={Wallet}
                value={formData.category}
                options={categories}
                onChange={(val) => setFormData({ ...formData, category: val })}
              />
              {errors.category && (
                <p className="text-red-300 text-xs">{errors.category}</p>
              )}

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 rounded-full border border-white/40 bg-white/10 text-white focus:ring-2 focus:ring-orange-400 outline-none transition"
                />
                {errors.amount && (
                  <p className="text-red-300 text-xs">{errors.amount}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-2">
                  <Calendar size={18} /> Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-full border border-white/40 bg-white/10 text-white focus:ring-2 focus:ring-orange-400 outline-none transition"
                />
                {errors.date && (
                  <p className="text-red-300 text-xs">{errors.date}</p>
                )}
              </div>

              <CustomDropdown
                label="Payment Method"
                icon={CreditCard}
                value={formData.paymentMethod}
                options={paymentMethods}
                onChange={(val) =>
                  setFormData({ ...formData, paymentMethod: val })
                }
              />

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-2">
                  <FileText size={18} /> Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Add details..."
                  rows="2"
                  className="w-full px-4 py-2 rounded-2xl border border-white/40 bg-white/10 text-white focus:ring-2 focus:ring-orange-400 outline-none transition"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`mt-4 w-full py-2 rounded-full font-semibold text-white bg-gradient-to-r ${gradient} shadow-lg hover:scale-105 transition-transform duration-300`}
          >
            {editingIndex !== null ? "Update Expense" : "Add Expense"}
          </button>
        </form>

        {/* Right Section */}
        <div className="w-full md:w-2/3 bg-white/15 backdrop-blur-md rounded-3xl shadow-lg p-6 border border-white/30 hover:shadow-2xl transition flex flex-col">
          {/* Charts */}
          <h2 className="text-2xl font-bold text-white mb-4">Expense Breakdown</h2>
          {chartData.length === 0 ? (
            <p className="text-white/70 text-center py-10">No data to display.</p>
          ) : (
            <div className="flex flex-col md:flex-row gap-4">
              {/* Pie Chart */}
              <div className="w-full md:w-1/3 h-40">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={50}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Area Chart */}
              <div className="w-full md:w-2/3 bg-white/15 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-4">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Expense Trend
                </h2>
                <div className="h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={trendData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#fb7185" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#fb7185" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.08)"
                      />
                      <XAxis dataKey="date" stroke="#ffffff90" />
                      <YAxis stroke="#ffffff90" />
                      <Tooltip
                        contentStyle={{
                          background: "rgba(0,0,0,0.6)",
                          border: "none",
                          borderRadius: 8,
                          color: "#fff",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#fb7185"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorTotal)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Expenses List */}
          <h2 className="text-2xl font-bold text-white mb-4 mt-4">Expenses List</h2>
          {expenses.length === 0 ? (
            <p className="text-white/70 text-center py-10">
              No expenses added yet.
            </p>
          ) : (
            <div className="space-y-3 flex-1 overflow-y-auto pr-2">
              {expenses.map((exp, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 bg-white/10 rounded-2xl shadow-md"
                >
                  <div>
                    <p className="text-white font-semibold">{exp.category}</p>
                    <p className="text-white/70 text-sm">{exp.notes}</p>
                    <p className="text-white/50 text-xs">{exp.date}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="text-white font-bold">₹{exp.amount}</p>
                    <button
                      onClick={() => handleEdit(i)}
                      className="text-white/70 hover:text-white transition"
                      title="Edit"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(i)}
                      className="text-red-400 hover:text-red-300 transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="text-right text-white font-bold mt-4">
                Total: ₹{totalExpense}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FillExpenses;
