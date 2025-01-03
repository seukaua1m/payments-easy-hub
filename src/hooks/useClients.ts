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

  const addPurchase = useMutation({
    mutationFn: async (newPurchase) => {
      const response = await api.post(`/client/${newPurchase.clientId}/purchase`, newPurchase);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
    },
  });

  const addPayment = useMutation({
    mutationFn: async (newPayment) => {
      const response = await api.post(`/client/${newPayment.clientId}/payment`, newPayment);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
    },
  });

  return {
    clients,
    isLoading,
    addClient,
    addPurchase,
    addPayment,
  };
}