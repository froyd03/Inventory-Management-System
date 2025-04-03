import "../styles/Header.css";
import logo from "../assets/logo.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [greetUser, setGreetUser] = useState();

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
                setActiveNotif(false);
            }

            if (!activeSettingsRef.current.contains(event.target)) {
                SetActiveSetting(false);
            }

            const Navigation = document.querySelector('nav');
            if(!Navigation.contains(event.target)){
                Navigation.classList.remove('sideBarActive');
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
    const [activeNotif, setActiveNotif] = useState(false);
    function handleToggleNotif(event){
        document.querySelector('nav').classList.remove("sideBarActive");
        SetActiveSetting(false);
        setActiveNotif(a => !a);
        event.stopPropagation();
    }

    const activeSettingsRef = useRef();
    const [activeSetting, SetActiveSetting] = useState(false);
    function handleToggleSettings(event){
        document.querySelector('nav').classList.remove("sideBarActive");
        setActiveNotif(false)
        SetActiveSetting(a => !a);
        event.stopPropagation();
    }

    function toggleMenu(event){
        document.querySelector('nav').classList.toggle("sideBarActive");
        SetActiveSetting(false);
        setActiveNotif(false)
        event.stopPropagation();
    }

    const navigate = useNavigate();
    function logOut(){
        fetch("http://localhost/Inventory-Management-System/backend/auth/logout.php", {
            method:"GET", 
            credentials:"include"
        })
        .then(response => response.json())
        .then(value => {
            if(!value.isRedirect){
                navigate("/", {replace: true});
            }
        })
        .catch(error => console.error("fetched failed", error));
    }

    return (
        <>
        <header>
            <div className="menu-btn" onClick={toggleMenu}>
                <MenuOutlinedIcon />
            </div>
            <h4>Dashboard</h4>
            
            {windowWidth > 500 ? (
                <div className="inp-search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search product, supplier, order" />
                </div>
            ) : (
                <>
                {searchVisible && (
                    <div className="inp-search">
                        <SearchOutlinedIcon />
                        <input 
                            type="text" 
                            ref={inputRef} 
                            placeholder="Search product, supplier, order" 
                            onBlur={() => setSearchVisible(false)}/>
                    </div>
                ) }
                </>
            ) }

            <img src={logo} width="50px" className="logo-img" alt="Logo" />
            <div className="footer">
                {!searchVisible && (
                    <div onClick={() => setSearchVisible(true)} className="search-icon">
                        <SearchOutlinedIcon />
                    </div>
                )}
                <div className="notif-container" ref={activeNotifRef}>
                    <div className="notif-icon" onClick={handleToggleNotif}>
                        {activeNotif ? <NotificationsIcon /> : <NotificationsOutlinedIcon /> }
                    </div>
                    {activeNotif && <div className="notifications">
                        <h3>Notifications</h3>
                        <hr />
                        <div className="notif-items">
                            <b><p>Item Delivered</p></b>
                            <p>your item has been delivered.</p>
                            <hr />
                        </div>
                    </div>}
                
                </div>
                <div className="" ref={activeSettingsRef}>
                   <div className="notif-icon" onClick={handleToggleSettings}>
                        {activeSetting ? < AccountCircleIcon />  : <AccountCircleOutlinedIcon />}
                    </div>
                   {activeSetting && <div className="settings-container">
                        <h3>Account</h3>
                        <div className="setting-items">
                            <AccountCircleOutlinedIcon />
                           <h5>Profile</h5>
                        </div>
                        <div className="setting-items" >
                            <SettingsOutlinedIcon/>
                           <h5 >Settings</h5>
                        </div>
                        <div className="setting-items" onClick={logOut}>
                            <LogoutIcon/>
                           <h5 onClick={logOut}>Log out</h5>
                        </div>
                    </div>}
                </div>
            </div>
        </header>
        </>
    );
}
