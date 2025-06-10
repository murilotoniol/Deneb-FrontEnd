import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import './categorias.css';

const categorias = [
  {
    nome: 'Cachorro',
    valor: 'cachorro',
    icone: '🐶',
    descricao: 'Serviços para cães: passeios, banho, adestramento e mais.',
  },
  {
    nome: 'Gato',
    valor: 'gato',
    icone: '🐱',
    descricao: 'Serviços para gatos: cuidados, hospedagem, veterinário e mais.',
  },
  {
    nome: 'Outros',
    valor: 'outros',
    icone: '🐾',
    descricao: 'Serviços para outros pets: roedores, aves, exóticos e mais.',
  },
];

export default function Categorias() {
  const navigate = useNavigate();

  const handleCategoria = cat => {
    navigate(`/procurarservicos?busca=${encodeURIComponent(cat)}`);
  };

  return (
    <div className="categorias-container">
      <Header />
      <div className="categorias-content">
        <h1 className="categorias-titulo">Categorias</h1>
        <div className="categorias-lista">
          {categorias.map(cat => (
            <div
              key={cat.valor}
              className="categoria-card"
              onClick={() => handleCategoria(cat.valor)}
            >
              <span className="categoria-icone">{cat.icone}</span>
              <h2>{cat.nome}</h2>
              <p>{cat.descricao}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
