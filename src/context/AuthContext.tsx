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
  const [loading, setLoading] = useState<boolean>(true); // Start with loading true until we check auth status
  const [error, setError] = useState<string | null>(null);

  // Setup axios instance with interceptors
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
  });

  // Axios interceptor to handle refreshing tokens
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response.status === 401) {
        try {
          // Try refreshing the token
          const refreshResponse = await axios.post(
            `${API_BASE_URL}/api/v1/users/refresh-token`,
            {},
            { withCredentials: true }
          );
          
          // Retry the original request with new token
          return axiosInstance(error.config);
        } catch (refreshError) {
          // If refresh also fails, logout the user
          setUser(null);
          setError("Session expired. Please log in again.");
        }
      }
      return Promise.reject(error);
    }
  );

  // Check the user's authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/users/current-user");
        console.log(response);
        
        setUser(response.data.message);
      } catch (error) {
        // Handle failed auth check (e.g., token expired)
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
      const response = await axiosInstance.post("/api/v1/users/login", {
        username,
        password,
      });
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
      await axiosInstance.post("/api/v1/users/logout");
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
