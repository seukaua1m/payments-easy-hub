import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useClients } from '@/hooks/useClients';
import moment from 'moment-timezone';

interface NewPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: string;
}

export function NewPurchaseModal({ isOpen, onClose, clientId }: NewPurchaseModalProps) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: moment().tz("America/Sao_Paulo").format('YYYY-MM-DD'), // Data de hoje predefinida
  });

  const { addPurchase } = useClients();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPurchase.mutateAsync({
        clientId,
        ...formData,
        amount: parseFloat(formData.amount),
        date: moment.tz(formData.date, "America/Sao_Paulo").toDate(), // Usar horário de Brasília
      });
      setFormData({ description: '', amount: '', date: moment().tz("America/Sao_Paulo").format('YYYY-MM-DD') }); // Limpar o formulário
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar compra:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Compra</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label>Descrição</label>
              <Input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <label>Valor</label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>
            <div>
              <label>Data</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>
          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}