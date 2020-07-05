import React from 'react';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <>
      <Header />
      <SearchBar />

      <GlobalStyle />
    </>
  );
}

export default App;
