import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";

import initializeAuthentication from '../pages/Login/firebase/firebase.init';
initializeAuthentication()
const useFirebase = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const auth = getAuth();

    const registerUser = (email, password, location, history) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const destination = location?.state?.from || '/';
                history?.replace(destination);
                const user = result.user
                setError('')
            })
            .catch((error) => {
                setError(error.message)
                // ..
            })
            .finally(() => setIsLoading(false));
    }

    const loginUser = (email, password, location, history) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const destination = location?.state?.from || '/';
                history?.replace(destination);
                setError('')
            })
            .catch((error) => {
                setError(error.message)
                // ..
            })
            .finally(() => setIsLoading(false));
    }

    // ovserver user state  
    useEffect(() => {
        const unSubscriber = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setError('')
            } else {
                setUser({})
            }
            setIsLoading(false)
        });
        return () => unSubscriber;
    }, [])

    const logOut = () => {
        signOut(auth).then(() => {
            setError('')
        }).catch((error) => {
            setError(error.message)
        })
            .finally(() => setIsLoading(false));
    }
    return {
        isLoading,
        user,
        error,
        registerUser,
        logOut,
        loginUser,
    }
};

export default useFirebase;