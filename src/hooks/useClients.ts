import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

interface Client {
  _id: string;
  name: string;
  phone: string;
  address: string;
  totalPurchase: number;
  totalPayments: number;
  totalDebt: number;
  lastPaymentDate: string;
}

export function useClients() {
  const queryClient = useQueryClient();

  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await api.get('/client');
      return response.data;
    },
  });

  const addClient = useMutation({
    mutationFn: async (newClient: Omit<Client, '_id'>) => {
      const response = await api.post('/client/add', newClient);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });

  return {
    clients,
    isLoading,
    addClient,
  };
}