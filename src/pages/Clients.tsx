import { Layout } from "@/components/layout/Layout";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { ClientsTable } from "@/components/dashboard/ClientsTable";
import { UserPlus } from "lucide-react";
import { useState } from 'react';
import { NewClientModal } from '@/components/clients/NewClientModal';
import { useClients } from '@/hooks/useClients';

const Clients = () => {
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const { clients, isLoading } = useClients();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Layout>
      <div className="space-y-6">
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

        {clients.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-8">
            <img src="/no-clients.svg" alt="No clients" className="w-64 h-64 mb-4" />
            <p className="text-gray-500">Você ainda não registrou nenhum cliente</p>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Lista de Clientes
            </h2>
            <ClientsTable />
          </div>
        )}

        <NewClientModal 
          isOpen={isNewClientModalOpen}
          onClose={() => setIsNewClientModalOpen(false)}
        />
      </div>
    </Layout>
  );
};

export default Clients;