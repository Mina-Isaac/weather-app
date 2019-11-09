import React from 'react';
import logo from './background.svg';
import './App.css';
import styled from 'styled-components';
import Switch from "../Switch/switch";

const BackMap = styled.img`
position: absolute;
margin: 0 auto;
top: 0;
right: 0;
bottom: 0;
left: 0;
width:100%;
pointer-events: none;
`
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
`;

const App: React.FC = () => {
  return (
    <Container className="App">
      <BackMap src={logo} className="App-logo" alt="logo" />
      <Switch />
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>
    </Container>
  );
}

export default App;
