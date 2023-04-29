import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles';
import * as zod from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../lib/axios';
import { useTransactionsContext } from '../../hooks/useTransactionsContext';

const newTransactionFormSchema = zod.object({
  description: zod.string().min(3, 'Descrição muito curta'),
  amount: zod.number().positive('O valor não pode ser negativo'),
  category: zod.string().min(3, 'Categoria muito curta'),
  type: zod.enum(['income', 'outcome'], {
    invalid_type_error: 'Tipo de transação inválido',
  }),
});

type NewTransactionFormData = zod.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const { createTransaction } = useTransactionsContext();

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormData>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'income',
    },
  });

  async function handleCreateNewTransaction(inputData: NewTransactionFormData) {
    await createTransaction(inputData);
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type='text'
            placeholder='Descrição'
            required
            {...register('description')}
          />
          <input
            type='number'
            placeholder='Preço'
            required
            {...register('amount', { valueAsNumber: true })}
          />
          <input type='text' placeholder='Categoria' required {...register('category')} />

          <Controller
            control={control}
            name='type'
            render={({ field }) => (
              <TransactionType onValueChange={field.onChange} value={field.value}>
                <TransactionTypeButton value='income' variant='income'>
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton value='outcome' variant='outcome'>
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )}
          />

          <button type='submit' disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
