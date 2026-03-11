"use client";

import { useState } from "react";
import supabase from "@/libs/supabaseClient";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else setMessage("Check your email to confirm your account!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else { setMessage("Logged in!"); onClose(); }
    }
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "#1a1a1a", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "400px", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: "white", fontSize: "20px", cursor: "pointer" }}>✕</button>
        
        <h2 style={{ color: "white", fontSize: "24px", fontWeight: "700", marginBottom: "24px", textAlign: "center" }}>
          {isSignUp ? "Create an account" : "Welcome back"}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #333", backgroundColor: "#2a2a2a", color: "white", fontSize: "14px", outline: "none" }}
          />
          <input
            type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #333", backgroundColor: "#2a2a2a", color: "white", fontSize: "14px", outline: "none" }}
          />

          {message && (
            <p style={{ color: message.includes("error") ? "#ef4444" : "#22c55e", fontSize: "14px", textAlign: "center" }}>
              {message}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ padding: "12px", borderRadius: "24px", border: "none", backgroundColor: "#22c55e", color: "black", fontWeight: "700", fontSize: "16px", cursor: "pointer", marginTop: "8px" }}
          >
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Log In"}
          </button>

          <p style={{ color: "#a3a3a3", textAlign: "center", fontSize: "14px" }}>
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <span onClick={() => setIsSignUp(!isSignUp)} style={{ color: "white", cursor: "pointer", textDecoration: "underline" }}>
              {isSignUp ? "Log in" : "Sign up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;