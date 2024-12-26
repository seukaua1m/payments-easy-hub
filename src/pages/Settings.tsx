import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Configurações</h1>

        <div className="bg-white p-6 rounded-lg shadow-sm max-w-2xl">
          <form className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Informações da Loja
              </h2>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Nome da Loja</Label>
                  <Input id="storeName" placeholder="Digite o nome da sua loja" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerName">Nome do Proprietário</Label>
                  <Input id="ownerName" placeholder="Digite seu nome completo" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="Digite seu e-mail" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="Digite seu telefone" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Preferências do Sistema
              </h2>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Moeda</Label>
                  <select
                    id="currency"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="BRL">Real (R$)</option>
                    <option value="USD">Dólar (US$)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Formato de Data</Label>
                  <select
                    id="dateFormat"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>

            <Button className="w-full sm:w-auto">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;