import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed bottom-0 flex justify-center items-center w-full h-16 bg-electric-blue pt-3 pb-1 rounded-t-2xl">
      <ul className="flex items-center justify-evenly w-full">
        {NAV_ITEMS.map(({ id, title, href, icon: Icon }) => (
          <li key={id}>
            <Link
              href={href}
              className={`flex flex-col items-center transition-all ${
                isActive(href)
                  ? "text-blue-500 font-medium"
                  : "text-white font-light hover:text-sky-500"
              }`}
            >
              <Icon />
              <span>{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
