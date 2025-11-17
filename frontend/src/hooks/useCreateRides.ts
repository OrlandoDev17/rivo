import { useState } from "react";
import axios from "axios";

type RidePayload = {
  origin: string;
  destination: string;
  clientCedula: string | undefined;
  paymentMethod: string;
  travelOptions: string;
  scheduled: boolean;
  scheduledAt: string | null;
  originLat?: number | null;
  originLng?: number | null;
  destinationLat?: number | null;
  destinationLng?: number | null;
};

type RideResponse = {
  message: string;
  ride: {
    id: string;
    status: string;
    origin: string;
    destination: string;
    travelOptions: string;
    paymentMethod: string;
    scheduled: boolean;
    scheduledAt: string | null;
    requestedAt?: number;
    cliente: {
      cedula: string;
      name: string;
      phone: string;
      address: string;
    };
    conductor: {
      cedula: string;
      name: string;
      phone: string;
    } | null;
  };
};

export const useCreateRides = () => {
  const [rides, setRides] = useState<RideResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRide = async (payload: RidePayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post<RideResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rides`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setRides((prev) => [...prev, res.data]);
      console.log("Viaje creado con exito", res.data);
      return res.data;
    } catch (error) {
      console.error("Error al crear el viaje:", error);
      const errorMessage =
        error && typeof error === "object" && "response" in error
          ? (error as { response: { data?: { message?: string } } }).response
              ?.data?.message
          : "Error al crear el viaje";
      setError(errorMessage || "Error al crear el viaje");
    } finally {
      setLoading(false);
    }
  };

  return { createRide, loading, error, rides };
};
