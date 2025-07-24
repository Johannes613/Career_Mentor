import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // FIX: The initial user is now a default "Guest" object instead of null.
    const [user, setUser] = useState({ name: 'Guest', role: 'student' });
    
    // The login and logout functions are no longer needed for this flow,
    // but are kept here as placeholders if you want to add auth back later.
    const login = (role) => {
        const userData = role === 'admin' 
            ? { name: 'Admin User', role: 'admin' }
            : { name: 'Felecia', role: 'student' };
        setUser(userData);
    };

    const logout = () => {
        // In a real app, you might want to clear the user state.
        // For now, it does nothing.
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};