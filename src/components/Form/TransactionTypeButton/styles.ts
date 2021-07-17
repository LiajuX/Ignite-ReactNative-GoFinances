import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContainerProps {
  isActive: boolean;
  type: 'income' | 'outcome';
}

interface IconProps {
  type: 'income' | 'outcome';
}

export const Container = styled.View<ContainerProps>`  
  width: 48%;

  border-width: ${({ isActive }) => isActive ? 0 : 1.5}px;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ isActive, type }) => isActive && type === 'income' && css`
    background-color: ${({ theme }) => theme.colors.success_light};
  `};

  ${({ isActive, type }) => isActive && type === 'outcome' && css`
    background-color: ${({ theme }) => theme.colors.attention_light};
  `};
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  padding: 16px 0;
  border-radius: 5px;
`;

export const Icon = styled(Feather)<IconProps>`
  margin-right: ${RFValue(12)}px;

  font-size: ${RFValue(24)}px;

  color: ${({ type, theme }) => 
    type === 'income' ? theme.colors.success : theme.colors.attention
  };
`; 

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
