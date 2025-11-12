import Link from "next/link";

export interface ServiceCard {
  id?: string;
  title: string;
  description: string;
  action: "search" | "schedule" | "history";
  href?: string;
}

export function ServiceCard({ title, description, action, href }: ServiceCard) {
  return (
    <article className="flex flex-col gap-2 items-start bg-electric-blue p-4 rounded-lg shadow-xl shadow-dark-blue">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
      <div className="flex items-center gap-2 mt-2">
        {action === "search" || action === "history" ? (
          <Link
            className={`px-5 py-2 rounded-lg hover:-translate-y-1 transition-all ${
              action === "search"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
            href={href || ""}
          >
            {action === "search" && "Buscar Viaje"}
            {action === "history" && "Ver Historial"}
          </Link>
        ) : (
          <button className="px-5 py-2 rounded-lg bg-gray-500 hover:-translate-y-1 transition-all hover:bg-gray-600 cursor-pointer">
            Agendar Viaje
          </button>
        )}
      </div>
    </article>
  );
}
