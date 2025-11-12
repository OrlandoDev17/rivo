import { ServiceCard } from "@/components/common/ServiceCard";
import { SERVICES } from "@/lib/constants";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 items-center justify-center h-screen p-6">
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
