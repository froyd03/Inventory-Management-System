import '../../styles/global.css'
import '../Login/Login.css'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export default function Login(){
    return(
        <section>
            <div className="logo">
                <HttpsOutlinedIcon /> 
            </div>
            <div className="login">
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
                        <input type="password" placeholder='password'/>
                        <RemoveRedEyeOutlinedIcon />
                    </div>
                </div>
            </div>
        </section>
    )
}