import React from 'react';
import GlobalStyle from './styles/global';
import { Container } from './styles/Container';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Titles from './pages/Titles';
import Threads from './pages/Threads';
import { HeaderTitleContainer } from './styles/HeaderTitleContainer';
import About from './pages/About';

const titleStyle = {
  fontSize: 18, 
  color: '#fff', 
  textDecoration: 'none'
}


function App() {
  return (
    <>
      <Router>
        <Container>
          <h1>Anilist</h1>
          <HeaderTitleContainer>
            <Link to="/titles" style={titleStyle}>Titles</Link>
          </HeaderTitleContainer>
          <HeaderTitleContainer>
            <Link to="/threads" style={titleStyle}>Threads</Link>
          </HeaderTitleContainer>
          <HeaderTitleContainer>
            <Link to="/about" style={titleStyle}>About</Link>
          </HeaderTitleContainer>

        </Container>
        <Switch>
          <Route path="/titles" exact component={Titles} />
          <Route path="/threads" component={Threads} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
      <GlobalStyle />
    </>
  );
}

export default App;
