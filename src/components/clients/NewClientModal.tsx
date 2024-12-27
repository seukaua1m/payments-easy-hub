import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useClients } from '@/hooks/useClients';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewClientModal({ isOpen, onClose }: NewClientModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  
  const { addClient } = useClients();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedPhone = formData.phone.replace(/\D/g, ''); // Remove formatação
      await addClient.mutateAsync({ 
        ...formData, 
        phone: formattedPhone,
        totalPurchase: 0,
        totalPayments: 0,
        totalDebt: 0,
        lastPaymentDate: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Cliente </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
            <label>Nome</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label>Telefone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Whatsapp"
              />
            </div>
            <div>
              <label>Endereço</label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>
          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
