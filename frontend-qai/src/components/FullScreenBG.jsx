import theme from "../constants/theme";

export default function FullScreenBG({ children }) {
  return (
    <div className={`fixed inset-0 flex items-center justify-center overflow-hidden  bg-[var(--bg)] bg-gradient-to-br ${theme.gradient}`}>
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm"
        // style={{
        //   backgroundImage:
        //     "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1920&q=80')",
        // }}
      ></div>
      <div className="relative z-10 w-full max-w-md p-4">{children}</div>
    </div>
  );
}
