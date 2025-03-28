import React from "react"
import "../cadastro/Cadastro.css"

export default function Cadastro() {

    return(
        <div className="cadastro">
            <form className="formularioCadastor">
                <input type="text" placeholder="Digite seu nome" />
                <input type="text" placeholder="Digite seu sobrenome" />
                <input type="email" placeholder="Digite seu email" />
                <input type="text" placeholder="Digite sue telefone" />
                <input type="password" placeholder="Digite sua senha" />
                <label >Insira sua data de nascimento</label>
                <input type="date" placeholder="Digite sua Data de Nascimento" />
            </form>
        </div>
    )
    
}