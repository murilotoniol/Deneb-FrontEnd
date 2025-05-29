import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Star, User } from 'lucide-react';
import './AsideMenu.css';

export default function AsideMenu() {
    const navigate = useNavigate();

    const menuItems = [
        {
            title: 'Mensagens',
            icon: <MessageSquare size={20} />,
            path: '/mensagens'
        },
        {
            title: 'Avaliações',
            icon: <Star size={20} />,
            path: '/avaliacoes'
        },
        {
            title: 'Perfil',
            icon: <User size={20} />,
            path: '/perfil'
        }
    ];

    return (
        <aside className="aside-menu">
            <nav className="aside-nav">
                <ul className="menu-list">
                    {menuItems.map((item, index) => (
                        <li key={index} className="menu-item">
                            <button
                                className="menu-button"
                                onClick={() => navigate(item.path)}
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
