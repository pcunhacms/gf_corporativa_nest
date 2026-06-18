import { useEffect, useState } from "react";
import { getDashboard } from "../../api/dashboard";
import type { DashboardData } from "../../types/dashboard";

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await getDashboard();
        setData(response);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        carregando dashboard...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 text-red-500">
        erro ao carregar dados
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold">
        Dashboard financeiro
      </h1>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">

        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">Entradas</p>
          <p className="text-xl font-semibold text-green-600">
            R$ {data.totalIncome}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">Saídas</p>
          <p className="text-xl font-semibold text-red-600">
            R$ {data.totalExpense}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">Saldo</p>
          <p className="text-xl font-semibold">
            R$ {data.balance}
          </p>
        </div>

      </div>

      {/* TOP CATEGORIAS */}
      <div className="rounded-xl border p-4">
        <h2 className="font-semibold mb-3">
          Top categorias (saídas)
        </h2>

        <div className="space-y-2">
          {data.topCategories.map((cat) => (
            <div
              key={cat.name}
              className="flex justify-between text-sm"
            >
              <span>{cat.name}</span>
              <span className="font-medium">
                R$ {cat.total}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}