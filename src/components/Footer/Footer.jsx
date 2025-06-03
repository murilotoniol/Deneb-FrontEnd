import React from "react";
import '../Footer/Footer.css';
import logo from "../../assets/teste.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="content-footer set-color">
        <div className="container">
          <div className="row">
            {/* SOBRE */}
            <div>
              <div className="widget">
                <h3 className="title-widget">SOBRE</h3>
                <div className="text-widget">
                  <div className="imagem-logo">
                    <a href="/">
                      <img src={logo} alt="LOGO" className="logo" />
                    </a>
                  </div>
                  <div>
                    <p>
                      Somos a revolução no mercado de serviços, disponibilizando uma plataforma moderna que permite que o comprador decida entre diversos serviços para seu pet e em contato com o vendedor para a negociação. Tudo isso com praticidade e segurança.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ACESSO RÁPIDO */}
            <div>
              <div className="widget">
                <h3 className="title-widget">ACESSO RÁPIDO</h3>
                <div className="text-widget">
                  <ul>
                    <li><a href="/anunciar">Anunciar</a></li>
                    <li><a href="/perguntas-frequentes">Perguntas frequentes</a></li>
                    <li><a href="/categorias">Categorias</a></li>
                    <li><a href="/central-de-ajuda">Central de Ajuda</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* COMO FUNCIONA */}
            <div>
              <div className="widget">
                <h3 className="title-widget">COMO FUNCIONA</h3>
                <div className="text-widget">
                  <ul>
                    <li><a href="/como-funciona">Como funciona</a></li>
                    <li><a href="/vantagens">Vantagens</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* INSTITUCIONAL */}
            <div>
              <div className="widget">
                <h3 className="title-widget">INSTITUCIONAL</h3>
                <div className="text-widget">
                  <ul>
                    <li><a href="/termos-de-uso">Termos de uso</a></li>
                    <li><a href="/politica-de-privacidade">Política de privacidade</a></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <hr className="hr-footer" />
      {/* COPYRIGHT */}
      <div>
        <div className="container">
          <div className="copyright-footer">
            <p>Copyright © Deneb Corp 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
