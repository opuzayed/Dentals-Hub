import React, { useEffect } from 'react';
import { createContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import app from './../Firebase/Firebase.config';
import { useState } from 'react';

 export const AuthContext = createContext();
 const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
         return signOut(auth);
    }

    useEffect(() => {
       const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
          });
          return () => unSubscribe();
    }, []);

    const authInfo = {
        createUser,
        signIn,
        logOut,
        user,
    }
    
    return (
    <AuthContext.Provider value={authInfo}>
            {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;