"use client";

/* eslint-disable @next/next/no-img-element */

import { useAuth } from "@/context/AuthContext";
import { BellIcon } from "@/components/Icons";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const { token, logout, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const firstLetterName = user?.name
    ?.split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <header className="flex justify-between items-center px-6 h-16">
      <picture>
        <img className="w-24" src="/rivo.svg" alt="Rivo" />
      </picture>
      <div className="flex items-center gap-2">
        <BellIcon className="size-10 p-2 cursor-pointer hover:bg-electric-blue rounded-lg transition-colors" />
        {user?.photoUrl && (
          <img
            className="size-10 rounded-full"
            src={user.photoUrl}
            alt="User"
          />
        )}
        <button
          onClick={logout}
          className="size-10 flex items-center justify-center bg-electric-blue rounded-full font-semibold"
        >
          {firstLetterName}
        </button>
      </div>
    </header>
  );
}
