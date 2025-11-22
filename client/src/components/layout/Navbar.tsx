import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../utils/storage";

export default function Navbar() {
  const token = getToken();
  const nav = useNavigate();

  const logout = () => { removeToken(); nav("/"); location.reload(); };

  return (
    <nav className="w-full border-b border-white/6 bg-surface px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-400 grid place-items-center font-bold">SB</div>
        <div className="hidden sm:block">SecondBrain</div>
      </Link>
      <div className="flex items-center gap-3">
        <Link to="/brains" className="text-sm text-muted hidden md:inline">Dashboard</Link>
        {!token ? (
          <>
            <Link to="/login" className="text-sm">Login</Link>
            <Link to="/signup" className="text-sm px-3 py-1 rounded-xl bg-[var(--accent)]">Sign up</Link>
          </>
        ) : (
          <button onClick={logout} className="text-sm px-3 py-1 rounded-xl border border-white/6">Logout</button>
        )}
      </div>
    </nav>
  );
}