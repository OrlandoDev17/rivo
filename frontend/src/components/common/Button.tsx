export function Button({
  children,
  className,
  disabled,
}: {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`flex items-center gap-2 px-5 py-3 bg-blue-500 rounded-lg font-medium hover:bg-blue-600 hover:-translate-y-1 transition-all cursor-pointer ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }${className}`}
    >
      {children}
    </button>
  );
}
