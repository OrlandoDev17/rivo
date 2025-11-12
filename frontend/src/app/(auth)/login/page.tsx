/* eslint-disable @next/next/no-img-element */
"use client";

// Componentes
import { Button } from "@/components/common/Button";
import { Field } from "@/components/auth/Field";
import { motion } from "motion/react";

// Constantes
import { LOGIN_FIELDS } from "@/lib/constants";
import Link from "next/link";
import { fadeInUp } from "@/lib/animateVariants";

// Hooks
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Iconos

export default function Login() {
  const { login, loading, error, success, isAuthenticated, role } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (success && isAuthenticated) {
      if (role === "CLIENT") {
        router.push("/");
      }

      if (role === "DRIVER") {
        router.push("/driverPanel");
      }
    }
  }, [success, isAuthenticated, role, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData);

    const credentials = {
      cedula: formValues.cedula.toString(),
      password: formValues.password.toString(),
    };

    login(credentials.cedula, credentials.password);
  };

  return (
    <main className="flex items-center justify-center h-screen p-6">
      <motion.article
        className="flex flex-col gap-6 w-full max-w-md"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5 }}
      >
        <header className="flex flex-col items-center gap-4 mb-4">
          <img className="w-44" src="/rivo.svg" alt="Logo de Rivo" />
          <h1 className="text-3xl font-bold tracking-wide">Iniciar Sesión</h1>
        </header>
        <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
          {LOGIN_FIELDS.map((field) => (
            <Field key={field.name} {...field} />
          ))}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm text-center">
              Inicio de sesión exitoso
            </p>
          )}
          <Button className="flex justify-center items-center text-center">
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {loading ? "Iniciando Sesión..." : "Iniciar Sesión"}
          </Button>
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
      </motion.article>
    </main>
  );
}
