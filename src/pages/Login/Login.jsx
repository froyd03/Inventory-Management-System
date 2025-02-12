import '../../styles/global.css'
import '../Login/Login.css'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import logoBrand from '../../assets/logo.png'
import { useEffect, useRef, useState } from 'react';

export default function Login(){

    const [isShowPassword, setShowPassword] = useState(false);
    const [toText, setToText] = useState("password");
    function handleShowPassword(){
        setShowPassword(p => !p);
    }

    const [isloginForm, setLoginForm] = useState(true);
    function handleCreateAccount(){
        setLoginForm(f => !f);
    }

    const NEWnameRef  = useRef(); 
    const NEWgmailRef  = useRef(); 
    const NEWpasswordRef  = useRef(); 

    function handleCreateName(e){
        const NAME = e.target.value.trim();

        if((!isNaN(NAME.charAt(NAME.length-1))) && NAME){
            NEWnameRef.current.style.setProperty("--dynamicText", '"No numbers & symbols in name."');
        }else{
            NEWnameRef.current.style.setProperty("--dynamicText", '""')
        }
    }

    function handleCreateGmail(e){
        const userGmail = e.target.value;
        if(!userGmail.includes('@gmail.com') && userGmail){
            NEWgmailRef.current.style.setProperty("--dynamicText", '"@gmail.com is missing"');
        }else{
            NEWgmailRef.current.style.setProperty("--dynamicText", '""')
        }
    }

    function handleCreatePass(e){
        const userPassword = e.target.value;
        const includeSymbols = /[-@/_$#]/.test(userPassword);
        const includeNumbers = /[1234567890]/.test(userPassword);

        if(userPassword.length < 8){
            NEWpasswordRef.current.style.setProperty("--dynamicText", '"at least 8 characters length"');
        }else if(!includeSymbols){
            NEWpasswordRef.current.style.setProperty("--dynamicText", '"at least one symbol character"');
        }else if(!includeNumbers){
            NEWpasswordRef.current.style.setProperty("--dynamicText", '"include some numbers"')
        }else{
            NEWpasswordRef.current.style.setProperty("--dynamicText", '""')
        }
    }

    return(
        <section>
            <div className="logo">
               <img src={logoBrand} width='220px' alt="" />
            </div>
            {isloginForm && <div className="login">
               <img src={logoBrand} width='60px' alt="" />
                <h2>Log in to your account</h2>
                <p>"Welcome back! Please enter your details."</p>
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
                <button className='createAcc' onClick={handleCreateAccount}>Create Account</button>
            </div>}

            {!isloginForm && <div className="login">
               <img src={logoBrand} width='60px' alt="" />
                <h2>Create an account</h2>
                <p>Join us today! Create your account to get started.</p>
                <div className="inputFields">
                    <label>Name*</label>
                    <div ref={NEWnameRef} className="inp-container">
                        <input onChange={handleCreateName} type="text" placeholder='Juan Dela Cruz' />
                    </div>
                    <label>Email*</label>
                    <div ref={NEWgmailRef} className="inp-container">
                        <input onChange={handleCreateGmail} type="email" placeholder='delacruz@gmail.com' />
                    </div>
                    <label>Password*</label>
                    <div ref={NEWpasswordRef} className="inp-container">
                        <input onChange={handleCreatePass} type={isShowPassword ? "text":"password"} placeholder='Password'/>
                        {isShowPassword ? <RemoveRedEyeOutlinedIcon onClick={handleShowPassword} />  : 
                                          <VisibilityOffOutlinedIcon onClick={handleShowPassword } />}
                    </div>
                </div>
                <button className='sign-in'>Get Started</button>
                <button className='createAcc' onClick={handleCreateAccount}>Sign Up</button>
            </div>}
        </section>
    )
}