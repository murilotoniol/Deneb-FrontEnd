import React from 'react';
import "./Mensagens.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Mensagens() {
    // Dados de exemplo para demonstrar o scroll
    const mensagens = Array(20).fill(null).map((_, index) => ({
        id: index + 1,
        remetente: `Usuário ${index + 1}`,
        conteudo: `Esta é uma mensagem de exemplo ${index + 1}. O conteúdo é longo o suficiente para demonstrar o comportamento do scroll na página.`,
        data: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()
    }));

    return (
        <div className="mensagens-container">
            <Header />
            <div className="mensagens-content">
                <h1 className="mensagens-titulo">Minhas Mensagens</h1>
                <div className="mensagens-lista">
                    {mensagens.map(mensagem => (
                        <div key={mensagem.id} className="mensagem-card">
                            <div className="mensagem-header">
                                <h3 className="mensagem-remetente">{mensagem.remetente}</h3>
                                <span className="mensagem-data">{mensagem.data}</span>
                            </div>
                            <p className="mensagem-conteudo">{mensagem.conteudo}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}