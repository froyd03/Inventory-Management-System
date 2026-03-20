import { createContext, useContext, useEffect, useState } from "react";
import axios from '../utils/axios.js'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        try{
            const {data} = await axios.get('/user/me');
            setUser(data);
            console.log("FETCHED USER:", data);
                console.log(data)
        } catch(error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);