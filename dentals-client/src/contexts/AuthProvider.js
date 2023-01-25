import React, { useEffect } from 'react';
import { createContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, signInWithPopup, sendEmailVerification } from "firebase/auth";
import app from './../Firebase/Firebase.config';
import { useState } from 'react';

 export const AuthContext = createContext();
 const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const providerLogin = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }

    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
       const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            
                if(currentUser === null || currentUser.emailVerified)
                {
                    setUser(currentUser);
                }            
                setLoading(false);
          });
          return () => unSubscribe();
    }, []);

    const authInfo = {
        createUser,
        signIn,
        providerLogin,
        updateUser,
        verifyEmail,
        logOut,
        user,
        loading
    }
    
    return (
    <AuthContext.Provider value={authInfo}>
            {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;