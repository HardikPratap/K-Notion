import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Dashboard";
import BrainView from "./pages/Brain/BrainView";
import CreateBrain from "./pages/Brain/CreateBrain";
import AddLink from "./pages/Brain/AddLink";
import AddNote from "./pages/Brain/AddNote";
import PublicShare from "./pages/PublicShare";
import Navbar from "./components/layout/Navbar";
import { getToken } from "./utils/storage";
import {Routes,Route, Navigate} from 'react-router-dom'
import type { JSX } from "react";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = getToken();
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/brains" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/brains/new" element={<PrivateRoute><CreateBrain /></PrivateRoute>} />
        <Route path="/brains/:id" element={<PrivateRoute><BrainView /></PrivateRoute>} />
        <Route path="/brains/:id/add-link" element={<PrivateRoute><AddLink /></PrivateRoute>} />
        <Route path="/brains/:id/add-note" element={<PrivateRoute><AddNote /></PrivateRoute>} />

        <Route path="/s/:token" element={<PublicShare />} />

        <Route path="*" element={<div className="p-6">Not found</div>} />
      </Routes>
      
    </div>
  );
}