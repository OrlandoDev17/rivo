import {
  EyeIcon,
  SmartphoneIcon,
  UserIcon,
  UserIdIcon,
} from "../components/Icons";
import type { Field } from "./types";

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
