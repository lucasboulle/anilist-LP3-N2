import React from 'react';
import { Container, TitleContainer } from './styles';

const About: React.FC = () => {
  return (
      <Container>
        <TitleContainer>
          {`Lucas Boulle 081170012`} <br />
          {`Filipe Marques 081170007`} <br />
          {`David Conde 081170002`} <br />
          {`Rodrigo Candido 081170031`} <br />
        </TitleContainer>
      </Container>
  )
}

export default About;