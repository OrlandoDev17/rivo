import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { PendingRide } from "@/lib/types";

export function useDriverHistory() {
  const [historyRides, setHistoryRides] = useState<PendingRide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/rides/history`, {
        params: { driverCedula: user?.cedula },
      });
      setHistoryRides(res.data.rides);
    } catch (err) {
      setError("Error al cargar historial de viajes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.cedula) fetchHistory();
  }, [user?.cedula]);

  return { fetchHistory, historyRides, loading, error };
}
