import { auth, db } from '../firebase'; // Importa do arquivo de configuração
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } 
from 'firebase/auth'; // Importa do pacote instalado
import { doc, setDoc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.senha);
      navigate('/principal');
    } catch (error) {
      setMensagem('Usuário ou senha incorretos!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>E-mail:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Senha:</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Entrando...' : 'Acessar Página Principal'}
          </button>
        </form>

        <p className="link-nav">
          Não tem conta? <a href="/">Cadastre-se</a>
        </p>

        {mensagem && (
          <div className="mensagem erro">{mensagem}</div>
        )}
      </div>
    </div>
  );
};

export default Login;