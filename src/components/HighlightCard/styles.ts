import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface TypeProps {
  type: 'income' | 'outcome' | 'total';
}

export const Container = styled.View<TypeProps>`
  width: ${RFValue(300)}px;

  margin-right: 16px;
  padding: 19px 22px ${RFValue(42)}px;
  border-radius: 5px;

  background-color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.secondary : theme.colors.shape
  };
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.shape : theme.colors.title
  };
  
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(21)}px;
`;

export const Icon = styled(Feather)<TypeProps>`
  ${({ type }) => type === 'income' && css`
    color: ${({ theme }) => theme.colors.success};
  `};

  ${({ type }) => type === 'outcome' && css`
    color: ${({ theme }) => theme.colors.attention};
  `};

  ${({ type }) => type === 'total' && css`
    color: ${({ theme }) => theme.colors.shape};
  `};

  font-size: ${RFValue(40)}px;
`;

export const Footer = styled.View`
  margin-top: 35px;
`;

export const Amount = styled.Text<TypeProps>`
  color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.shape : theme.colors.title
  };

  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  line-height: ${RFValue(48)}px;
`;

export const LastTransaction = styled.Text<TypeProps>`
  color: ${({ theme, type }) => 
    type === 'total' ? theme.colors.shape : theme.colors.text
  };

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  line-height: ${RFValue(18)}px;
`;
