import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from 'react';
import './Nav.css';

export default function Nav(){

    const navigationBtn = [
        {
            btnName:'Dashboard', 
            path: '/',
            btnIcon: <HomeOutlinedIcon sx={{fontSize: 25}}/>
        },
        {
            btnName:'Inventory', 
            path: '/slot',
            btnIcon:  <Inventory2OutlinedIcon sx={{fontSize: 25}}/>
        },
        {
            btnName:'Reports', 
            path: '/client',
            btnIcon: <AssessmentOutlinedIcon sx={{fontSize: 25}}/>
        },
        {
            btnName:'Orders', 
            path: '/transaction',
            btnIcon: <LocalShippingOutlinedIcon sx={{fontSize: 25}} />
        },
        {
            btnName:'Manage Store', 
            path: '/transaction',
            btnIcon: <ListAltOutlinedIcon sx={{fontSize: 25}} />
        }
    ]

    const activePageRef = useRef([]);
    const [clickedIndex, setClickedIndex] = useState(0);

    useEffect(() => {
        handleActiveBtn(clickedIndex)
    }, [clickedIndex])

    
    function handleActiveBtn(index){
        activePageRef.current.forEach(element => {
            if(element.classList.contains('active')){
                element.classList.remove('active')
            }
        })
        setClickedIndex(index);
        activePageRef.current[index].classList.add('active');
    }

    const closeIconRef = useRef();
    function handleClose(){
        closeIconRef.current.classList.remove('active');
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
                <Link key={index}  to='/ ' onClick={() => handleActiveBtn(index)}>
                    <div    className='navBtn'
                            ref={(el) => activePageRef.current[index] = el}>
                            {item.btnIcon}
                            <span>{item.btnName}</span>
                    </div>
                </Link>
            )}
           
        </nav>
    )
}