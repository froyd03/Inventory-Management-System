import '../../styles/global.css'
import '../Login/Login.css'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import logoBrand from '../../assets/logo.png'
import { useEffect, useState } from 'react';

export default function Login(){

    const [isShowPassword, setShowPassword] = useState(false);
    const [toText, setToText] = useState("password");
    function handleShowPassword(){
        setShowPassword(p => !p);
    }

    return(
        <section>
            <div className="logo">
               <img src={logoBrand} width='200px' alt="" />
            </div>
            <div className="login">
               <img src={logoBrand} width='60px' alt="" />
                <h2>Log in to your account</h2>
                <p>Welcome back! Please enter your details.</p>
                <div className="inputFields">
                    <label>Email</label>
                    <div className="inp-container">
                        <PersonOutlineOutlinedIcon color='primary'/>
                        <input type="text" placeholder='delacruz@gmail.com' />
                    </div>
                    <label>Password</label>
                    <div className="inp-container">
                        <HttpsOutlinedIcon color='primary'/>
                        <input type={isShowPassword ? "text":"password"} placeholder='Password'/>
                        {isShowPassword ? <RemoveRedEyeOutlinedIcon onClick={handleShowPassword} />  : 
                                          <VisibilityOffOutlinedIcon onClick={handleShowPassword } />}
                    </div>
                </div>
                <button className='sign-in'>Sign in</button>
                <button className='createAcc'>Create Account</button>
            </div>
        </section>
    )
}