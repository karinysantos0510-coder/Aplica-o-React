import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Adicionado para Autenticação
import { getFirestore } from "firebase/firestore"; // Adicionado para Banco de Dados

// Sua configuração do Firebase obtida no console
const firebaseConfig = {
  apiKey: "AIzaSyAjWuaN8q40BTv8XJ0SmP_fIHMRMe1zYP4",
  authDomain: "login-final-288ee.firebaseapp.com",
  projectId: "login-final-288ee",
  storageBucket: "login-final-288ee.firebasestorage.app",
  messagingSenderId: "1078129944316",
  appId: "1:1078129944316:web:557957399c82b244cb9979",
  measurementId: "G-Y23QZGZNVS"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// EXPORTE as instâncias para que os componentes Cadastro, Login e Principal funcionem[cite: 1]
export const auth = getAuth(app); 
export const db = getFirestore(app);