import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Plus, DollarSign, Trash2 } from "lucide-react";

// Substitua pela URL do seu backend
const API_URL = "http://localhost:3000/api";

const ClientDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");

  const { data: client, isLoading } = useQuery({
    queryKey: ["client", id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/clients/${id}`);
      if (!response.ok) {
        throw new Error("Erro ao carregar dados do cliente");
      }
      return response.json();
    },
  });

  const { data: transactions } = useQuery({
    queryKey: ["transactions", id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/clients/${id}/transactions`);
      if (!response.ok) {
        throw new Error("Erro ao carregar transações");
      }
      return response.json();
    },
  });

  const handleDelete = async (transactionId: string) => {
    try {
      const response = await fetch(
        `${API_URL}/transactions/${transactionId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Transação excluída com sucesso",
        });
      } else {
        throw new Error("Erro ao excluir transação");
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir transação",
        variant: "destructive",
      });
    }
  };

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
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {client?.name}
          </h1>
          <div className="mt-2 text-gray-600">
            <p>{client?.address}</p>
            <p>{client?.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total de Compras</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                R$ {client?.totalPurchases.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dívida Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                R$ {client?.currentDebt.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nova Compra
          </Button>
          <Button className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Novo Pagamento
          </Button>
          <Button variant="secondary" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Pagamento Total
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="purchases">Compras</TabsTrigger>
            <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <TransactionsTable
              transactions={transactions}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent value="purchases" className="mt-6">
            <TransactionsTable
              transactions={transactions?.filter((t) => t.type === "purchase")}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent value="payments" className="mt-6">
            <TransactionsTable
              transactions={transactions?.filter((t) => t.type === "payment")}
              onDelete={handleDelete}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

const TransactionsTable = ({ transactions, onDelete }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Data</TableHead>
        <TableHead>Tipo</TableHead>
        <TableHead>Valor</TableHead>
        <TableHead>Ações</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {transactions?.map((transaction) => (
        <TableRow key={transaction._id}>
          <TableCell>
            {new Date(transaction.date).toLocaleDateString("pt-BR")}
          </TableCell>
          <TableCell>
            {transaction.type === "purchase" ? "Compra" : "Pagamento"}
          </TableCell>
          <TableCell>R$ {transaction.amount.toFixed(2)}</TableCell>
          <TableCell>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(transaction._id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ClientDetails;