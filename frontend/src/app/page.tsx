import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center gap-4 h-screen">
      <Link className="px-4 py-2 bg-blue-500 rounded-lg text-lg" href="/login">
        Login
      </Link>
      <Link
        className="px-4 py-2 bg-blue-500 rounded-lg text-lg"
        href="/register"
      >
        Register
      </Link>
    </div>
  );
}
