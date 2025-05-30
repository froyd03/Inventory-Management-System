import '../../styles/global.css'
import '../Login/Login.css'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import logoBrand from '../../assets/logo.png'
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const navigate = useNavigate();   

    useEffect(() => {
        fetch("http://localhost/Inventory-Management-System/backend/auth/session.php", {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(value => {
            if (value.isRedirect) {
                navigate("/dashboard");
            } else {
                navigate("/");
            }
        })
        .catch(error => {
            console.error("Error checking session:", error);
            navigate("/");
        });
    }, [navigate]);
    
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

    const [name, setName] = useState();
    function handleCreateName(e){
        const NAME = e.target.value.trim();
        setName("");
        if((!isNaN(NAME.charAt(NAME.length-1))) && NAME){
            NEWnameRef.current.style.setProperty("--dynamicText", '"Only letters and white space allowed"');
        }else{
            setName(NAME);
            NEWnameRef.current.style.setProperty("--dynamicText", '""');
        }
    }

    const [gmail, setGmail] = useState("");
    function handleCreateEmail(e){
        const userEmail = e.target.value;
        const validEmail = userEmail.includes('@') && userEmail.includes('.');
        setGmail("");

        if(!validEmail && userEmail){
            NEWgmailRef.current.style.setProperty("--dynamicText", '"@ and . is missing"');
        }else{
            setGmail(userEmail);
            NEWgmailRef.current.style.setProperty("--dynamicText", '""')
        }
    }

    const [password, setPassword] = useState();
    function handleCreatePass(e){
        const userPassword = e.target.value;
        const correctPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-z\d@$!%*?&\-_]{8,}$/.test(userPassword);
        
        if(!correctPattern){
            setMessage("Minimum 8 characters, at least one uppercase letter (A-Z), one lowercase letter (a-z), one number (0-9), and one special character (@, $, !, %, *, ?, &, -, _)");
            NEWpasswordRef.current.classList.add("invalidInput");
            setPassword('');
        }else{
            setMessage('');
            NEWpasswordRef.current.classList.remove("invalidInput");
            setPassword(userPassword);
        }
    }

    const [validPassword, setValidPassword] = useState(false);
    useEffect(() => {
        
        setValidPassword(name && gmail && password);
 
    }, [name, gmail, password]);

    const [message, setMessage]= useState("");
    async function signUpSubmitForm(event){
        event.preventDefault();     
        if(validPassword){
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", gmail);
            formData.append("password", password);
    
            try{
                const response = await fetch("http://localhost/Inventory-Management-System/backend/auth/signup.php", {
                    method: "POST",
                    body: formData
                });
            
                const result = await response.json();
                setMessage(result.message);

                if(result.confirm === "success") setLoginForm(true);
            }catch(error){
                console.error("Error submitting form:", error);
            }
        }else{
            setMessage('Complete all fields before submitting.')
        }
    }
    const [loginEmail, setLoginEmail] = useState("");
    function handleLoginEmail(e){
        setLoginEmail(e.target.value);
        setLoginMessage("");
    }

    const [loginPassword, setLoginPassword] = useState("");
    function handleLoginPassword(e){
        setLoginPassword(e.target.value);
        setLoginMessage("");
    }

    const [loginMessage, setLoginMessage] = useState("");
    async function loginSubmitForm(event){
        event.preventDefault();
        const formData = new FormData();
        formData.append("email", loginEmail);
        formData.append("password", loginPassword);

        if(loginEmail && loginPassword){
            try{
                const response = await fetch('http://localhost/Inventory-Management-System/backend/auth/login.php', {
                    method: "POST",
                    credentials: "include",
                    body: formData
                });
                
                const result = await response.json();
                if(result.isAuthenticated){
                    navigate("/dashboard");
                }else{
                    setLoginMessage("Incorrect username and password.");
                }
            }catch(error){
                console.log("from login.jsx: ", error);
            }
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
                        <input type="text" onChange={handleLoginEmail} placeholder='delacruz@gmail.com' />
                    </div>
                    <label>Password</label>
                    <div className="inp-container">
                        <HttpsOutlinedIcon color='primary'/>
                        <input type={isShowPassword ? "text":"password"} onChange={handleLoginPassword} placeholder='Password'/>
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
                        <input onChange={handleCreateName} type="text" placeholder='Juan Dela Cruz' />
                    </div>
                    <label>Email*</label>
                    <div ref={NEWgmailRef} className="inp-container">
                        <input onChange={handleCreateEmail} type="email" placeholder='delacruz@gmail.com' />
                    </div>
                    <label>Password*</label>
                    <div ref={NEWpasswordRef} className="inp-container">
                        <input onChange={handleCreatePass} type={isShowPassword ? "text":"password"} placeholder='Password'/>
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