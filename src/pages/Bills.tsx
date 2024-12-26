import { Layout } from "@/components/layout/Layout";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { PlusCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Dados mockados para exemplo
const mockBills = [
  {
    _id: '1',
    description: 'Conta de Luz',
    dueDate: '2024-03-20',
    value: 150.00,
    status: 'pending'
  },
  {
    _id: '2',
    description: 'Aluguel',
    dueDate: '2024-03-15',
    value: 1200.00,
    status: 'paid'
  },
  {
    _id: '3',
    description: 'Internet',
    dueDate: '2024-02-28',
    value: 99.90,
    status: 'overdue'
  }
];

const Bills = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Contas a Pagar</h1>
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Nova Conta
          </Button>
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
              {mockBills.map((bill) => (
                <TableRow key={bill._id}>
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