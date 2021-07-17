import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Button, Container, Icon, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  type: 'income' | 'outcome',
  isActive: boolean;
}

const icons = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
}

export function TransactionTypeButton({ 
  type,
  title, 
  isActive,
  ...rest 
}: Props) {
  return (
    <Container 
      type={type}
      isActive={isActive}
    >
      <Button {...rest}>
        <Icon 
          name={icons[type]} 
          type={type}
        />

        <Title>{ title }</Title>
      </Button>
    </Container>
  );
}
