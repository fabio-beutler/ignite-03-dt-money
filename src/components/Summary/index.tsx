import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import { SummaryCard, SummaryContainer } from './styles';
import { useTransactionsContext } from '../../hooks/useTransactionsContext';

export function Summary() {
  const { transactions } = useTransactionsContext();

  console.log(transactions);

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color='#00b37e' />
        </header>
        <strong>R$ 17.400,00</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color='#f75a68' />
        </header>
        <strong>R$ 17.400,00</strong>
      </SummaryCard>
      <SummaryCard variant='green'>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color='#ffffff' />
        </header>
        <strong>R$ 17.400,00</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
