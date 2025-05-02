import React from "react"
import '../login/styles.css'

export default function Login() {
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

                        <button type="button">Entrar</button>

                        <div className="signup-link">
                            <p>
                                Não tem uma conta? <a href="#">Registar</a>
                            </p>
                        </div>
                    </form>
                </div>
           </main>
    )
}