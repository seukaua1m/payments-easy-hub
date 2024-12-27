import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBills } from '@/hooks/useBills';

interface NewBillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewBillModal({ isOpen, onClose }: NewBillModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    dueDate: '',
  });

  const { addBill } = useBills();

  const handleValueChange = (e) => {
    const value = e.target.value.replace(',', '.');
    setFormData({ ...formData, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBill.mutateAsync({
        ...formData,
        value: parseFloat(formData.value),
        dueDate: new Date(formData.dueDate),
      });
      setFormData({ name: '', value: '', dueDate: '' }); // Limpar o formulário
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar conta:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Conta</DialogTitle>
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
              <label>Valor</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                <Input
                  type="text"
                  value={formData.value}
                  onChange={handleValueChange}
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <label>Data de Vencimento</label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
          </div>
          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}