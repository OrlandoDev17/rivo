"use client";

import { AuthProvider } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

export default function RouterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideComponents = pathname === "/login" || pathname === "/register";

  return (
    <>
      <AuthProvider>
        {!hideComponents && <Header />}
        {children}
        {!hideComponents && <BottomNav />}
      </AuthProvider>
    </>
  );
}
