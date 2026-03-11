"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import AuthModal from "./AuthModal";

const Header = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 24px", backgroundColor: "rgba(0,0,0,0.4)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button onClick={() => router.back()} style={{ background: "rgba(0,0,0,0.4)", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", fontSize: "20px" }}>
            <RxCaretLeft />
          </button>
          <button onClick={() => router.forward()} style={{ background: "rgba(0,0,0,0.4)", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", fontSize: "20px" }}>
            <RxCaretRight />
          </button>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => router.push("/")} style={{ background: "white", border: "none", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "18px" }}>
              <HiHome style={{ color: "black" }} />
            </button>
            <button onClick={() => router.push("/search")} style={{ background: "white", border: "none", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "18px" }}>
              <BiSearch style={{ color: "black" }} />
            </button>
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: "400px", margin: "0 24px", position: "relative" }}>
          <BiSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#a3a3a3", fontSize: "18px" }} />
          <input type="text" placeholder="What do you want to listen to?"
            style={{ width: "100%", padding: "10px 12px 10px 36px", backgroundColor: "white", border: "none", borderRadius: "20px", fontSize: "14px", outline: "none", color: "black", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{ background: "none", border: "none", color: "white", fontWeight: "600", cursor: "pointer", fontSize: "14px", padding: "8px 16px", borderRadius: "20px" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            onMouseLeave={e => (e.currentTarget.style.background = "none")}
          >
            Sign up
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{ background: "white", border: "none", color: "black", fontWeight: "700", cursor: "pointer", fontSize: "14px", padding: "8px 24px", borderRadius: "20px" }}
          >
            Log in
          </button>
          <FaUserCircle style={{ color: "#a3a3a3", fontSize: "32px", cursor: "pointer" }} />
        </div>
      </div>
    </>
  );
};

export default Header;