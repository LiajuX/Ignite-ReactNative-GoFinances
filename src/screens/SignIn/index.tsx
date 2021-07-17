import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth'; 

import { SignInSocialButton } from '../../components/SignInSocialButton';

import LogoSvg from '../../assets/logo.svg';
import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';

import { 
  Container, 
  Header, 
  SignInTitle, 
  Title, 
  TitleWrapper,
  Footer,
  FooterWrapper,
} from './styles';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi posível fazer login com o Google');
      
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi posível fazer login com a Apple');   
      
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas finanças de forma muito simples
          </Title>

          <SignInTitle>
            { Platform.OS === 'ios' 
              ?  'Faça seu login com uma das contas abaixo'
              : 'Faça login com sua conta Google abaixo'
            }
          </SignInTitle>
        </TitleWrapper>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton 
            title="Entrar com Google" 
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          { Platform.OS === 'ios' &&
            <SignInSocialButton 
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          }
        </FooterWrapper>

        { isLoading && 
          <ActivityIndicator 
            color={theme.colors.shape} 
            size="large" 
            style={{ marginTop: 20 }}
          /> 
        }
      </Footer>
    </Container>
  );
}
