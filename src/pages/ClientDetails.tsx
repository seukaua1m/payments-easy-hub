import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientInfo } from "@/components/client-details/ClientInfo";
import { ActionButtons } from "@/components/client-details/ActionButtons";
import { TransactionsTable } from "@/components/client-details/TransactionsTable";
import api from '@/lib/api';

const ClientDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [client, setClient] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await api.get(`/client/${id}`);
        setClient(response.data.client);
        setTransactions(response.data.transactions || []);
      } catch (error) {
        toast({
          title: "Erro ao carregar detalhes do cliente",
          description: "Não foi possível carregar os detalhes do cliente",
          variant: "destructive",
        });
      }
    };

    fetchClientDetails();
  }, [id, toast]);

  const handleDelete = (transactionId: string) => {
    toast({
      title: "Sucesso",
      description: "Transação excluída com sucesso",
    });
  };

  if (!client) {
    return <div>Carregando...</div>;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <ClientInfo client={client} />
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