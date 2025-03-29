import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user from backend on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/user", {
          credentials: "include",
        });
        const data = await res.json();
        
        if (data && data._id) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data)); // Store in localStorage
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        localStorage.removeItem("user");
      }
    };

    fetchUser();
  }, []);

  const login = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "http://localhost:5000/auth/logout";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
