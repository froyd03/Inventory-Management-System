import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../utils/axios.js';

const Protected = ({ children }) => {
        const navigate = useNavigate();
        const [isAuthorized, setIsAuthorized] = useState(false);
    
        useEffect( () => {
            async function checkAuthorization(){
                try{
                    const {data} = await axios.get('/user/verifyUserToken');
                    if(data.isValid){
                        setIsAuthorized(true)
                    }
                }catch(error){
                    navigate('/');

                }
            }

            checkAuthorization();
        }, []);
    
        if (isAuthorized === null) {
            return <p>Loading...</p>; // Show a loading state while checking session
        }   
    
        return <>{isAuthorized && children}</>; // Render children only if session is valid
};


export default Protected;