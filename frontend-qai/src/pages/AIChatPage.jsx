import { useState, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import TableGrid from "../components/TableGrid";
import ShimmerLoader from "../features/ShimmerLoader";

const AIChatPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]); // Expense data for the grid

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-128px)] bg-gradient-to-br text-white p-4 gap-4">
      {/* Left Chat Section */}
      <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 overflow-hidden flex flex-col">
        {loading ? (
          <div className="p-4 space-y-4">
            <ShimmerLoader className="h-6 w-1/3" />
            <ShimmerLoader className="h-40 w-full" />
            <ShimmerLoader className="h-8 w-2/3" />
          </div>
        ) : (
          <ChatBox onData={setData} />
        )}
      </div>

      {/* Right Data Grid Section */}
      <div className="w-full md:w-2/3 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-4 flex flex-col overflow-hidden">
        {loading ? (
          <div className="space-y-4">
            <ShimmerLoader className="h-6 w-1/2" />
            <ShimmerLoader className="h-32 w-full" />
            <ShimmerLoader className="h-32 w-full" />
          </div>
        ) : (
          <TableGrid data={data} />
        )}
      </div>
    </div>
  );
};

export default AIChatPage;
