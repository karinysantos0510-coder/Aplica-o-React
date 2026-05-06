import { Routes, Route } from 'react-router-dom';
import Cadastro from '../components/Cadastro';
import Login from '../components/Login';
import Principal from '../components/Principal';

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/principal" element={<Principal />} />
    </Routes>
  );
};

export default Rotas;