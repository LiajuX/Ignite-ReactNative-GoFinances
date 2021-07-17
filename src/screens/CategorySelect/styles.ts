import styled from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface CategoryProps {
  isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`align-items: center;
  justify-content: flex-end;

  width: 100%;
  height: ${RFValue(113)}px;

  padding-bottom: 19px;

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Category = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})<CategoryProps>`
  flex-direction: row;
  align-items: center;

  width: 100%;

  padding: ${RFValue(18)}px;

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.secondary_light : theme.colors.background
  };
`;

export const Icon = styled(Feather)`
  margin-right: 16px;

  color: ${({ theme }) => theme.colors.title};

  font-size: ${RFValue(20)}px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.title};

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`; 

export const Separator = styled.View`
  height: 1px;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
