"use client";

import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SidebarItem from "./SidebarItem";
import Box from "./Box";
import UploadModal from "./UploadModal";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const routes = useMemo(() => [
    { icon: HiHome, label: "Home", active: pathname !== "/search", href: "/" },
    { icon: BiSearch, label: "Search", active: pathname === "/search", href: "/search" },
  ], [pathname]);

  return (
    <>
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
      <div style={{ display: "flex", flexDirection: "row", height: "100vh", width: "100vw", backgroundColor: "#000" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", backgroundColor: "#000", height: "100%", width: "300px", minWidth: "300px", padding: "8px" }}>
          <Box>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px 20px" }}>
              {routes.map((item) => (
                <SidebarItem key={item.label} {...item} />
              ))}
            </div>
          </Box>
          <Box className="overflow-y-auto h-full">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
              <p style={{ color: "#a3a3a3", fontSize: "14px", fontWeight: "600" }}>Your Library</p>
              <button
                onClick={() => setIsUploadOpen(true)}
                style={{ background: "none", border: "none", color: "#a3a3a3", cursor: "pointer", fontSize: "22px", display: "flex", alignItems: "center" }}
                title="Upload a song"
              >
                <AiOutlinePlus />
              </button>
            </div>
          </Box>
        </div>
        <main style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Sidebar;