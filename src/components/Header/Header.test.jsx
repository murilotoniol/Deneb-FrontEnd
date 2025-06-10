import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MenuProvider } from "../MenuProvider/MenuProvider";
import Header from "./Header";

// Mock do useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock do useMenu
const mockOpenMenu = jest.fn();
jest.mock("../MenuProvider/MenuProvider", () => ({
  useMenu: () => ({ openMenu: mockOpenMenu }),
  MenuProvider: ({ children }) => children,
}));

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <MenuProvider>
        <Header />
      </MenuProvider>
    </BrowserRouter>
  );
};

describe("Header Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockOpenMenu.mockClear();
  });

  it("should render all header elements", () => {
    renderHeader();

    expect(screen.getByAltText("teste")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Serviço, usuário ou categoria")
    ).toBeInTheDocument();
    expect(screen.getByText("Categorias")).toBeInTheDocument();
    expect(screen.getByText("Anunciar")).toBeInTheDocument();
    expect(screen.getByTestId("menu-button")).toBeInTheDocument();
  });

  it("should navigate to home when logo is clicked", () => {
    renderHeader();

    const logo = screen.getByAltText("teste");
    fireEvent.click(logo);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should navigate to ofertar servico when anunciar button is clicked", () => {
    renderHeader();

    const anunciarButton = screen.getByText("Anunciar");
    fireEvent.click(anunciarButton);

    expect(mockNavigate).toHaveBeenCalledWith("/ofertaservico");
  });

  it("should handle search form submission with valid input", () => {
    renderHeader();

    const searchInput = screen.getByPlaceholderText(
      "Serviço, usuário ou categoria"
    );
    const searchForm = searchInput.closest("form");

    fireEvent.change(searchInput, { target: { value: "test search" } });
    fireEvent.submit(searchForm);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/procurarservicos?busca=test%20search"
    );
  });

  it("should not navigate on empty search submission", () => {
    renderHeader();

    const searchInput = screen.getByPlaceholderText(
      "Serviço, usuário ou categoria"
    );
    const searchForm = searchInput.closest("form");

    fireEvent.change(searchInput, { target: { value: "   " } });
    fireEvent.submit(searchForm);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should open menu when menu button is clicked", () => {
    renderHeader();

    const menuButton = screen.getByTestId("menu-button");
    fireEvent.click(menuButton);

    expect(mockOpenMenu).toHaveBeenCalledTimes(1);
  });

  it("should update search input value", () => {
    renderHeader();

    const searchInput = screen.getByPlaceholderText(
      "Serviço, usuário ou categoria"
    );
    fireEvent.change(searchInput, { target: { value: "new search" } });

    expect(searchInput.value).toBe("new search");
  });
});
