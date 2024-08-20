import { createContext, useContext, useEffect, useState } from "react";
import { getDoc, getFirestore, onSnapshot, doc, collection, query } from "firebase/firestore";
import { app } from "../firebase";
import { useAuth } from "../hooks/useAuth";

const DataContext = createContext()

function DataProvider({children}) {
    const { currentUser } =useAuth();
    const [loading, setLoading]= useState(true)
    const [error, setError]= useState(null)
    const [userName, setUserName] = useState('');
    const [tweets, setTweets] = useState([]);
    const db= getFirestore(app)
    
    useEffect( () => {        
    // const q = query(collection(db, "users"));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc)=>{
    //     console.log(doc.id,"=>", doc.data());
    // })
    // setTweetMediaArray(querySnapshot)
    const fetchData =async () => {
        if (!currentUser) {
            setLoading(false);
            return;
        }
        try {
            const docRef = doc(db, 'users', currentUser.uid)
            const userDoc = await getDoc(docRef)
            console.log('User data:', userDoc.data()); // Debugging line
            console.log(userDoc.data())
            
            const unsubscribeUsername = onSnapshot(docRef, (docSnap) => {
                  if (docSnap.exists) {
                    const userData = docSnap.data();
                    setUserName(userData.userName);
                  }else{
                    console.error('Error fetching document:', error)
                }
                });
        
                const tweetsQuery = query(collection(db, 'tweets'));
                const unsubscribeTweets = onSnapshot(tweetsQuery, (snapshot) => {
                  const tweetsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                  console.log('Tweets data:', tweetsData); // Debugging line
                  setTweets(tweetsData);
                })
                return() =>{
                    unsubscribeUsername();
                    unsubscribeTweets();
                }
        }catch (err) {
            console.error('Error fetching data:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
        
    }
    fetchData();
},[db,currentUser])



return (
    <DataContext.Provider value={{ loading,error,userName, tweets }}>
        {children}
    </DataContext.Provider>
);
}

export { DataContext, DataProvider };



// import { useEffect, useState, createContext } from "react";
// import { getDoc, getFirestore, onSnapshot, doc, collection, query } from "firebase/firestore";
// import { app } from "../firebase";
// import { useAuth } from "./AuthContext"; // Ensure useAuth is correctly imported

// const DataContext = createContext();

// function DataProvider({ children }) {
//     const { currentUser } = useAuth();
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [userName, setUserName] = useState('');
//     const [tweets, setTweets] = useState([]);
//     const db = getFirestore(app);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (!currentUser) {
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const docRef = doc(db, 'users', currentUser.uid);
//                 const userDoc = await getDoc(docRef);
//                 console.log(userDoc.data());

//                 const unsubscribeUsername = onSnapshot(docRef, (docSnap) => {
//                     if (docSnap.exists()) {
//                         const userData = docSnap.data();
//                         setUserName(userData.userName);
//                     } else {
//                         console.error('Error fetching document: Document does not exist');
//                     }
//                 });

//                 const tweetsQuery = query(collection(db, 'tweets'));
//                 const unsubscribeTweets = onSnapshot(tweetsQuery, (snapshot) => {
//                     const tweetsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                     setTweets(tweetsData);
//                 });

//                 return () => {
//                     unsubscribeUsername();
//                     unsubscribeTweets();
//                 };
//             } catch (err) {
//                 console.error('Error fetching data:', err);
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [db, currentUser]); // Dependency array includes only db and currentUser

//     return (
//         <DataContext.Provider value={{ loading, error, userName, tweets }}>
//             {children}
//         </DataContext.Provider>
//     );
// }

// export { DataContext, DataProvider };
