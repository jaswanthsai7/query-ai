"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import theme from "@/constants/theme";

/* ----------------- MAIN COMPONENT ----------------- */
const SpendAnalysis = () => {
  // ----- Mock Data -----
  const categoryData = [
    { name: "Food", value: 400 },
    { name: "Transport", value: 300 },
    { name: "Shopping", value: 300 },
    { name: "Bills", value: 200 },
  ];

  const monthlyTrend = [
    { month: "Jan", total: 320 },
    { month: "Feb", total: 410 },
    { month: "Mar", total: 380 },
    { month: "Apr", total: 500 },
    { month: "May", total: 460 },
    { month: "Jun", total: 540 },
    { month: "Jul", total: 420 },
  ];

  const categoryBars = [
    { category: "Food", amount: 400 },
    { category: "Transport", amount: 300 },
    { category: "Shopping", amount: 300 },
    { category: "Bills", amount: 200 },
  ];

  const burnRate = [
    { name: "Used", value: 68, fill: "#f97316" },
    { name: "Left", value: 32, fill: "rgba(255,255,255,0.1)" },
  ];

  const COLORS = [
    "#ff5a3d",
    "#fb7185",
    "#ef4444",
    "#f97316",
    "#facc15",
    "#a855f7",
    "#14b8a6",
    "#60a5fa",
  ];

  const recentTx = [
    { category: "Food", amount: 50, date: "2025-07-20" },
    { category: "Transport", amount: 30, date: "2025-07-21" },
    { category: "Shopping", amount: 80, date: "2025-07-22" },
  ];

  const totalSpend = 1250;
  const monthlyAvg = 420;
  const topCategory = "Food";
  const topCategoryDelta = 12;

  return (
    <div className={`min-h-[calc(100vh-64px)] p-6 text-white relative overflow-hidden ${theme.gradient} `}>
      {/* Background Glows */}
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] rounded-full bg-white/10 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] rounded-full bg-white/10 blur-[120px]" />

      <div className="relative z-10 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Total Spend" value={`₹${totalSpend.toLocaleString("en-IN")}`} sub="+8% vs last month" up />
          <KpiCard title="Top Category" value={topCategory} sub={`${topCategoryDelta}% of total`} up />
          <KpiCard title="Monthly Avg" value={`₹${monthlyAvg.toLocaleString("en-IN")}`} sub="-2% vs last 6m" up={false} />
          
          {/* Budget Burn */}
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-4 flex flex-col transition-transform hover:scale-[1.02]">
            <h3 className="text-sm font-medium text-white/70 mb-2">Budget Burn</h3>
            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={150}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="100%"
                  barSize={14}
                  data={burnRate}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar background dataKey="value" cornerRadius={14} clockWise />
                  <Legend iconSize={0} layout="vertical" verticalAlign="middle" wrapperStyle={{ display: "none" }} />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center mt-2 text-2xl font-bold">68%</p>
            <p className="text-center text-xs text-white/60">of budget used</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Area Trend */}
          <div className="xl:col-span-2 bg-white/15 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 transition-transform hover:scale-[1.01]">
            <h2 className="text-lg font-semibold mb-4">Monthly Spend Trend</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrend}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fb7185" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#fb7185" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="month" stroke="#ffffff90" />
                  <YAxis stroke="#ffffff90" />
                  <Tooltip contentStyle={{ background: "rgba(0,0,0,0.6)", border: "none", borderRadius: 8 }} />
                  <Area type="monotone" dataKey="total" stroke="#fb7185" fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 transition-transform hover:scale-[1.01]">
            <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
            <div className="h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, value }) => `${name} (${value})`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "rgba(0,0,0,0.6)", border: "none", borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bars + Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bars */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 transition-transform hover:scale-[1.01]">
            <h2 className="text-lg font-semibold mb-4">Spend by Category</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryBars}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="category" stroke="#ffffff90" />
                  <YAxis stroke="#ffffff90" />
                  <Tooltip contentStyle={{ background: "rgba(0,0,0,0.6)", border: "none", borderRadius: 8 }} />
                  <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                    {categoryBars.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white/15 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 transition-transform hover:scale-[1.01]">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/10">
                  <tr>
                    <th className="px-4 py-3 text-white/80">Category</th>
                    <th className="px-4 py-3 text-white/80">Amount</th>
                    <th className="px-4 py-3 text-white/80">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTx.map((row, i) => (
                    <tr key={i} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">{row.category}</td>
                      <td className="px-4 py-3">₹{row.amount}</td>
                      <td className="px-4 py-3">{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-right mt-3 text-white/70 text-xs">
              Showing last {recentTx.length} transactions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendAnalysis;

/* ----------------- KPI CARD ----------------- */
function KpiCard({ title, value, sub, up = true }) {
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-4 transition-transform hover:scale-[1.03]">
      <p className="text-sm text-white/70">{title}</p>
      <div className="flex items-end gap-2 mt-1">
        <h3 className="text-2xl font-bold">{value}</h3>
        {sub && (
          <span
            className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
              up ? "bg-white/10 text-emerald-300" : "bg-white/10 text-red-300"
            }`}
          >
            <Icon size={14} />
            {sub}
          </span>
        )}
      </div>
    </div>
  );
}
