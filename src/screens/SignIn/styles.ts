import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  justify-content: flex-end;

  width: 100%;
  height: 70%;

  padding: 0 40px;
  
  background-color: ${({ theme }) => theme.colors.primary};
  `;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  margin-top: 40px;

  color: ${({ theme }) => theme.colors.shape};
  
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  line-height: ${RFValue(40)}px;
  text-align: center;
`;

export const SignInTitle = styled.Text`
  margin: 80px 50px 67px;

  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: ${RFValue(24)}px;
  text-align: center;
`;

export const Footer = styled.View`
  width: 100%;
  height: 30%;

  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const FooterWrapper = styled.View`
  justify-content: space-between;

  margin-top: -8%;
  padding: 0 32px;
`;
