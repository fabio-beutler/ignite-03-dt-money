import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import { useTransactionsContext } from '../../hooks/useTransactionsContext';
import { SearchForm } from './components/SearchForm';
import { PriceHighlight, TransactionsContainer, TransactionsTable } from './styles';

export function Transactions() {
  const { transactions } = useTransactionsContext();

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
