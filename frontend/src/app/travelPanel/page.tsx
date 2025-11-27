"use client";

import { LocationIcon, TargetIcon } from "@/components/Icons";
import { TravelMap } from "@/components/travel/TravelMap";
import { PAYMENT_METHODS, TRAVEL_OPTIONS } from "@/lib/constants";
import { useState } from "react";
import { useCreateRides } from "@/hooks/useCreateRides";
import { useAuth } from "@/context/AuthContext";
import Notification from "@/components/common/Notification";

export default function TravelPanel() {
  // Formulario
  const [travelOption, setTravelOption] = useState<string>("ONE_WAY");
  const [paymentMethod, setPaymentMethod] = useState<string>("CASH");

  // Mapa
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [activeField, setActiveField] = useState<"origin" | "destination">(
    "origin"
  );

  // Hooks
  const { createRide, loading, error } = useCreateRides();
  const { user } = useAuth();

  const handlePaymentMethod = (method: string | undefined) => {
    if (!method) return;
    setPaymentMethod(method);
  };

  const handleTravelOption = (option: string | undefined) => {
    if (!option) return;
    setTravelOption(option);
  };

  const [showNotification, setShowNotification] = useState(false);

  // Funcion para crear el viaje
  const handleSubmit = async () => {
    await createRide({
      origin: origin,
      destination: destination,
      clientCedula: user?.cedula,
      paymentMethod: paymentMethod,
      travelOptions: travelOption,
      scheduled: false,
      scheduledAt: null,
    });
    setShowNotification(true);
  };

  const isDisabled = () => {
    return !origin || !destination || !paymentMethod || !travelOption;
  };

  return (
    <main className="flex flex-col gap-4 relative">
      {showNotification && (
        <Notification
          action="createRide"
          onClose={() => setShowNotification(false)}
        >
          <p className="text-sm text-center text-gray-300">
            Un conductor se pondra en contacto contigo en un momento.
          </p>
        </Notification>
      )}
      <TravelMap
        onChangeOrigin={setOrigin}
        onChangeDestination={setDestination}
      />
      <section className="flex flex-col gap-4 px-4">
        <form className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 relative">
            <input
              className="px-4 py-3 pr-10 bg-electric-blue rounded-lg"
              type="text"
              name="origin"
              placeholder="Ubicación Actual"
              value={origin}
              onFocus={() => setActiveField("origin")}
              onChange={(e) => setOrigin(e.target.value)}
            />
            <button className="absolute bottom-0 -translate-y-1/2 right-2">
              <TargetIcon className="size-6 hover:text-dark-blue transition-colors" />
            </button>
          </label>
          <label className="flex flex-col gap-1 relative">
            <input
              className="px-4 py-3 pr-10 bg-electric-blue rounded-lg"
              type="text"
              name="destination"
              placeholder="¿A donde vas?"
              value={destination}
              onFocus={() => setActiveField("destination")}
              onChange={(e) => setDestination(e.target.value)}
            />
            <LocationIcon className="size-6 absolute bottom-0 -translate-y-1/2 right-2" />
          </label>
        </form>
        <h3 className="text-lg font-medium">Opciones de viaje</h3>
        <div className="grid grid-cols-2 gap-4">
          {TRAVEL_OPTIONS.map(({ id, title, icon: Icon }) => (
            <button
              onClick={() => handleTravelOption(id)}
              className={`flex flex-col items-center rounded-xl py-2 transition-colors ${
                travelOption === id ? "bg-blue-500" : "bg-blue-500/20"
              }`}
              key={id}
            >
              <Icon className="size-8" />
              <span className="font-medium">{title}</span>
            </button>
          ))}
        </div>
        <h3 className="text-lg font-medium">Metodo de pago</h3>
        <div className="grid grid-cols-3 gap-2">
          {PAYMENT_METHODS.map(({ id, title, icon: Icon }) => (
            <button
              onClick={() => handlePaymentMethod(id)}
              className={`flex flex-col items-center rounded-xl py-2 transition-colors ${
                paymentMethod === id ? "bg-blue-500" : "bg-blue-500/20"
              }`}
              key={id}
            >
              <Icon className="size-8" />
              <span className="font-medium">{title}</span>
            </button>
          ))}
        </div>
        <div className="mt-1">
          <button
            onClick={handleSubmit}
            disabled={loading || isDisabled()}
            className="w-full py-3 bg-blue-500 rounded-lg text-lg font-medium hover:-translate-y-1 hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {loading ? "Solicitando viaje..." : "Solicitar Viaje"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </section>
    </main>
  );
}
