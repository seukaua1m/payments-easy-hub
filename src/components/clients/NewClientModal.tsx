import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useClients } from '@/hooks/useClients';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import MaskedInput from 'react-text-mask';

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  phone: string;
  address: string;
}

export function NewClientModal({ isOpen, onClose }: NewClientModalProps) {
  const { addClient } = useClients();
  const { control, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const formattedPhone = data.phone.replace(/\D/g, ''); // Remove formatação
      await addClient.mutateAsync({ 
        ...data, 
        phone: formattedPhone,
        totalPurchase: 0,
        totalPayments: 0,
        totalDebt: 0,
        lastPaymentDate: new Date().toISOString()
      });
      reset();
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Cliente</DialogTitle>
          <DialogDescription>Preencha os campos abaixo para adicionar um novo cliente.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label>Nome</label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} />}
              />
            </div>
            <div>
              <label>Telefone</label>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <MaskedInput
                    mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    {...field}
                    render={(ref, props) => (
                      <Input ref={ref} {...props} placeholder="Whatsapp" />
                    )}
                  />
                )}
              />
            </div>
            <div>
              <label>Endereço</label>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} />}
              />
            </div>
          </div>
          <Button type="submit">Salvar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}