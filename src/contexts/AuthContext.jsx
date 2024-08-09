import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { app } from "../firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const auth = getAuth();
    const db = getFirestore(app);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, [auth]);

    async function signup(name, email, password, navigate) {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const newUserRef = doc(db, 'users', user.uid);
            await setDoc(newUserRef, {
                userID: user.uid,
                userName: name,
                userEmail: email,
                timestamp: new Date().getTime()
            });
            navigate('/');
        } catch (error) {
            setError(error.message);
            console.error("Error signing up", error.message);
        } finally {
            setLoading(false);
        }
    }

    async function signin(email, password, navigate) {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
            navigate('/');
        } catch (error) {
            setError(error.message);
            console.error("Error signing in", error.message);
        } finally {
            setLoading(false);
        }
    }

    async function signout(navigate) {
        setLoading(true);
        setError(null);
        try {
            await signOut(auth);
            console.log('Sign-out successful');
            navigate('/login');
        } catch (error) {
            setError(error.message);
            console.error("Error signing out", error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ loading, error, signin, signup, signout, currentUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
