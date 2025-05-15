import React, { useState } from "react";
import "../cadastro/Cadastro.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from '../../services/firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Cadastro() {
    
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
            alert('Signed in successfully with Google');
        } catch (error) {
            console.log(error, auth, googleProvider);
        }
    };

    console.log(auth);
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

    const botao = document.getElementById("buttonCadastro");

    return (
        <div className="cadastro">
            <form className="formularioCadastro">
                <h1>Cadastro</h1>
                <h2>Preencha os dados abaixo:</h2>
                <input type="text" name="first_name" placeholder="Digite seu nome" value={formData.first_name} onChange={handleChange} />
                <input type="text" name="last_name" placeholder="Digite seu sobrenome" value={formData.last_name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Digite seu email" value={formData.email} onChange={handleChange} />
                <input type="text" name="phone_number" placeholder="Digite seu telefone" value={formData.phone_number} onChange={handleChange} />
                <input type="text" name="birth_date" placeholder="Digite sua Data de Nascimento" value={formData.birth_date} onChange={handleChange} />
                <input type="text" name="password" placeholder="Digite sua Senha" value={formData.password} onChange={handleChange} />

                {error && <p className="error-message">{error}</p>}
                <button id="buttonCadastro" type="button" onClick={createUserWithEmailAndPassword} disabled={loading}>
                    {loading ? "Registrando..." : "Registrar"}
                </button>
            </form>
        </div>

    );
}
