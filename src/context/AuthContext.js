// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { fetchUserProfile } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user session from localStorage
    const storedUsername = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    
    if (storedUsername && token) {
      setUser(storedUsername);
      
      // Fetch user profile data if logged in
      fetchUserProfile()
        .then(profileData => {
          setProfile(profileData);
        })
        .catch(error => {
          console.error("Error fetching profile:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (username) => {
    setUser(username);
    localStorage.setItem("username", username);
    
    // Fetch user profile on login
    fetchUserProfile()
      .then(profileData => {
        setProfile(profileData);
      })
      .catch(error => {
        console.error("Error fetching profile on login:", error);
      });
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  };

  const updateProfile = (newProfileData) => {
    setProfile(prev => ({
      ...prev,
      ...newProfileData
    }));
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        profile, 
        loading, 
        login, 
        logout, 
        updateProfile 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;