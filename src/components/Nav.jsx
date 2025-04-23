import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import '../styles/Nav.css';

export default function Nav(props){

    const navigationBtn = [
        {
            btnName:'Dashboard', 
            path: '/dashboard',
            btnIcon: <HomeOutlinedIcon sx={{fontSize: 25}}/>
        },
        {
            btnName:'Inventory', 
            path: '/inventory',
            btnIcon:  <Inventory2OutlinedIcon sx={{fontSize: 25}}/>
        },
        {
            btnName:'Reports', 
            path: '/client',
            btnIcon: <AssessmentOutlinedIcon sx={{fontSize: 25}}/>
        },
        {
            btnName:'Suppliers', 
            path: '/supplier',
            btnIcon: <AccountCircleOutlinedIcon sx={{fontSize: 25}} />
        },
        {
            btnName:'Orders', 
            path: '/orders',
            btnIcon: <LocalShippingOutlinedIcon sx={{fontSize: 25}} />
        },
        
    ]

    const activePageRef = useRef([]);
    const [clickedIndex, setClickedIndex] = useState(0);

    useEffect(() => {
        handleActiveBtn(clickedIndex);
    }, [clickedIndex])

    
    function handleActiveBtn(index){
        activePageRef.current.forEach(element => {
            if(element.classList.contains('active')){
                element.classList.remove('active')
            }
        })
        setClickedIndex(index);
        activePageRef.current[props.index].classList.add('active');
    }

    const closeIconRef = useRef();
    function handleClose(){
        closeIconRef.current.classList.remove('sideBarActive');
    }

    return (
        <nav ref={closeIconRef}>
            <div className="close" onClick={handleClose}>
                <CloseIcon />
            </div>
           <div className="nav-header">
                <img src={logo} width='80px'/>
           </div>
           {navigationBtn.map((item, index) => 
                <Link key={index} to={item.path} onClick={() => handleActiveBtn(index)}>
                    <div    className='navBtn'
                            onClick={handleClose}
                            ref={(el) => activePageRef.current[index] = el}>
                            {item.btnIcon}
                            <span>{item.btnName}</span>
                    </div>
                </Link>
            )}
           
        </nav>
    )
}