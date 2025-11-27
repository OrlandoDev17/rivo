import { ComponentType } from "react";

// Campo del formulario

export interface Field {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  value?: string;
  icon?: ComponentType<Icon>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Icono
export interface Icon {
  className?: string;
}

// Tipos de el contexto de autenticación
export interface FormValues {
  cedula: string;
  name: string;
  phone: string;
  password: string;
}

/** Representa un usuario en el sistema */
export interface User {
  cedula: string;
  name: string;
  phone?: string;
  role?: Role;
  email?: string;
  address?: string;
  photoUrl?: string;
  createdAt?: string;
}

export interface AuthContextType {
  token: string | null;
  user: AppUser;
  isAuthenticated: boolean;
  isHydrated: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
  formValues: FormValues;
  role: Role | string;
  logoutSuccess: boolean;
  setLogoutSuccess: (success: boolean) => void;
  setFormValues: (
    values: FormValues | ((prevValues: FormValues) => FormValues)
  ) => void;
  setRole: (role: Role | string) => void;
  login: (cedula: string, password: string) => Promise<void>;
  register: () => Promise<void>;
  logout: () => void;
}

/** Roles de usuario en la aplicación */
export type Role = "CLIENT" | "DRIVER" | "ADMIN";

/** Tipo para el usuario de la aplicación */
export type AppUser = User | null;

// Tipos de la barra de navegación
export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon: ComponentType<Icon>;
}

export interface TravelOptions {
  id?: string;
  title: string;
  icon: ComponentType<Icon>;
}

export interface PaymentMethod {
  id?: string;
  title: string;
  icon: ComponentType<Icon>;
}

export interface PendingRide {
  id: string;
  origin: string;
  destination: string;
  originLat?: number;
  originLng?: number;
  destinationLat?: number;
  destinationLng?: number;
  travelOption: string;
  paymentMethod: string;
  scheduled: boolean;
  scheduledAt?: string | null;
  requestedAt?: number;
  status:
    | "PENDING"
    | "ACCEPTED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED"
    | "ASSIGNED";
  note?: string;
  fare?: number;
  cliente: {
    cedula: string;
    name: string;
    phone: string;
    address?: string;
    photoUrl?: string;
    totalRides?: number;
  };
}
