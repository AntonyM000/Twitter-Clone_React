import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuth(){
    const context = useContext(AuthContext)
    if(context === undefined) throw new Error('AuthContext was used outside of AuthProvider')
    return context
}