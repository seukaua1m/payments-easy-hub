import { Layout } from "@/components/layout/Layout";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { ClientsTable } from "@/components/dashboard/ClientsTable";
import { UserPlus } from "lucide-react";
import { useState } from 'react';
import { NewClientModal } from '@/components/clients/NewClientModal';

const Clients = () => {
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
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

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Lista de Clientes
          </h2>

          <NewClientModal 
          isOpen={isNewClientModalOpen}
          onClose={() => setIsNewClientModalOpen(false)}
        />
        
          <ClientsTable />
        </div>
      </div>
    </Layout>

    
  );
};

export default Clients;