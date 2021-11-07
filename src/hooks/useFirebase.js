import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";

import initializeAuthentication from '../pages/Login/firebase/firebase.init';
initializeAuthentication()
const useFirebase = () => {
    const googleProvider = new GoogleAuthProvider()
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const auth = getAuth();

    const registerUser = (email, password, name, history) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {

                const newUser = { email, displayName: name };
                // send name to firebase after creation 
                setUser(newUser)
                setError('')
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {

                })
                    .catch((error) => {
                        setError(error.message)
                        // ..
                    })
                history?.replace('/');
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


    const signInWithGoogle = (location, history) => {
        setIsLoading(true)
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const destination = location?.state?.from || '/';
                history?.replace(destination);
                const user = result.user;
                setError('')

            }).catch((error) => {
                setError(error.message)

            }).finally(() => setIsLoading(false));
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
        signInWithGoogle,
    }
};

export default useFirebase;