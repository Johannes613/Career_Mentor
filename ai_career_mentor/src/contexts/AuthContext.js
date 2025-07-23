import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const login = (role) => {
        const userData = role === 'admin' 
            ? { name: 'Onam Sarker', role: 'admin' }
            : { name: 'Yohannis', role: 'student' };
        setUser(userData);
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;