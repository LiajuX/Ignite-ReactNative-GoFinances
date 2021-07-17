import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useFocusEffect } from '@react-navigation/core';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import { HistoryCard } from '../../components/HistoryCard';

import { categories } from '../../utils/categories';

import {
  ChartContainer,
  Container,
  Content,
  Header,
  LoadContainer,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Title,
} from './styles';

interface TransactionData {
  type: 'income' | 'outcome';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  color: string;
  name: string;
  total: number;
  totalFormatted: string;
  percent: string;
}

export function Summary() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const theme = useTheme();

  const { user } = useAuth();

  function handleDateChange(action: 'previous' | 'next') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));

    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
    
    const dataKey= `@gofinances:transactions_user:${user.id}`;

    const response = await AsyncStorage.getItem(dataKey);
    const formattedResponse = response ? JSON.parse(response) : [];

    const expenses = formattedResponse
    .filter((expense: TransactionData) => 
      expense.type === 'outcome' &&
      new Date(expense.date).getMonth() === selectedDate.getMonth() &&
      new Date(expense.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensesTotal = expenses
    .reduce((accumulator: number, expense: TransactionData) => {
      return accumulator + Number(expense.amount);
    }, 0);

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionData) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = `${(categorySum / expensesTotal * 100).toFixed(0)}%`; 

        totalByCategory.push({
          key: category.key,
          color: category.color,
          name: category.name,
          total: categorySum,
          totalFormatted: total,
          percent,
        }); 
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }
  
  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]));

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      { isLoading 
        ? (
          <LoadContainer>
            <ActivityIndicator 
              color={theme.colors.secondary}
              size="large" 
            /> 
          </LoadContainer>
        ) : (
          <Content   
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ 
              alignItems: 'center',
              paddingHorizontal: 24, 
              paddingBottom: useBottomTabBarHeight(),
            }}
          >
            <MonthSelect>
              <MonthSelectButton onPress={() => handleDateChange('previous')}>
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>

              <Month>
                { format(selectedDate, 'MMMM, yyyy', { locale: ptBR }) }
              </Month>

              <MonthSelectButton onPress={() => handleDateChange('next')}>
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton> 
            </MonthSelect>

            <ChartContainer>
              <VictoryPie
                data={totalByCategories}
                colorScale={totalByCategories.map(category => category.color)}
                style={{
                  labels: { 
                    fill: theme.colors.shape,

                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                  },
                }}
                labelRadius={80}
                x="percent"
                y="total"
              />
            </ChartContainer>
            
            {
              totalByCategories.map(item => (
                <HistoryCard 
                  key={item.key}
                  color={item.color}
                  title={item.name}
                  amount={item.totalFormatted}
                />
              ))
            }
          </Content>
        )}
      
    </Container>
  );
}
