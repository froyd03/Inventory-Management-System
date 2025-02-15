import './Header.css'
import logo from '../assets/logo.png'
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useRef, useState, useEffect } from 'react';

export default function Header(){

    function toggleMenu(){
        document.querySelector('nav').classList.toggle("active");
    }

    const inpSearchRef = useRef();
    const SearchIconRef = useRef();
    const inputFocusRef = useRef();
    const [hideSearch, setHideSearch] = useState(true);

    function searchIconBtn(){
        SearchIconRef.current.style.display = hideSearch ? "none" : "flex";
        inpSearchRef.current.style.display = hideSearch ? "flex" : "none";

        if(hideSearch) inputFocusRef.current.focus();
        inputFocusRef.current.value = "";
    }

    const [isFocused, setIsFocused] = useState(false);
    useEffect(() => {
        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        const inputElement = inputFocusRef.current;
        if (inputElement) {
            inputElement.addEventListener("focus", handleFocus);
            inputElement.addEventListener("blur", handleBlur);
            setHideSearch(s => !s);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener("focus", handleFocus);
                inputElement.removeEventListener("blur", handleBlur);
            }
        };
       
    }, []);

    useEffect(() => {
        SearchIconRef.current.style.display = isFocused ? "none" : "flex";
        inpSearchRef.current.style.display = isFocused ? "flex" : "none";
    }, [isFocused])


    return(
        <header>
            <div className="menu-btn">
                <MenuOutlinedIcon onClick={toggleMenu}/>
            </div>
            <h4>Dashboard</h4>
            <div className="inp-search" ref={inpSearchRef}>
                <SearchOutlinedIcon />
                <input type="text" ref={inputFocusRef} placeholder='Search'/>
            </div>
            <img src={logo} width='50px' className='logo' alt="" />
            <div className='footer'>
                <div onClick={searchIconBtn} ref={SearchIconRef} className="search-icon">
                    <SearchOutlinedIcon />
                </div>
                <div className="notifications">
                    <NotificationsIcon />
                </div>
                <div className="settings">
                    <SettingsOutlinedIcon />
                </div>
            </div>
        </header>
    )
}