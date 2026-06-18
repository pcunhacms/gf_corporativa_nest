import { Link, useLocation } from "react-router-dom";
import type { User } from "../../types/auth";

type Props = {
  user: User | null;
  onLogout: () => void;
};

export function Sidebar({ user, onLogout }: Props) {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path;

  return (
    <aside className="w-64 h-screen border-r bg-white flex flex-col">

      {/* USER */}
      <div className="p-4 border-b">
        <p className="text-sm text-gray-500">Logado como</p>
        <p className="font-semibold truncate">
          {user?.email || "Usuário"}
        </p>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-2 space-y-1">

        <Link
          to="/dashboard"
          className={`block px-3 py-2 rounded ${
            isActive("/dashboard")
              ? "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/transactions"
          className={`block px-3 py-2 rounded ${
            isActive("/transactions")
              ? "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          💸 Transações
        </Link>

        <Link
          to="/categories"
          className={`block px-3 py-2 rounded ${
            isActive("/categories")
              ? "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          🗂 Categorias
        </Link>

      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="w-full text-red-500 hover:bg-red-50 px-3 py-2 rounded"
        >
          Sair
        </button>
      </div>

    </aside>
  );
}