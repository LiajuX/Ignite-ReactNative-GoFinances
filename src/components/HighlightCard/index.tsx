import React from 'react';

import { 
  Amount, 
  Container, 
  Footer, 
  Header, 
  Icon, 
  LastTransaction, 
  Title 
} from './styles';

interface Props {
  type: 'income' | 'outcome' | 'total';
  title: string;
  amount: string;
  lastTransaction: string;
}

const icon = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
  total: 'dollar-sign',
}

export function HighlightCard({ 
  type, 
  title, 
  amount, 
  lastTransaction 
}: Props) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>
          { title }
        </Title>

        <Icon 
          name={icon[type]} 
          type={type} 
        />
      </Header>

      <Footer>
        <Amount type={type}>
          { amount }
        </Amount>

        <LastTransaction type={type}>
          { lastTransaction }
        </LastTransaction>
      </Footer>
    </Container>
  );
}
