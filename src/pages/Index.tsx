import { Layout } from "@/components/layout/Layout";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ClientsTable } from "@/components/dashboard/ClientsTable";
import { Users, AlertCircle, DollarSign, UserPlus } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-96">
            <SearchBar />
          </div>
          <button className="w-full sm:w-auto px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
            <UserPlus className="w-5 h-5" />
            Novo Cliente
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatsCard
            title="Total de Clientes"
            value="48"
            icon={Users}
          />
          <StatsCard
            title="Clientes Atrasados"
            value="12"
            icon={AlertCircle}
            variant="danger"
          />
          <StatsCard
            title="Total em Dívidas"
            value="R$ 4.250,00"
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
      </div>
    </Layout>
  );
};

export default Index;