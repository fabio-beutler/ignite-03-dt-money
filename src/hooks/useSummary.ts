import { useTransactionsContext } from './useTransactionsContext';

export function useSummary() {
  const { transactions } = useTransactionsContext();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.outcome += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    { income: 0, outcome: 0, total: 0 }
  );

  return summary;
}
