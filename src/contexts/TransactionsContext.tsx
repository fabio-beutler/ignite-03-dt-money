import { ReactNode, useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { createContext } from 'use-context-selector';

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
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (
    transaction: Omit<Transaction, 'id' | 'createdAt'>
  ) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextType>(
  {} as TransactionsContextType
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        q: query,
        _sort: 'createdAt',
        _order: 'desc',
      },
    });
    setTransactions(response.data);
  }

  async function createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>) {
    const response = await api.post('/transactions', {
      ...transaction,
      createdAt: new Date(),
    });
    setTransactions((prevTransactions) => [response.data, ...prevTransactions]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
