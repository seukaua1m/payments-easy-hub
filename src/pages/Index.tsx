import { Layout } from "@/components/layout/Layout";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ClientsTable } from "@/components/dashboard/ClientsTable";
import { Users, AlertCircle, DollarSign, UserPlus } from "lucide-react";
import { NewClientModal } from '@/components/clients/NewClientModal';
import { useState } from 'react';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useStoreSettings } from "@/hooks/useStoreSettings";

const Index = () => {
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const { data, isLoading } = useDashboardData();
  const { storeName } = useStoreSettings();

  if (isLoading) {
    return <div>Carregando...</div>;
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{storeName || 'Minha Loja'}</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-96">
            <SearchBar />
          </div>
          <button 
            onClick={() => setIsNewClientModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            Novo Cliente
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatsCard
            title="Total de Clientes"
            value={data.clientsCount.toString()}
            icon={Users}
          />
          <StatsCard
            title="Clientes Atrasados"
            value={data.latePaymentsCount.toString()}
            icon={AlertCircle}
            variant="danger"
          />
          <StatsCard
            title="Total em Dívidas"
            value={`R$ ${data.totalDebt.toFixed(2)}`}
            icon={DollarSign}
            variant="warning"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Clientes Recentes
          </h2>
          <ClientsTable />
        </div>

        <NewClientModal
        isOpen={isNewClientModalOpen}
          onClose={() => setIsNewClientModalOpen(false)}
        />
      </div>
    </Layout>
  );
};

export default Index;