import './Header.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export default function Header(){

    function toggleMenu(){
        document.querySelector('nav').classList.toggle("active");
    }

    return(
        <header>
            <div className="menu-btn">
                <MenuOutlinedIcon onClick={toggleMenu}/>
            </div>
            <h4>Dashboard</h4>
            <div className="inp-search">
                <SearchOutlinedIcon />
                <input type="text" placeholder='Search'/>
            </div>
            <div className='footer'>
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