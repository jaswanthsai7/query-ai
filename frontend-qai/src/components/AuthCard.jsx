import React from "react";

export default function AuthCard({ children }) {
    return (
        <div className="w-full max-w-md bg-white/15 backdrop-blur-md rounded-3xl shadow-lg p-4 sm:p-6 border border-white/30 hover:shadow-2xl transition">
            {children}
        </div>

    );
}
