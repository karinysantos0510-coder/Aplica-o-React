import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Principal = () => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Monitora se o usuário está logado
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Busca os dados no Firestore usando o UID
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUsuario(docSnap.data());
          }
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        }
      } else {
        navigate('/'); // Se deslogar, volta para o login
      }
      setCarregando(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth).then(() => navigate('/'));
  };

  if (carregando) {
    return <div className="page-container"><h1>Carregando...</h1></div>;
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Dados do Usuário</h1>
        {usuario ? (
          <div style={{ textAlign: 'left', margin: '20px 0' }}>
            <p><strong>Nome:</strong> {usuario.nome}</p>
            <p><strong>Sobrenome:</strong> {usuario.sobrenome}</p>
            <p><strong>Nascimento:</strong> {usuario.dataNascimento}</p>
          </div>
        ) : (
          <p>Nenhum dado encontrado no banco de dados.</p>
        )}
        <button onClick={handleLogout} className="btn-primary">
          Sair da Conta
        </button>
      </div>
    </div>
  );
};

export default Principal;