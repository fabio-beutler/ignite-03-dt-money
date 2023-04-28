import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { SearchForm } from './components/SearchForm';
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles';

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  amount: number;
  createdAt: string;
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/transactions')
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width='50%'>{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>
                    R$ {transaction.amount}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
