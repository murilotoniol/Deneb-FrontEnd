import { render, screen, act } from "@testing-library/react";
import { BrowserRouter, Routes, Route, MemoryRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "../services/AuthContext";

// Mock do localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = mockLocalStorage;

const TestComponent = () => <div>Protected Content</div>;
const LoginComponent = () => <div>Login Page</div>;
const HomeComponent = () => <div>Home Page</div>;

// Mock Firebase App
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(() => ({})),
}));

// Mock Firebase Auth
const mockUser = {
  uid: "test-uid",
  email: "test@example.com",
  getIdToken: jest.fn(() => Promise.resolve("mock-token")),
};

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn((auth, callback) => {
    // The callback will be set by the test setup
    return jest.fn();
  }),
  signOut: jest.fn(),
  setPersistence: jest.fn(() => Promise.resolve()),
  browserLocalPersistence: {},
}));

// Mock Firebase Auth Web Extension
jest.mock("firebase/auth/web-extension", () => ({
  GoogleAuthProvider: jest.fn(() => ({})),
}));

// Mock Firebase App Check
jest.mock("firebase/app-check", () => ({
  initializeAppCheck: jest.fn(),
  ReCaptchaV3Provider: jest.fn(),
}));

// Mock Firestore
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({})),
  doc: jest.fn(),
  getDoc: jest.fn(() =>
    Promise.resolve({
      exists: () => true,
      data: () => ({
        email: "test@example.com",
        name: "Test User",
      }),
    }),
  ),
}));

const renderPrivateRoute = (
  isAuthenticated,
  initialEntries = ["/protected"],
) => {
  mockLocalStorage.getItem.mockReturnValue(isAuthenticated ? "true" : null);

  // Get the onAuthStateChanged mock
  const { onAuthStateChanged } = require("firebase/auth");

  // Set up the auth state change callback
  onAuthStateChanged.mockImplementation((auth, callback) => {
    callback(isAuthenticated ? mockUser : null);
    return jest.fn();
  });

  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <TestComponent />
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
};

describe("PrivateRoute Component", () => {
  beforeEach(() => {
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
    mockLocalStorage.removeItem.mockClear();
    mockLocalStorage.clear.mockClear();
    jest.clearAllMocks();
  });

  it("should render protected content when user is authenticated", async () => {
    await act(async () => {
      renderPrivateRoute(true);
    });
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("should redirect to login when user is not authenticated", async () => {
    await act(async () => {
      renderPrivateRoute(false);
    });
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("should check Firebase auth state for authentication status", async () => {
    const { onAuthStateChanged } = require("firebase/auth");
    await act(async () => {
      renderPrivateRoute(true);
    });
    expect(onAuthStateChanged).toHaveBeenCalled();
  });

  it("should handle missing authentication key in localStorage", async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    await act(async () => {
      renderPrivateRoute(false);
    });
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("should handle invalid authentication value in localStorage", async () => {
    mockLocalStorage.getItem.mockReturnValue("invalid");
    await act(async () => {
      renderPrivateRoute(false);
    });
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("should render home page when navigating to /", async () => {
    await act(async () => {
      renderPrivateRoute(true, ["/"]);
    });
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
