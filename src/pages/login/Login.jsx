import React from "react"
import { Link, useNavigate } from 'react-router-dom';
import '../login/styles.css'

export default function Login() {
    
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
            <main>
                <div className="formulario">
                    <form className="forms">
                        <h1>Entrar</h1>
                        <div className="input-field">
                            <label for="email">Email:</label>
                            <input id="email" placeholder="Digite seu email" type="email" />
                        </div>
                        <div className="input-field">
                            <label for="password">Senha:</label>
                            <input id="password" placeholder="Digite sua senha" type="password" />
                        </div>

                        <div className="recall-forget">
                            <label>
                                <input type="checkbox" />
                                Lembrar de mim
                            </label>
                            <a href="#">Esqueceu a senha?</a>
                        </div>

                        <button type="button" onClick={goToHome}>Entrar</button>

                        <div className="signup-link">
                            <p>
                                Não tem uma conta? <Link to='/registrar'>Registrar</Link>
                            </p>
                        </div>
                    </form>
                </div>
           </main>
    )
}