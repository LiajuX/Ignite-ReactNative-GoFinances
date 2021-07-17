import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/core';
import { useAuth } from '../../hooks/auth';

import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
  Container, 
  Header, 
  HighlightCards, 
  Icon, 
  LoadContainer, 
  LogoutButton, 
  Photo, 
  Title, 
  TransactionList, 
  Transactions, 
  User, 
  UserGreeting, 
  UserInfo, 
  UserName,
  UserWrapper
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
} 

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expenses: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();

  const { signOut, user } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'income' | 'outcome'
  ) {
    const collectionFiltered = collection
    .filter(transaction => transaction.type === type)

    if (collectionFiltered.length === 0) {
      return 0;
    }

    const lastTransaction = new Date (
    Math.max.apply(Math, collectionFiltered
    .map(transaction => new Date(transaction.date).getTime())));


    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {
      month: 'long'
    })}`;
  }

  async function loadTransactions() {
    const dataKey= `@gofinances:transactions_user:${user.id}`;

    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expenses = 0 
    
    const formattedTransactions: DataListProps[] = transactions
    .map((item: DataListProps) => {
      
      if (item.type === 'income') {
        entriesTotal += Number(item.amount);
      } else {
        expenses += Number(item.amount);
      }

      const amount = Number(item.amount)
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      }
    });

    setTransactions(formattedTransactions);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'income');
    const lastTransactionExpenses = getLastTransactionDate(transactions, 'outcome');
 
    const totalInterval = (lastTransactionExpenses === 0 && lastTransactionEntries === 0)
    ? 'Não há transações'
    : `01 a ${lastTransactionExpenses}`;

    const total = entriesTotal - expenses;
    
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTransactionEntries === 0 
        ? 'Não há entradas'
        : `Última entrada dia ${lastTransactionEntries}`,
      },

      expenses: {
        amount: expenses.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastTransactionExpenses === 0 
        ? 'Não há saídas'
        : `Última saída dia ${lastTransactionExpenses}`,
      },

      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      }
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>

      { isLoading 
        ? (
          <LoadContainer>
            <ActivityIndicator 
              color={theme.colors.secondary}
              size="large" 
            /> 
          </LoadContainer>
        ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo 
                  source={{ uri: user.photo }} 
                  />

                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{ user.name }</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard 
              type="income"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />

            <HighlightCard
              type="outcome"
              title="Saídas"
              amount={highlightData.expenses.amount}
              lastTransaction={highlightData.expenses.lastTransaction}
            />

            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList           
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
