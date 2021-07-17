import { FlatList, Platform } from 'react-native';
import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Feather } from '@expo/vector-icons';

import { DataListProps } from '.';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LoadContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  justify-content: flex-start;

  width: 100%;
  height: ${RFPercentage(42)}px;
  
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const UserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin-top: ${Platform.OS === 'ios' 
  ? getStatusBarHeight() + RFValue(28) 
  : RFValue(60)}px;
  padding: 0 24px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: ${RFValue(24)}px;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  line-height: ${RFValue(24)}px;
`;

export const LogoutButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  contentContainerStyle: { paddingLeft: 24, paddingRight: 8 },
  showsHorizontalScrollIndicator: false,
  horizontal: true,
})`
  position: absolute;

  width: 100%;

  margin-top: ${RFPercentage(20.5)}px;
`;

export const Transactions = styled.View`
  flex: 1;

  margin-top: ${RFPercentage(14)}px;
  padding: 0 24px;
`;

export const Title = styled.Text`
  margin-bottom: ${RFValue(16)}px;

  color: ${({ theme }) => theme.colors.text_dark};

  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const TransactionList = styled(
  FlatList as new () => FlatList<DataListProps> 
  ).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { 
    paddingBottom: Platform.OS === 'ios' ? getBottomSpace() : RFValue(16)
  },
})``;
