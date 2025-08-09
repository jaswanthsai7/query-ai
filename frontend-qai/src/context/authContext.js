"use client";

import { signIn } from "@/services/authService";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";


const DEMO_CREDENTIALS = {
  email: "guest@demo.com",
  password: "guest123",
};

const AuthContext = createContext(undefined);

const defaultAuthState = {
  token: null,
  userId: "guest",
  user: { Name: "Guest", Email: DEMO_CREDENTIALS.email },
  isDemo: true,
};

function safeReadAuth() {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function isExpired(jwt) {
  try {
    const [, payloadB64] = jwt.split(".");
    const payload = JSON.parse(atob(payloadB64));
    const now = Math.floor(Date.now() / 1000);
    return typeof payload.exp === "number" && payload.exp <= now;
  } catch {
    return true; // treat malformed as expired
  }
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(defaultAuthState);
  const [loading, setLoading] = useState(true);

  const persist = useCallback((state) => {
    setAuth(state);
    if (typeof window !== "undefined") {
      localStorage.setItem("auth", JSON.stringify(state));
    }
  }, []);

  const clear = useCallback(() => {
    setAuth(defaultAuthState);
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth");
    }
  }, []);

  const autoLoginDemo = useCallback(async () => {
    try {
      const { token, user } = await signIn(
        DEMO_CREDENTIALS.email,
        DEMO_CREDENTIALS.password
      );
      const demoState = {
        token,
        userId: user.QueryId,
        user,
        isDemo: user.Email === DEMO_CREDENTIALS.email,
      };
      persist(demoState);
    } catch (error) {
      console.error("Demo login failed:", error);
      clear();
    } finally {
      setLoading(false);
    }
  }, [persist, clear]);

  // Initial rehydrate
  useEffect(() => {
    const saved = safeReadAuth();
    if (saved?.token && !isExpired(saved.token)) {
      setAuth(saved);
      setLoading(false);
    } else if (saved?.token && isExpired(saved.token)) {
      clear();
      autoLoginDemo();
    } else {
      autoLoginDemo();
    }
  }, [autoLoginDemo, clear]);

  // Cross-tab sync
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "auth") {
        const next = safeReadAuth();
        if (next) {
          setAuth(next);
        } else {
          setAuth(defaultAuthState);
        }
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const login = useCallback(
    ({ token, user }) => {
      const updated = {
        token,
        userId: user.QueryId,
        user,
        isDemo: user.Email === DEMO_CREDENTIALS.email,
      };
      persist(updated);
    },
    [persist]
  );

  const logout = useCallback(async () => {
    clear();
    await autoLoginDemo();
  }, [autoLoginDemo, clear]);

  const value = useMemo(
    () => ({
      ...auth,
      auth,
      isAuthenticated: !!auth.token && !isExpired(auth.token),
      login,
      logout,
    }),
    [auth, login, logout]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-sm text-gray-600">
        Checking authentication...
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
