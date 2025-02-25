import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected( {children} ){

    const navigate = useNavigate();
    const [component, setComponent] = useState();
    useEffect(() => {
            fetch("http://localhost/Inventory-Management-System/backend/session.php", {
                method: "GET", 
                credentials:"include"
            })
            .then(response => response.json())
            .then(value => {
                const element = value.isRedirect ? children : navigate("/");
                setComponent(element);
            })
    }, [])

    return component;
}