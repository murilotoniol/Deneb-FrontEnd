import React, { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../login/styles.css'
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Usuário logado:", userCredential.user);
            navigate("/");
        } catch (error) {
            alert("Erro ao logar: " + error.message);
        }
    };

    return (
        <div className="login-container">
            <Header />
            <main>
                <div className="formulario">
                    <form className="forms">
                        <h1>Entrar</h1>
                        <div className="input-field">
                            <label htmlFor="email">Email:</label>
                            <input 
                                id="email" 
                                placeholder="Digite seu email" 
                                type="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                            />
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Senha:</label>
                            <input 
                                id="password" 
                                placeholder="Digite sua senha" 
                                type="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                            />
                        </div>

                        <div className="recall-forget">
                            <label>
                                <input type="checkbox" />
                                Lembrar de mim
                            </label>
                            <a href="#">Esqueceu a senha?</a>
                        </div>

                        <button type="button" onClick={handleLogin}>Entrar</button>

                        <div className="signup-link">
                            <p>
                                Não tem uma conta? <Link to='/registrar'>Registrar</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}