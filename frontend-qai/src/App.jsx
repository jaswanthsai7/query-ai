import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import FillExpenses from "./pages/FillExpenses";
import AIChatPage from "./pages/AIChatPage";
import SpendAnalysis from "./pages/SpendAnalysis";
import Hero from "./pages/Hero";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Hero />} />
        <Route path="AIChatPage" element={<AIChatPage />} />
        <Route path="SpendAnalysis" element={<SpendAnalysis />} />
        <Route path="FillExpenses" element={<FillExpenses />} />
      </Route>
    </Routes>
  );
}
``