import '../styles/global.css'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';

export default function Login(){
    return(
        <section>
            <h2>Log in to your account</h2>
            <p>Welcome back! Please enter your details.</p>

            <div className="inputFields">
                <label>Email</label>
                <div className="user-inp">
                    <PersonOutlineOutlinedIcon color='primary'/>
                    <input type="text" />
                </div>
                <label>Password</label>
                <div className="password-inp">
                    <HttpsOutlinedIcon color='primary'/>
                    <input type="password" />
                </div>
            </div>
        </section>
    )
}