"use client";

import { ServiceCard } from "@/components/common/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return (
    <main className="flex flex-col gap-4 items-center h-screen p-6 mt-4">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold tracking-wide">
          ¿A donde te llevamos hoy?
        </h1>
        <p className="text-gray-500">
          Tu servicio de taxi profesional, rapido y seguro
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </main>
  );
}
