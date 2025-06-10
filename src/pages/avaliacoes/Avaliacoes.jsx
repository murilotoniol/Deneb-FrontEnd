import React, { useState } from 'react';
import { Star } from 'lucide-react';
import './Avaliacoes.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const mockAvaliacoes = [
  {
    id: 1,
    nome: 'João Silva',
    foto: 'https://i.pravatar.cc/150?img=1',
    data: '10/03/2024',
    nota: 5,
    comentario:
      'Excelente serviço! O cuidador foi muito atencioso com meu pet.',
  },
  {
    id: 2,
    nome: 'Maria Santos',
    foto: 'https://i.pravatar.cc/150?img=2',
    data: '09/03/2024',
    nota: 4,
    comentario: 'Muito bom, apenas um pequeno atraso na chegada.',
  },
  // Adicione mais avaliações conforme necessário
];

function Estrelas({ nota }) {
  const total = 5;
  return (
    <div className="estrelas">
      {[...Array(total)].map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < nota ? '#facc15' : 'none'}
          stroke="#facc15"
        />
      ))}
    </div>
  );
}

export default function Avaliacoes() {
  const [avaliacoes] = useState(mockAvaliacoes);

  return (
    <div className="avaliacoes-container">
      <Header />
      <div className="avaliacoes-content">
        <h1 className="avaliacoes-titulo">Avaliações</h1>
        <div className="avaliacoes-lista">
          {avaliacoes.map(avaliacao => (
            <div key={avaliacao.id} className="avaliacao-card">
              <img
                src={avaliacao.foto}
                alt={`Foto de ${avaliacao.nome}`}
                className="avaliacao-foto"
              />
              <div className="avaliacao-conteudo">
                <div className="avaliacao-cabecalho">
                  <h2 className="avaliacao-nome">{avaliacao.nome}</h2>
                  <span className="avaliacao-data">{avaliacao.data}</span>
                </div>
                <Estrelas nota={avaliacao.nota} />
                <p className="avaliacao-comentario">{avaliacao.comentario}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
