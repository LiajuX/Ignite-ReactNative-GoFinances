import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import {
  Container, 
  ImageContainer,
  Title
} from './styles';

interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignInSocialButton({ 
  title, 
  svg: Svg, 
  ...rest 
}: Props) {
  return (
    <Container {...rest}>
      <ImageContainer>
        <Svg width={24} height={24} />
      </ImageContainer>
      
      <Title>{ title }</Title>
    </Container>
  );
}
