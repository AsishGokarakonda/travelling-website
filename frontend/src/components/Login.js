import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../fullcss/signupCss/login.css'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const navigate = useNavigate()
    const host = "http://localhost:5000"
    const [creds, setCreds] = useState({ "Email": "", "Password": "" })
    const handleOnChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
        console.log(creds)
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        await Axios.post(`${host}/api/auth/loginuser`, creds, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            props.promptAlert("Logged in successfully", "success")
            console.log(response);
            console.log(response.data.token);
            localStorage.setItem("Authorization", response.data.token)
            navigate("/");
        })
            .catch(function (error) {
                console.log(error)
                props.promptAlert(error.response.data.message, "danger")
            });
    }

    return (
        <>
            <div className="wrapper fadeInDown">
                <div id="formContent" style={{ marginTop: "180px" }}>
                    <h2 className="active"> Sign In </h2>
                    {/* <h2 className="inactive underlineHover">Sign Up </h2> */}
                    <form onSubmit={handleOnSubmit}>
                        <input type="email" id="login" className="fadeIn second" value={creds.Email} onChange={handleOnChange} name="Email" placeholder="Email" required />
                        <input type="text" id="password" className="fadeIn third" name="Password" value={creds.Password} onChange={handleOnChange} placeholder="Password"required />
                        <input type="submit" className="fadeIn fourth" value="Log In" />
                    </form>

                    <div id="formFooter">
                        <Link className="underlineHover" style={{ color: "black" }} to="/">Forgot Password?</Link>
                    </div>

                    <div id="formFooter">
                        <div style={{ color: "black" }} href="#">Don't have account? <Link className="underlineHover" to="/signup">Create account</Link> </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login