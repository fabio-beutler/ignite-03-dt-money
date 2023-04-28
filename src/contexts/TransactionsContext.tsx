import { ReactNode, createContext, useEffect, useState } from 'react';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  amount: number;
  createdAt: string;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextType {
  transactions: Transaction[];
}

export const TransactionsContext = createContext<TransactionsContextType>(
  {} as TransactionsContextType
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/transactions')
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
