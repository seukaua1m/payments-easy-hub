import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Transaction {
  _id: string;
  date: string;
  type: 'purchase' | 'payment';
  amount: number;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export const TransactionsTable = ({ transactions, onDelete }: TransactionsTableProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Data</TableHead>
        <TableHead>Tipo</TableHead>
        <TableHead>Valor</TableHead>
        <TableHead>Ações</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {transactions?.map((transaction) => (
        <TableRow key={transaction._id}>
          <TableCell>
            {new Date(transaction.date).toLocaleDateString("pt-BR")}
          </TableCell>
          <TableCell>
            {transaction.type === "purchase" ? "Compra" : "Pagamento"}
          </TableCell>
          <TableCell>R$ {transaction.amount.toFixed(2)}</TableCell>
          <TableCell>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(transaction._id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);