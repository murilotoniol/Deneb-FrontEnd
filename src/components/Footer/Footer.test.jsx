import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  const renderFooter = () => {
    return render(<Footer />);
  };

  it('should render all main sections', () => {
    renderFooter();

    expect(screen.getByText('SOBRE')).toBeInTheDocument();
    expect(screen.getByText('ACESSO RÁPIDO')).toBeInTheDocument();
    expect(screen.getByText('COMO FUNCIONA')).toBeInTheDocument();
    expect(screen.getByText('INSTITUCIONAL')).toBeInTheDocument();
  });

  it('should render logo with correct attributes', () => {
    renderFooter();

    const logo = screen.getByAltText('LOGO');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('logo');
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('should render all quick access links with correct hrefs', () => {
    renderFooter();

    const quickAccessLinks = {
      Anunciar: '/ofertaservico',
      'Perguntas frequentes': '/perguntas-frequentes',
      Categorias: '/categorias',
      'Central de Ajuda': '/central-de-ajuda',
    };

    Object.entries(quickAccessLinks).forEach(([text, href]) => {
      const link = screen.getByText(text);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
    });
  });

  it('should render all institutional links with correct hrefs', () => {
    renderFooter();

    const institutionalLinks = {
      'Termos de uso': '/termos-de-uso',
      'Política de privacidade': '/politica-de-privacidade',
    };

    Object.entries(institutionalLinks).forEach(([text, href]) => {
      const link = screen.getByText(text);
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
    });
  });

  it('should render copyright text', () => {
    renderFooter();

    const copyrightText = screen.getByText('Copyright © Deneb Corp 2025');
    expect(copyrightText).toBeInTheDocument();
    expect(copyrightText.closest('div')).toHaveClass('copyright-footer');
  });

  it('should render about section with correct content', () => {
    renderFooter();

    const aboutText = screen.getByText(
      /Somos a revolução no mercado de serviços/
    );
    expect(aboutText).toBeInTheDocument();
  });

  it('should render all sections with correct CSS classes', () => {
    renderFooter();

    expect(screen.getByText('SOBRE').closest('div')).toHaveClass('widget');
    expect(screen.getByText('ACESSO RÁPIDO').closest('div')).toHaveClass(
      'widget'
    );
    expect(screen.getByText('COMO FUNCIONA').closest('div')).toHaveClass(
      'widget'
    );
    expect(screen.getByText('INSTITUCIONAL').closest('div')).toHaveClass(
      'widget'
    );
  });

  it('should render horizontal rule', () => {
    renderFooter();

    const hr = document.querySelector('.hr-footer');
    expect(hr).toBeInTheDocument();
    expect(hr.tagName).toBe('HR');
  });
});
