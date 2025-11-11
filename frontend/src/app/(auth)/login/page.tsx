/* eslint-disable @next/next/no-img-element */
"use client";

// Componentes
import { Button } from "@/components/common/Button";
import { Field } from "@/components/auth/Field";

// Constantes
import { LOGIN_FIELDS } from "@/lib/constants";
import Link from "next/link";

// Iconos

export default function Login() {
  return (
    <main className="flex items-center justify-center h-screen p-6">
      <article className="flex flex-col gap-6 w-full">
        <header className="flex flex-col items-center gap-4 mb-4">
          <img className="w-44" src="/rivo.svg" alt="Logo de Rivo" />
          <h1 className="text-3xl font-bold tracking-wide">Iniciar Sesión</h1>
        </header>
        <form className="flex flex-col gap-6 w-full">
          {LOGIN_FIELDS.map((field) => (
            <Field key={field.name} {...field} />
          ))}
          <Button className="justify-center">Iniciar Sesión</Button>
        </form>
        <footer className="flex items-center justify-center">
          <p className="text-sm">
            ¿No tienes una cuenta?{" "}
            <Link
              className="text-blue-500 font-semibold hover:text-blue-600 transition"
              href="/register"
            >
              Registrate aqui
            </Link>
          </p>
        </footer>
      </article>
    </main>
  );
}
