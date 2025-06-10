# DenebCorp FrontEnd

Plataforma moderna para conectar cuidadores e donos de animais, permitindo a oferta, busca e contratação de serviços para pets com praticidade, segurança e carinho.

---

## ✨ Funcionalidades Principais

- **Autenticação de Usuário:** Cadastro, login, logout e persistência de sessão via Firebase Auth.
- **Cadastro de Usuários:** Formulário com validação de CPF, telefone, data de nascimento e senha forte, com máscaras automáticas.
- **Página Inicial:** Destaques, busca rápida e navegação intuitiva para encontrar ou oferecer serviços.
- **Busca de Serviços:** Filtros por nome, categoria e tipo de animal, com exibição de cards detalhados.
- **Oferta de Serviços:** Formulário para cuidadores anunciarem serviços, com validação e integração ao backend.
- **Perfil do Usuário:** Visualização e edição de dados, upload de foto, exclusão de conta e gerenciamento de informações pessoais.
- **Avaliações:** Exibição de avaliações de clientes, com notas e comentários.
- **Mensagens:** Sistema de chat entre usuários para negociação e dúvidas.
- **Menu Lateral:** Navegação rápida entre perfil, serviços, avaliações, mensagens e logout.
- **Página 404 (NotFound):** Página estilizada para rotas inexistentes, mantendo o padrão visual da aplicação.
- **Design Responsivo:** Layout adaptado para desktop e mobile.
- **Acessibilidade:** Componentes com foco em usabilidade e acessibilidade.

---

## 🛠️ Principais Bibliotecas Utilizadas

- **React**: Biblioteca principal para construção da interface.
- **React Router DOM**: Gerenciamento de rotas e navegação SPA.
- **Firebase**: Autenticação, Firestore e integração backend.
- **Material UI (MUI)**: Componentes visuais modernos e responsivos.
- **react-imask**: Máscaras de input para CPF, telefone e datas.
- **date-fns**: Manipulação de datas.
- **framer-motion**: Animações fluidas e modernas.
- **lucide-react** e **react-icons**: Ícones SVG.
- **Axios**: Requisições HTTP.
- **Jest** e **Testing Library**: Testes automatizados.
- **ESLint**: Padrão de código e qualidade.

---

## 📁 Estrutura de Pastas

```
src/
  components/      # Componentes reutilizáveis (Header, Footer, Menu, etc)
  pages/           # Páginas principais (Home, Cadastro, Login, Perfil, etc)
  services/        # Integração com Firebase, Auth, APIs
  hooks/           # Hooks customizados
  utils/           # Funções utilitárias e validações
  assets/          # Imagens e ícones
  styles/          # CSS global e temas
```

---

## 🚀 Como Rodar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/deneb-frontend.git
   cd deneb-frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto com as chaves do Firebase:
     ```
     VITE_FIREBASE_API_KEY=...
     VITE_FIREBASE_AUTH_DOMAIN=...
     VITE_FIREBASE_PROJECT_ID=...
     VITE_FIREBASE_STORAGE_BUCKET=...
     VITE_FIREBASE_MESSAGING_SENDER_ID=...
     VITE_FIREBASE_APP_ID=...
     VITE_FIREBASE_MEASUREMENT_ID=...
     ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador:**
   ```
   http://localhost:5173
   ```

---

## 🔒 Autenticação & Segurança

- Autenticação via Firebase Auth (email/senha).
- Persistência de sessão e proteção de rotas privadas.
- Validação de dados sensíveis no frontend e backend.

---

## 🧪 Testes

- Testes unitários e de integração com Jest e Testing Library.
- Scripts:
  ```bash
  npm test
  npm run test:watch
  npm run test:coverage
  ```

---

## 📌 Observações

- **Página 404:** Qualquer rota não existente redireciona para uma página amigável de "Página não encontrada".
- **Acessibilidade:** Componentes com foco em acessibilidade e responsividade.
- **Customização:** Fácil de adaptar para outros tipos de serviços ou públicos.

---

## 👨‍💻 Contribuição

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas alterações (`git commit -m 'feat: nova funcionalidade'`)
4. Push para o branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob os termos da Licença MIT.

Criado por Murilo Toniol, Gabriel Menotti, Lucca Chiguti, Jonathan Ribeiro, Bruno Esperidião e Nicolas Henrique.

© 2025 DenebCorp. Todos os direitos reservados.