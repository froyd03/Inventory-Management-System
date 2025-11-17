import '../styles/global.css'
import '../styles/Login.css'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import logoBrand from '../assets/logo.png'
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../utils/axios";

export default function Login(){
    const navigate = useNavigate();   

    useEffect(() => {
        async function redirectDashboard(){
            try{
                const {data} = await axios.get("/user/verifyUserToken");
                if(data.isValid){
                    navigate("/dashboard");
                }
            }   
            catch(error){
                if(error.response?.status === 401){
                    navigate("/");
                }
            }
        }
        redirectDashboard();
    }, []);
    
    const [isShowPassword, setShowPassword] = useState(false);
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
    const [message, setMessage]= useState("");

    const [registerData, setRegisterdata] = useState({});
    function handleRegisterForm(e){
        if(e.target.name === "name"){

            const NAME = e.target.value.trim();
            setRegisterdata(data => ({...data, [e.target.name]: ""}))
            if((!isNaN(NAME.charAt(NAME.length-1))) && NAME){
                NEWnameRef.current.style.setProperty("--dynamicText", '"Only letters and white space allowed"');
            }else{
                setRegisterdata(data => ({...data, [e.target.name]: NAME}))
                NEWnameRef.current.style.setProperty("--dynamicText", '""');
            }
        }
        else if(e.target.name === "email"){
            const userEmail = e.target.value;
            const validEmail = userEmail.includes('@') && userEmail.includes('.');
            setRegisterdata(data => ({...data, [e.target.name]: ""}))

            if(!validEmail && userEmail){
                NEWgmailRef.current.style.setProperty("--dynamicText", '"@ and . is missing"');
            }else{
                setRegisterdata(data => ({...data, [e.target.name]: userEmail}))
                NEWgmailRef.current.style.setProperty("--dynamicText", '""')
            }
        }
        else if(e.target.name === "password"){
            const userPassword = e.target.value;
            const correctPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-z\d@$!%*?&\-_]{8,}$/.test(userPassword);
            
            if(!correctPattern){
                setMessage("Minimum 8 characters, at least one uppercase letter (A-Z), one lowercase letter (a-z), one number (0-9), and one special character (@, $, !, %, *, ?, &, -, _)");
                NEWpasswordRef.current.classList.add("invalidInput");
                setRegisterdata(data => ({...data, [e.target.name]: ""}))
            }else{
                setMessage('');
                NEWpasswordRef.current.classList.remove("invalidInput");
                setRegisterdata(data => ({...data, [e.target.name]: userPassword}));
            }
        }
    }

    const [validPassword, setValidPassword] = useState(false);

    async function signUpSubmitForm(event){
        event.preventDefault();

        try{
            const {data} = await axios.post('/user/register', registerData);
            if(data.status){
                localStorage.setItem("token", data.response);
                navigate("/inventory");
            }else{
                setLoginMessage(data.response)
            }
        }catch(error){
            console.error("error submiting form try again!", error);
        }
    }

    const [loginData, setLoginData] = useState({});
    function handleLoginInput(e){
        const {name, value} = e.target;

        if(name === "email"){
            setLoginData(prevData => ({...prevData, [name]: value}));
        }
        else if(name === "password"){
            setLoginData(prevData => ({...prevData, [name]: value}));
        }
        else{
            setLoginMessage(`no existing ${name}`);
        }
        setLoginMessage("");
    }

    const [loginMessage, setLoginMessage] = useState("");
    async function loginSubmitForm(event){
        event.preventDefault();

        try{
            const {data} = await axios.post('/user/login', loginData);

            if(data.status){
                localStorage.setItem("token", data.response);
                navigate("/dashboard");
            }else{
                setLoginMessage(data.response)
            }
            //navigate("/inventory");
        }catch(error){
            console.log("from login.jsx: ", error);
        }
    }

    return(
        <div className='main-container'>
            <div className="logo">
               <img src={logoBrand} width='220px' alt="" />
            </div>
            {isloginForm && 
            
            <form onSubmit={loginSubmitForm} className="login">
               <img src={logoBrand} width='60px' alt="dasd" />
                <h2>Log in to your account</h2>
                <p>Welcome back! Please enter your details.</p>
                <div className="inputFields">
                    <label>Email</label>
                    <div className="inp-container">
                        <PersonOutlineOutlinedIcon color='primary'/>
                        <input type="text" onChange={handleLoginInput} name="email" placeholder='delacruz@gmail.com' />
                    </div>
                    <label>Password</label>
                    <div className="inp-container">
                        <HttpsOutlinedIcon color='primary'/>
                        <input type={isShowPassword ? "text":"password"} onChange={handleLoginInput} name="password" placeholder='Password'/>
                        {isShowPassword ? <RemoveRedEyeOutlinedIcon onClick={handleShowPassword} />  : 
                                          <VisibilityOffOutlinedIcon onClick={handleShowPassword } />}
                    </div>
                </div>
                <p className='messageError'>{loginMessage}</p>
                <button type='submit' className='sign-in'>Sign in</button>
                <button className='createAcc' onClick={handleCreateAccount}>Create Account</button>
            </form>}

            {!isloginForm && 
            <form onSubmit={signUpSubmitForm} className='login'>
                <img src={logoBrand} width='60px' alt="" />
                <h2>Create an account</h2>
                <p>Join us today! Create your account to get started.</p>
                <div className="inputFields">
                    <label>Name*</label>
                    <div ref={NEWnameRef} className="inp-container">
                        <input onChange={handleRegisterForm} name="name" type="text" placeholder='Juan Dela Cruz' />
                    </div>
                    <label>Email*</label>
                    <div ref={NEWgmailRef} className="inp-container">
                        <input onChange={handleRegisterForm} name="email" type="email" placeholder='delacruz@gmail.com' />
                    </div>
                    <label>Password*</label>
                    <div ref={NEWpasswordRef} className="inp-container">
                        <input onChange={handleRegisterForm} name="password" type={isShowPassword ? "text":"password"} placeholder='Password'/>
                        {isShowPassword ? <RemoveRedEyeOutlinedIcon onClick={handleShowPassword} />  : 
                                        <VisibilityOffOutlinedIcon onClick={handleShowPassword } />}
                    </div>
                </div>
                <p className='messageError'>{message}</p>
                <button className='sign-in'>Get Started</button>
                <button className='createAcc' onClick={handleCreateAccount}>Sign Up</button>
            </form>}
        </div>
    )
}