import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientInfo } from "@/components/client-details/ClientInfo";
import { ActionButtons } from "@/components/client-details/ActionButtons";
import { TransactionsTable } from "@/components/client-details/TransactionsTable";

// Dados mockados
const mockClient = {
  name: "Maria Silva",
  address: "Rua das Flores, 123",
  phone: "(11) 98765-4321",
  totalPurchases: 1500.00,
  currentDebt: 350.00,
};

const mockTransactions = [
  {
    _id: "1",
    date: "2024-03-01",
    type: "purchase" as const,
    amount: 150.00,
  },
  {
    _id: "2",
    date: "2024-02-28",
    type: "payment" as const,
    amount: 100.00,
  },
  {
    _id: "3",
    date: "2024-02-25",
    type: "purchase" as const,
    amount: 200.00,
  },
];

const ClientDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [transactions] = useState(mockTransactions);

  const handleDelete = (transactionId: string) => {
    toast({
      title: "Sucesso",
      description: "Transação excluída com sucesso",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <ClientInfo client={mockClient} />
        <ActionButtons />

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
              transactions={transactions.filter((t) => t.type === "purchase")}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent value="payments" className="mt-6">
            <TransactionsTable
              transactions={transactions.filter((t) => t.type === "payment")}
              onDelete={handleDelete}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ClientDetails;