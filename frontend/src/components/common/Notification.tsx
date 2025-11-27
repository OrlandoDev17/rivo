import { useEffect } from "react";

interface NotificationProps {
  children: React.ReactNode;
  action: "login" | "createRide" | "acceptRide" | "completeRide";
}

const actions = {
  login: "Inicio de Sesión exitoso",
  createRide: "Servicio solicitado exitosamente",
  acceptRide: "Servicio aceptado exitosamente",
  completeRide: "Servicio completado exitosamente",
};

export default function Notification({
  children,
  action,
  onClose,
}: NotificationProps & { onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <article
      className="flex flex-col justify-center items-center gap-2 absolute top-4 left-1/2 -translate-x-1/2 w-[90%] z-50 
    bg-dark-blue p-4 rounded-lg"
    >
      <h3 className="text-lg font-medium">{actions[action]}</h3>
      {children}
    </article>
  );
}
