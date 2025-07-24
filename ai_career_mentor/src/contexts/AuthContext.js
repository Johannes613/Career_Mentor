import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
    auth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signInWithPopup,
    googleProvider,
    signOut,
    onAuthStateChanged,
    updateProfile // Import updateProfile here as well
} from '../config/firebase';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser({
                    displayName: 'Guest',
                    isGuest: true
                });
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // FIX: signUp function now accepts a name
    const signUp = async (name, email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // After creating the user, update their profile with the provided name
        await updateProfile(userCredential.user, {
            displayName: name
        });
        // This will trigger onAuthStateChanged and update the user state
        return userCredential;
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const logout = () => {
        return signOut(auth);
    };

    const value = {
        user,
        loading,
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
