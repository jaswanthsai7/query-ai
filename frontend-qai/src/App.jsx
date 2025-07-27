import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import FillExpenses from "./pages/FillExpenses";
import AIChatPage from "./pages/AIChatPage";
import SpendAnalysis from "./pages/SpendAnalysis";
import Hero from "./pages/Hero";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Hero />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="AIChatPage" element={<AIChatPage />} />
        <Route path="SpendAnalysis" element={<SpendAnalysis />} />
        <Route path="FillExpenses" element={<FillExpenses />} />
      </Route>
    </Routes>
  );
}
