import { Layout } from "@/components/layout/Layout";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { PlusCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Substitua pela URL do seu backend
const API_URL = 'http://localhost:3000/api';

const fetchBills = async () => {
  const response = await fetch(`${API_URL}/bills`);
  if (!response.ok) {
    throw new Error('Erro ao carregar contas');
  }
  return response.json();
};

const Bills = () => {
  const { toast } = useToast();
  const { data: bills, isLoading } = useQuery({
    queryKey: ['bills'],
    queryFn: fetchBills,
    meta: {
      onError: (error: Error) => {
        toast({
          title: "Erro",
          description: "Não foi possível carregar as contas. Tente novamente.",
          variant: "destructive",
        });
        console.error('Erro ao carregar contas:', error);
      },
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
          <div className="text-gray-500">Carregando...</div>
        </div>
      </Layout>
    );
  }

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
              {bills?.map((bill) => (
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