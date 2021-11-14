import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile, getIdToken } from "firebase/auth";

import initializeAuthentication from '../pages/Login/firebase/firebase.init';
initializeAuthentication()
const useFirebase = () => {
    const googleProvider = new GoogleAuthProvider()
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const auth = getAuth();
    const [admin, setAdmin] = useState(false)
    const [token, setToken] = useState('')

    const registerUser = (email, password, name, history) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {

                const newUser = { email, displayName: name };
                saveUser(email, name, 'POST')
                // send name to firebase after creation 
                setUser(newUser)
                setError('')
                updateProfile(auth.currentUser, {
                    displayName: name
                })
                    .then(() => {

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
                const user = result.user
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
                const user = result.user;
                saveUser(user.email, user.displayName, 'PUT')
                const destination = location?.state?.from || '/';
                history?.replace(destination);
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
                getIdToken(user)
                    .then(idToken => {
                        setToken(idToken)
                    })
            } else {
                setUser({})
            }
            setIsLoading(false)
        });
        return () => unSubscriber;
    }, [])
    useEffect(() => {
        fetch(`http://localhost:5000/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin))
    }, [user.email])

    const logOut = () => {
        signOut(auth).then(() => {
            setError('')
        }).catch((error) => {
            setError(error.message)
        })
            .finally(() => setIsLoading(false));
    }

    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch("http://localhost:5000/users", {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }


    return {
        token,
        admin,
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