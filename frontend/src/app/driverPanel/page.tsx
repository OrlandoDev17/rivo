"use client";

import { usePendingRides } from "@/hooks/usePendingRides";
import { useDriverSocket } from "@/hooks/useDriverSocket";
import { useDriverHistory } from "@/hooks/useDriverHistory";
import RideCard from "@/components/driverPanel/RideCard";

export default function DriverPanel() {
  const { fetchRides, rides, loading, error } = usePendingRides();

  const { fetchHistory } = useDriverHistory();

  useDriverSocket(() => {
    fetchRides();
    fetchHistory();
  });
s
  const handleAcceptRide = (rideId: string) => {
    console.log("Accepting ride:", rideId);
    // TODO: Implement accept ride logic
  };

  return (
    <main className="flex flex-col gap-6 max-w-7xl mx-auto w-full mt-8 px-4 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Panel de Conductor
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            Gestiona tus viajes y ganancias
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            En línea
          </span>
        </div>
      </header>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Solicitudes Disponibles
          </h2>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            {rides.length}
          </span>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/30 text-sm">
            {error}
          </div>
        )}

        {!loading && rides.length === 0 && (
          <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-700">
            <div className="mx-auto w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-400"
              >
                <path d="M19 14c1.49-1.28 3-1.55 3-2.48a2.63 2.63 0 0 0-2.7-2.48 2.57 2.57 0 0 0-2.55 2.48c0 2.18 3.92 4.58 4.9 5.48C20.67 17.9 20 18 20 18a2 2 0 1 1-2-2 2 2 0 0 1 2 2z" />
                <path d="M16 12h-1" />
                <path d="M11 12H3" />
                <path d="M3.5 12a5.5 5.5 0 0 1 5.5-5.5C11.5 6.5 14 9 14 12v0a5.5 5.5 0 0 1-5.5 5.5H6" />
              </svg>
            </div>
            <p className="text-zinc-900 dark:text-zinc-100 font-medium">
              No hay viajes disponibles
            </p>
            <p className="text-zinc-500 text-sm mt-1">
              Espera un momento, las solicitudes aparecerán aquí.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} onAccept={handleAcceptRide} />
          ))}
        </div>
      </section>
    </main>
  );
}
