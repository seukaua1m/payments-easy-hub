import { Button } from "@/components/ui/button";
import { Plus, DollarSign } from "lucide-react";

export const ActionButtons = () => {
  return (
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
  );
};