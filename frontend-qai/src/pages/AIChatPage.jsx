import ChatBox from "../components/ChatBox";
import TableGrid from "../components/TableGrid";

const AIChatPage = () => {
  return (
    <div className="flex h-[calc(100vh-128px)] bg-gradient-to-br  text-white p-4 gap-4">
      {/* Left Chat Section */}
      <div className="w-1/2 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 overflow-hidden flex flex-col">
        <ChatBox />
      </div>

      {/* Right Data Grid Section */}
      <div className="w-1/2 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-4 overflow-auto">
        <TableGrid />
      </div>
    </div>
  );
};

export default AIChatPage;
