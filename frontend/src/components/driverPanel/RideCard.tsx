import { PendingRide } from "@/lib/types";
import { UserIcon, LocationIcon } from "@/components/Icons";

interface RideCardProps {
  ride: PendingRide;
  onAccept: (rideId: string) => void;
}

export default function RideCard({ ride, onAccept }: RideCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="p-5 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400">
              <UserIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {ride.cliente.name}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Pasajero • {ride.cliente.totalRides || 0} viajes
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {ride.fare ? `$${ride.fare.toFixed(2)}` : "Por definir"}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {ride.paymentMethod}
            </span>
          </div>
        </div>

        {/* Route Visualizer */}
        <div className="relative pl-4 space-y-6">
          {/* Vertical Line */}
          <div className="absolute left-[23px] top-3 bottom-3 w-0.5 bg-zinc-200 dark:bg-zinc-700 -z-10"></div>

          {/* Pickup */}
          <div className="relative flex items-start gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-zinc-900 dark:border-zinc-100 bg-white dark:bg-zinc-900 mt-1 shrink-0 z-10"></div>
            <div>
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-0.5">
                Recogida
              </p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium leading-snug">
                {ride.origin}
              </p>
            </div>
          </div>

          {/* Dropoff */}
          <div className="relative flex items-start gap-3">
            <div className="mt-0.5 shrink-0 z-10 bg-white dark:bg-zinc-900">
              <LocationIcon className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-0.5">
                Destino
              </p>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 font-medium leading-snug">
                {ride.destination}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-between gap-4">
        <div className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="font-medium">{ride.travelOption}</span>
          </div>
          {ride.scheduled && (
            <>
              <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700 self-center"></div>
              <div className="flex items-center gap-1.5">
                <span className="font-medium">Programado</span>
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => onAccept(ride.id)}
          className="bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black px-6 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
