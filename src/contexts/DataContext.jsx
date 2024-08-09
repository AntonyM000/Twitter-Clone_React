import { getFirestore, setDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { app } from "../firebase";

const DataContext = createContext()

function AuthProvider({children}) {
    const [loading, setLoading]= useState(false)
    const [error, setError]= useState(null)
    const auth = getAuth()
    const db= getFirestore(app)




//     async function addData(media,text){
//         try{
//             await setDoc (doc(db,"cities","LA"),{
//                 name:"Mercado",
//                 state:"CA",
//                 country:"USA"
//             });
//     }
// }
}





// timestamp: new Date().getTime()
// const tweetsQuery = query(collection(db, 'tweets'), orderBy('timesta', 'desc'));

