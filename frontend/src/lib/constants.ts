import { ServiceCard } from "@/components/common/ServiceCard";
import {
  CalendarIcon,
  CarIcon,
  EyeIcon,
  HomeIcon,
  ProfileIcon,
  SmartphoneIcon,
  UserIcon,
  UserIdIcon,
} from "../components/Icons";
import type { Field, NavItem } from "./types";

export const LOGIN_FIELDS: Field[] = [
  {
    name: "cedula",
    label: "Cédula de Identidad",
    type: "tel",
    placeholder: "31332501",
    icon: UserIdIcon,
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "********",
    icon: EyeIcon,
  },
];

export const REGISTER_FIELDS: Field[] = [
  {
    name: "name",
    label: "Nombre Completo",
    type: "text",
    placeholder: "Orlando López",
    icon: UserIcon,
  },
  {
    name: "cedula",
    label: "Cédula de Identidad",
    type: "tel",
    placeholder: "31332501",
    icon: UserIdIcon,
  },
  {
    name: "phone",
    label: "Número de Telefono",
    type: "tel",
    placeholder: "04242860846",
    icon: SmartphoneIcon,
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "********",
    icon: EyeIcon,
  },
];

export const SERVICES: ServiceCard[] = [
  {
    id: "search-travel",
    title: "Solicitar un nuevo viaje",
    description:
      "Solicita un viaje para que un conductor te reciba en el lugar que indiques y llegues a tu destino",
    action: "search",
    href: "/travelPanel",
  },
  {
    id: "schedule-travel",
    title: "Agendar un viaje",
    description: "Reserva tu viaje con antelación para mayor comodidad",
    action: "schedule",
  },
  {
    id: "travel-history",
    title: "Historial de viajes",
    description: "Consulta los detalles de tus viajes anteriores",
    action: "history",
    href: "/travelHistory",
  },
];

export const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    title: "Inicio",
    href: "/",
    icon: HomeIcon,
  },
  {
    id: "travels",
    title: "Viajes",
    href: "/travelPanel",
    icon: CarIcon,
  },
  {
    id: "history",
    title: "Historial",
    href: "/travelHistory",
    icon: CalendarIcon,
  },
  {
    id: "profile",
    title: "Perfil",
    href: "/profile",
    icon: ProfileIcon,
  },
];
