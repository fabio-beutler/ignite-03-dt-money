import { useContext } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext';

export function useTransactionsContext() {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error('useTransactionsContext must be used within a TransactionsProvider');
  }

  return context;
}
