import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContainerProps {
  color: string;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  margin-bottom: 10px;
  padding: ${RFValue(13)}px ${RFValue(24)}px;
  border-left-width: 5px;
  border-left-color: ${({ color }) => color};
  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.title};

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;
