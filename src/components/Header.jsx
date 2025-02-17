import "./Header.css";
import logo from "../assets/logo.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Nav from './Nav.jsx'
import { useRef, useState, useEffect } from "react";

export default function Header() {
    const inputRef = useRef(); // Reference for input
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [searchVisible, setSearchVisible] = useState(false);

    useEffect(() => {
        const handleWindowResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);
            setSearchVisible(false); //Reset search bar when resizing
        };

        const handleDocumentClick = (event) => {
            if (!activeNotifRef.current.contains(event.target)) {
                activeNotifRef.current.classList.remove('activeNotif');
            }

            const Navigation = document.querySelector('nav');
            if(!Navigation.contains(event.target)){
                Navigation.classList.remove('active');
            }
        };

        document.addEventListener("click", handleDocumentClick);
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
            document.removeEventListener("click", handleDocumentClick);
        }
    }, []);

    useEffect(() => {
        if (searchVisible) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [searchVisible]);

    const activeNotifRef = useRef();
    function handleToggleNotif(event){
        activeNotifRef.current.classList.toggle('activeNotif');
        document.querySelector('nav').classList.remove("active");
        event.stopPropagation();
    }

    function toggleMenu(event){
        document.querySelector('nav').classList.toggle("active");
        activeNotifRef.current.classList.remove('activeNotif');
        event.stopPropagation();

    }

    return (
        <>
        <Nav/>
        <header>
            <div className="menu-btn" onClick={toggleMenu}>
                <MenuOutlinedIcon />
            </div>
            <h4>Dashboard</h4>
            
            {windowWidth > 500 ? (
                <div className="inp-search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search" />
                </div>
            ) : (
                <>
                {searchVisible && (
                    <div className="inp-search">
                        <SearchOutlinedIcon />
                        <input 
                            type="text" 
                            ref={inputRef} 
                            placeholder="Search" 
                            onBlur={() => setSearchVisible(false)}/>
                    </div>
                ) }
                </>
            ) }

            <img src={logo} width="50px" className="logo" alt="Logo" />
            <div className="footer">
                {!searchVisible && (
                    <div onClick={() => setSearchVisible(true)} className="search-icon">
                        <SearchOutlinedIcon />
                    </div>
                )}
                <div className="notifications">
                    <div className="notif-icon" onClick={handleToggleNotif}>
                        <NotificationsIcon />
                    </div>
                    <div className="notif-item" ref={activeNotifRef}>
                        <b><p>Item Delivered</p></b>
                    </div>
                
                </div>
                <div className="settings">
                    <SettingsOutlinedIcon />
                </div>
            </div>
        </header>
        </>
    );
}
