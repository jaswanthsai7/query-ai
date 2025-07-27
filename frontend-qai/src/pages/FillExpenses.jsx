import { useState, useMemo, useEffect } from "react";
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

import {
  Calendar,
  CreditCard,
  Wallet,
  FileText,
  Edit3,
  Trash2,
} from "lucide-react";
import CustomDropdown from "../components/CustomDropdown";
import newId from "../features/newId";
import ShimmerLoader from "../features/ShimmerLoader";
import theme from "../constants/theme";
import { useAuth } from "../context/AuthContext";

// API Base & Endpoints
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_GET_ALL = import.meta.env.VITE_API_GET_ALL;
const API_CREATE = import.meta.env.VITE_API_CREATE;
const API_UPDATE = import.meta.env.VITE_API_UPDATE;
const API_DELETE = import.meta.env.VITE_API_DELETE;

const FillExpenses = () => {
  const toDateOnly = (d = new Date()) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const { token, userId } = useAuth();

  const [formData, setFormData] = useState({
    ExpenseId: newId(),
    Category: "",
    Amount: "",
    EntryDate: toDateOnly(),
    CreatedAt: new Date().toISOString(),
    PaymentMethod: "",
    Notes: "",
    UserId: userId,
  });

  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const [rightLoading, setRightLoading] = useState(false);

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

  // Fetch all expenses
  const fetchExpenses = async (isInitial = false) => {
    try {
      if (isInitial) setInitialLoading(true);
      else setRightLoading(true);

      const response = await fetch(`${API_BASE}${API_GET_ALL}`, {
        headers: {
          "x-user-id": formData.UserId,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch expenses: ${response.status}`);
      }

      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    } finally {
      setInitialLoading(false);
      setRightLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses(true);
  }, []);

  const validate = () => {
    const errs = {};
    const amt = parseFloat(formData.Amount);
    if (!formData.Category) errs.Category = "Select a Category";
    if (!formData.Amount || isNaN(amt) || amt <= 0)
      errs.Amount = "Enter valid Amount";
    if (!formData.EntryDate) errs.EntryDate = "Select a date";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const resetForm = () =>
    setFormData({
      ExpenseId: newId(),
      Category: "",
      Amount: "",
      EntryDate: toDateOnly(),
      CreatedAt: new Date().toISOString(),
      PaymentMethod: "",
      Notes: "",
      UserId: userId,
    });

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      Amount: parseFloat(formData.Amount),
      EntryDate: toDateOnly(new Date(formData.EntryDate)),
    };

    if (editingId) {
      const res = await fetch(`${API_BASE}${API_UPDATE}/${formData.ExpenseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": formData.UserId,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchExpenses(false);
        setEditingId(null);
        resetForm();
      } else {
        alert("Failed to update expense");
      }
    } else {
      const res = await fetch(`${API_BASE}${API_CREATE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": formData.UserId,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        alert("Failed to add expense");
      } else {
        await res.json();
        fetchExpenses(false);
      }
      resetForm();
    }
  };

  const handleEdit = (ExpenseId) => {
  const exp = expenses.find((e) => e.ExpenseId === ExpenseId);
  if (!exp) return;

  setEditingId(ExpenseId);

  // Always reset first to avoid stale data
  resetForm();

  setFormData({
    ...exp,
    Amount: String(exp.Amount),
    EntryDate: exp.EntryDate
      ? exp.EntryDate.slice(0, 10) 
      : toDateOnly(new Date(exp.CreatedAt)),
    UserId: userId,
  });
};


  const handleDelete = async (ExpenseId) => {
    setRightLoading(true);
    await fetch(`${API_BASE}${API_DELETE}/${ExpenseId}`, {
      method: "DELETE",
      headers: {
        "x-user-id": formData.UserId,
        Authorization: `Bearer ${token}`,
      },
    });
    fetchExpenses(false);
    if (editingId === ExpenseId) {
      setEditingId(null);
      resetForm();
    }
  };

  const totalExpense = useMemo(
    () => expenses.reduce((acc, exp) => acc + Number(exp.Amount || 0), 0),
    [expenses]
  );

  const chartData = useMemo(() => {
    return categories
      .map((cat) => {
        const total = expenses
          .filter((exp) => exp.Category === cat)
          .reduce((sum, exp) => sum + Number(exp.Amount || 0), 0);
        return { name: cat, value: total };
      })
      .filter((c) => c.value > 0);
  }, [expenses, categories]);

  const trendData = useMemo(() => {
    const dateMap = {};
    expenses.forEach((exp) => {
      const dateKey = exp.EntryDate
        ? new Date(exp.EntryDate).toLocaleDateString()
        : new Date(exp.CreatedAt).toLocaleDateString();
      dateMap[dateKey] = (dateMap[dateKey] || 0) + Number(exp.Amount || 0);
    });
    return Object.keys(dateMap).map((date) => ({ date, total: dateMap[date] }));
  }, [expenses]);

  return (
    <div className="relative min-h-[calc(100vh-128px)] bg-gradient-to-br p-4 md:p-6 overflow-x-hidden overflow-y-auto">
      <div className="relative flex flex-col md:flex-row gap-6 z-10 h-full">
        {/* LEFT FORM */}
        <form
          onSubmit={handleAddExpense}
          className="w-full md:w-1/3 bg-white/15 backdrop-blur-md rounded-3xl shadow-lg p-4 md:p-6 border border-white/30 hover:shadow-2xl transition flex flex-col justify-between"
        >
          {initialLoading ? (
            <div className="space-y-4">
              <ShimmerLoader className="h-6 w-2/3 mx-auto" />
              <ShimmerLoader className="h-10 w-full rounded-full" />
              <ShimmerLoader className="h-10 w-full rounded-full" />
              <ShimmerLoader className="h-20 w-full rounded-2xl" />
              <ShimmerLoader className="h-10 w-full rounded-full" />
            </div>
          ) : (
            <>
              <div>
                <h2 className="text-2xl font-extrabold text-white text-center mb-6 tracking-tight">
                  {editingId ? "Edit Expense" : "Add Expense"}
                </h2>
                <div className="space-y-4">
                  <CustomDropdown
                    label="Category"
                    icon={Wallet}
                    value={formData.Category}
                    options={categories}
                    onChange={(val) => setFormData({ ...formData, Category: val })}
                  />
                  {errors.Category && (
                    <p className="text-red-300 text-xs">{errors.Category}</p>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">
                      Amount (₹)
                    </label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={formData.Amount}
                      onChange={(e) =>
                        setFormData({ ...formData, Amount: e.target.value })
                      }
                      placeholder="Enter Amount"
                      className="w-full px-4 py-2 rounded-full border border-white/40 bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-orange-400 outline-none transition"
                    />
                    {errors.Amount && (
                      <p className="text-red-300 text-xs">{errors.Amount}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-2">
                      <Calendar size={18} /> Date
                    </label>
                    <input
                      type="date"
                      value={formData.EntryDate}
                      onChange={(e) =>
                        setFormData({ ...formData, EntryDate: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-full border border-white/40 bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-orange-400 outline-none transition [color-scheme:dark]"
                    />
                    {errors.EntryDate && (
                      <p className="text-red-300 text-xs">{errors.EntryDate}</p>
                    )}
                  </div>

                  <CustomDropdown
                    label="Payment Method"
                    icon={CreditCard}
                    value={formData.PaymentMethod}
                    options={paymentMethods}
                    onChange={(val) =>
                      setFormData({ ...formData, PaymentMethod: val })
                    }
                  />

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-2">
                      <FileText size={18} /> Notes
                    </label>
                    <textarea
                      value={formData.Notes}
                      onChange={(e) =>
                        setFormData({ ...formData, Notes: e.target.value })
                      }
                      placeholder="Add details..."
                      rows="2"
                      className="w-full px-4 py-2 rounded-2xl border border-white/40 bg-white/10 text-white placeholder-white/70 focus:ring-2 focus:ring-orange-400 outline-none transition"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className={`mt-4 w-full py-2 rounded-full font-semibold text-white bg-gradient-to-r ${theme.gradientchat} shadow-lg hover:scale-105 transition-transform duration-300`}
              >
                {editingId ? "Update Expense" : "Add Expense"}
              </button>
            </>
          )}
        </form>

        {/* RIGHT GRID + CHART */}
        <div className="w-full md:w-2/3 bg-white/15 backdrop-blur-md rounded-3xl shadow-lg p-4 md:p-6 border border-white/30 hover:shadow-2xl transition flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-4">Expense Breakdown</h2>
          <div className="text-right text-white font-bold mt-4 ml-4">
            Total: ₹{totalExpense}
          </div>
          {(initialLoading || rightLoading) ? (
            <div className="space-y-4">
              <ShimmerLoader className="h-6 w-1/3" />
              <ShimmerLoader className="h-40 w-full" />
            </div>
          ) : chartData.length === 0 ? (
            <p className="text-white/70 text-center py-10">No data to display.</p>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 w-full">
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
              <div className="w-full md:w-2/3 bg-white/15 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-4">
                <h2 className="text-lg font-semibold text-white mb-4">
                  Expense Trend
                </h2>
                <div className="h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#fb7185" stopOpacity={0.8} />
                          <stop
                            offset="95%"
                            stopColor="#fb7185"
                            stopOpacity={0.1}
                          />
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

          <h2 className="text-2xl font-bold text-white mb-4 mt-4">Expenses List</h2>
          {(initialLoading || rightLoading) ? (
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {[...Array(3)].map((_, i) => (
                <ShimmerLoader key={i} className="h-20 w-full rounded-2xl" />
              ))}
            </div>
          ) : expenses.length === 0 ? (
            <p className="text-white/70 text-center py-10">
              No expenses added yet.
            </p>
          ) : (
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {expenses.map((exp) => (
                <div
                  key={exp.ExpenseId}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white/10 rounded-2xl shadow-md"
                >
                  <div>
                    <p className="text-white font-semibold">{exp.Category}</p>
                    <p className="text-white/70 text-sm">{exp.Notes}</p>
                    <p className="text-white/50 text-xs">
                      {exp.EntryDate
                        ? new Date(exp.EntryDate).toLocaleDateString()
                        : new Date(exp.CreatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-2 sm:mt-0">
                    <p className="text-white font-bold">₹{exp.Amount}</p>
                    <button
                      onClick={() => handleEdit(exp.ExpenseId)}
                      className="text-white/70 hover:text-white"
                      title="Edit"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.ExpenseId)}
                      className="text-red-400 hover:text-red-300"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FillExpenses;
