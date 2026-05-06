import { auth, db } from '../firebase'; // Importa do seu arquivo de configuração
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'; // Importa do pacote instalado
import { doc, setDoc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome: '',
    sobrenome: '',
    dataNascimento: ''
  });
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    try {
      // Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.senha
      );
      
      const user = userCredential.user;
      const uid = user.uid;

      // Salvar dados no Firestore
      await setDoc(doc(db, 'usuarios', uid), {
        uid: uid,
        email: formData.email,
        nome: formData.nome,
        sobrenome: formData.sobrenome,
        dataNascimento: formData.dataNascimento,
        createdAt: new Date().toISOString()
      });

      setMensagem('Usuário cadastrado com sucesso!');
      setTimeout(() => navigate('/login'), 2000);
      
    } catch (error) {
      setMensagem('Erro ao cadastrar: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Cadastro</h1>
        <form onSubmit={handleCadastro}>
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

          <div className="input-group">
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Sobrenome:</label>
            <input
              type="text"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Data de Nascimento:</label>
            <input
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p className="link-nav">
          Já tem conta? <a href="/login">Faça login</a>
        </p>

        {mensagem && (
          <div className={`mensagem ${mensagem.includes('sucesso') ? 'sucesso' : 'erro'}`}>
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cadastro;