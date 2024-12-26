import { ArrowUpDown } from "lucide-react";

const clients = [
  {
    id: 1,
    name: "Maria Silva",
    total: 350.0,
    lastPayment: "2024-02-15",
  },
  {
    id: 2,
    name: "João Santos",
    total: 180.0,
    lastPayment: "2024-02-10",
  },
  {
    id: 3,
    name: "Ana Oliveira",
    total: 420.0,
    lastPayment: "2024-02-01",
  },
];

export const ClientsTable = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left p-4 font-medium text-gray-500">
              <button className="flex items-center gap-1 hover:text-gray-700">
                Nome
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </th>
            <th className="text-left p-4 font-medium text-gray-500">
              <button className="flex items-center gap-1 hover:text-gray-700">
                Valor Devido
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </th>
            <th className="text-left p-4 font-medium text-gray-500">
              <button className="flex items-center gap-1 hover:text-gray-700">
                Último Pagamento
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-4">{client.name}</td>
              <td className="p-4">R$ {client.total.toFixed(2)}</td>
              <td className="p-4">
                {new Date(client.lastPayment).toLocaleDateString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};