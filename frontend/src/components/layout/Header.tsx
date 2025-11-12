/* eslint-disable @next/next/no-img-element */

import { useAuth } from "@/context/AuthContext";
import { BellIcon } from "../Icons";

export function Header() {
  const { user } = useAuth();

  const firstLetterName = user?.name
    ?.split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <header className="flex justify-between items-center px-6 h-12">
      <picture>
        <img className="w-26" src="/rivo.svg" alt="Rivo" />
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
        <span className="size-10 flex items-center justify-center bg-electric-blue rounded-full font-semibold">
          {firstLetterName}
        </span>
      </div>
    </header>
  );
}
