import { Layout } from "@/components/layout/Layout";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { PlusCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const bills = [
  {
    id: 1,
    description: "Fornecedor A",
    dueDate: "2024-03-01",
    value: 1500.0,
    status: "pending",
  },
  {
    id: 2,
    description: "Aluguel",
    dueDate: "2024-02-28",
    value: 2000.0,
    status: "overdue",
  },
  {
    id: 3,
    description: "Energia",
    dueDate: "2024-03-10",
    value: 450.0,
    status: "paid",
  },
];

const Bills = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Contas a Pagar</h1>
          <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
            <PlusCircle className="w-5 h-5" />
            Nova Conta
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell>{bill.description}</TableCell>
                  <TableCell>
                    {new Date(bill.dueDate).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell>R$ {bill.value.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-sm font-medium",
                        {
                          "bg-yellow-100 text-yellow-800": bill.status === "pending",
                          "bg-red-100 text-red-800": bill.status === "overdue",
                          "bg-green-100 text-green-800": bill.status === "paid",
                        }
                      )}
                    >
                      {bill.status === "overdue" && <AlertCircle className="w-4 h-4" />}
                      {bill.status === "pending" && "Pendente"}
                      {bill.status === "overdue" && "Atrasado"}
                      {bill.status === "paid" && "Pago"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Bills;