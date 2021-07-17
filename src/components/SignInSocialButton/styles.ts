import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton)`
  flex-direction: row;
  align-items: center;

  height: ${RFValue(56)}px;

  margin-bottom: 16px;
  border-radius: 5px;

  background-color: ${({ theme }) => theme.colors.shape};
`;

export const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;

  height: 100%;

  padding: ${RFValue(16)}px;
  border-right-width: 1px;
  border-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  flex: 1;

  color: ${({ theme }) => theme.colors.title};

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  text-align: center;
`;
