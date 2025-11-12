/* eslint-disable @next/next/no-img-element */
"use client";

// Componentes
import { Button } from "@/components/common/Button";
import { Field } from "@/components/auth/Field";
import { motion } from "motion/react";

// Hooks
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Constantes
import { REGISTER_FIELDS } from "@/lib/constants";
import Link from "next/link";
import { fadeInUp } from "@/lib/animateVariants";

// Tipos
import { FormValues } from "@/lib/types";

export default function Register() {
  const {
    setFormValues,
    role,
    setRole,
    register,
    loading,
    error,
    success,
    isAuthenticated,
  } = useAuth();

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

  const handleRoleChange = (role: string) => {
    setRole(role);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues: FormValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register();
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
        <header className="flex flex-col items-center gap-4 mb-2">
          <img className="w-44" src="/rivo.svg" alt="Logo de Rivo" />
          <h1 className="text-3xl font-bold tracking-wide">Iniciar Sesión</h1>
        </header>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {REGISTER_FIELDS.map((field) => (
            <Field key={field.name} {...field} onChange={handleChange} />
          ))}
          <div className="grid grid-cols-2 gap-4">
            <button
              className={`py-3 rounded-lg transition-all cursor-pointer ${
                role === "CLIENT"
                  ? "bg-blue-500"
                  : "bg-electric-blue ring-2 ring-blue-500 hover:-translate-y-1"
              }`}
              type="button"
              onClick={() => handleRoleChange("CLIENT")}
            >
              Eres Cliente
            </button>
            <button
              className={`py-3 rounded-lg transition-all cursor-pointer ${
                role === "DRIVER"
                  ? "bg-blue-500"
                  : "bg-electric-blue ring-2 ring-blue-500 hover:-translate-y-1"
              }`}
              type="button"
              onClick={() => handleRoleChange("DRIVER")}
            >
              Eres Conductor
            </button>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm text-center">
              Registro exitoso
            </p>
          )}
          <Button
            disabled={loading}
            className="flex items-center justify-center text-center"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </form>
        <footer className="flex items-center justify-center">
          <p className="text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link
              className="text-blue-500 font-semibold hover:text-blue-600 transition"
              href="/login"
            >
              Inicia Sesión aqui
            </Link>
          </p>
        </footer>
      </motion.article>
    </main>
  );
}
