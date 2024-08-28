"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";

// Define the User type based on your API's response structure
interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  division?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  refreshToken: string;
  accessToken: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

// Create context with the appropriate type or default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props type for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

const API_BASE_URL = "http://localhost:8000";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false); //set to false temporarily
  const [error, setError] = useState<string | null>(null);

  // Check the user's authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          API_BASE_URL + "/api/v1/users/current-user",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.message);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        API_BASE_URL + "/api/v1/users/login",
        { username, password },
        { withCredentials: true }
      );
      setUser(response.data.message.user);
      setError(null);
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await axios.post(
        API_BASE_URL + "/api/v1/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      setError(null);
    } catch (error) {
      setError("Logout failed.");
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useauth must be used within an authprovider");
  }
  return context;
};
