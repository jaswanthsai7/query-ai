import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import SplashScreen from "./components/SplashScreen";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <SplashScreen>
          <App />
        </SplashScreen>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
