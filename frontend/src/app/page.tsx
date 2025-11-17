"use client";

import { ServiceCard } from "@/components/common/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { token, loading, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !loading && token === null) {
      router.push("/login");
    }
  }, [token, loading, isHydrated, router]);

  return (
    <main className="flex flex-col gap-4 justify-center items-center h-[calc(100vh-112px)] p-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold tracking-wide">
          ¿A donde te llevamos hoy?
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </main>
  );
}
