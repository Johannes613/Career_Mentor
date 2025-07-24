import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
    auth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signInWithPopup,
    googleProvider,
    signOut,
    onAuthStateChanged
} from '../config/firebase';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // If a user is logged in, set them as the user
                setUser(currentUser);
            } else {
                // If no user is logged in, create a default guest user object
                setUser({
                    displayName: 'Guest',
                    isGuest: true // Add a flag to identify guest users
                });
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const logout = () => {
        // This will sign out the Firebase user, and the listener above
        // will automatically set the user back to the guest object.
        return signOut(auth);
    };

    const value = {
        user,
        signUp,
        login,
        loginWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
