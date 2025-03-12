import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";

const Protected = ({ children }) => {
        const navigate = useNavigate();
        const [isAuthorized, setIsAuthorized] = useState(true);
    
        useEffect(() => {
            fetch("http://localhost/Inventory-Management-System/backend/session.php", {
                method: "GET",
                credentials: "include"
            })
            .then(response => response.json())
            .then(value => {
                if (value.isRedirect) {
                    setIsAuthorized(true);
                } else {
                    navigate("/");
                }
            })
            .catch(error => {
                console.error("Error checking session:", error);
                navigate("/");
            });
        }, [navigate]);
    
        if (isAuthorized === null) {
            return <p>Loading...</p>; // Show a loading state while checking session
        }   
    
        return <>{children}</>; // Render children only if session is valid
};


export default Protected;