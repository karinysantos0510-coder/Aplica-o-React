import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './routes/Rotas';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Rotas /> 
    </BrowserRouter>
    // Build final verificado localmente
  );
}

export default App;