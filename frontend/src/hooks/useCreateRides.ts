import { useState } from "react";
import axios from "axios";
import type { RideResponse, RidePayload } from "@/lib/types";

export const useCreateRides = () => {
  const [rides, setRides] = useState<RideResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const createRide = async (payload: RidePayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post<RideResponse>(
        `${API_URL}/api/rides`,
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
