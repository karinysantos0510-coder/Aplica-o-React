import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rotas from './routes/Rotas';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* O componente Rotas decide qual página mostrar */}
      <Rotas /> 
    </BrowserRouter>
  );
}

export default App;