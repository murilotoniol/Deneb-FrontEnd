import React, { useState } from "react";
import "../cadastro/Cadastro.css";
import api from "../services/api";

export default function Cadastro() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        birth_date: "",
    });

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    async function createUsers() {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/users', formData);
            setUsers(response.data);
            setFormData({ first_name: "", last_name: "", email: "", phone_number: "", birth_date: "" }); // Reset form
        } catch (err) {
            setError("Erro ao registrar usuário. Tente novamente.");
            console.error("Error creating user:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="cadastro">
            <form className="formularioCadastro">
                <input type="text" name="first_name" placeholder="Digite seu nome" value={formData.first_name} onChange={handleChange} />
                <input type="text" name="last_name" placeholder="Digite seu sobrenome" value={formData.last_name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Digite seu email" value={formData.email} onChange={handleChange} />
                <input type="text" name="phone_number" placeholder="Digite seu telefone" value={formData.phone_number} onChange={handleChange} />
                <input type="text" name="birth_date" placeholder="Digite sua Data de Nascimento" value={formData.birth_date} onChange={handleChange} />
                
                {error && <p className="error-message">{error}</p>}
                <button type="button" onClick={createUsers} disabled={loading}>
                    {loading ? "Registrando..." : "Registrar"}
                </button>
            </form>
        </div>
    );
}
