import { createContext, useContext, useEffect, useState } from "react";
import axios from '../utils/axios.js'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const {data} = await axios.get('/user/me');
                setUser(data);
                console.log(data)
            } catch(error) {
                console.log(data)
            }
        }

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);