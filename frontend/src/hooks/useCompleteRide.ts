import { useAuth } from "@/context/AuthContext";
import axios from "axios";

export function useCompleteRide() {
  const { user } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const acceptRide = async (rideId: number, fare: number | null) => {
    if (!user?.cedula) throw new Error("Conductor no autenticado");
    const res = await axios.put(`${API_URL}/api/rides/accept`, {
      rideId,
      driverCedula: user.cedula,
      fare,
    });
    return res.data;
  };

  const completeRide = async (rideId: number) => {
    if (!user?.cedula) throw new Error("Conductor no autenticado");

    const res = await axios.put(`${API_URL}/api/rides/complete`, {
      rideId,
      driverCedula: user.cedula,
    });

    return res.data;
  };

  return { acceptRide, completeRide };
}
