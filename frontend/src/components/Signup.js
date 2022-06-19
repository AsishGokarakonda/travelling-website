import React,{useState} from 'react'
import '../fullcss/signupCss/login.css'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

const Signup = (props) => {
  const navigate = useNavigate()
  const host = "http://localhost:5000"
  const [creds, setCreds] = useState({ "FirstName": "", "LastName": "", "MobileNumber": "", "Email": "", "Address": "", "DateOfBirth": "","Username":"","Password":"" })
  const handleOnChange = (e) => {
    console.log(e.target.value);
      setCreds({ ...creds, [e.target.name]: e.target.value })
      console.log(creds)
  }
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    // console.log(creds);
    await Axios.post(`${host}/api/auth/createuser`, creds, {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
  }).then(function (response) {
      props.promptAlert("Sign up successfully...Please login with your credentials", "success")
      console.log(response);
      console.log(response.data.Authorization);
      navigate("/login");
  })
      .catch(function (error) {
          console.log(error)
          props.promptAlert(error.response.data.message, "danger")
      });
}



  return (
    <div>
      <div className="wrapper fadeInDown">
        <div id="formContent" style={{ marginTop: "150px", maxWidth: "845px" }}>
          <h2 className="active"> Sign Up </h2>
          {/* <h2 className="inactive underlineHover">Sign Up </h2> */}
          <form  onSubmit={handleOnSubmit}>
            <div style={{ display: "flex" }}>
              {/* <label htmlFor="First Name">First Name</label> */}
              <input type="text" id="login" className="fadeIn second" value={creds.FirstName} onChange={handleOnChange} name="FirstName" placeholder="First Name" required />
              <input type="text" id="login" className="fadeIn second" value={creds.LastName} onChange={handleOnChange} name="LastName" placeholder="Last Name" required />
            </div>
            <div style={{ display: "flex"}}>
              <input type="text" id="login" className="fadeIn second" value={creds.MobileNumber} onChange={handleOnChange} name="MobileNumber" placeholder="mobile Number" required />
              <input type="text" id="login" className="fadeIn second" value={creds.Email} onChange={handleOnChange} name="Email" placeholder="Email" required />
            </div>
            <input type="text" id="password" className="fadeIn third" value={creds.Address} onChange={handleOnChange} name="Address" placeholder="Address" required />

            <div style={{width:"50%",minWidth:"276px",margin:"auto"}}>
              <div style={{fontWeight:"bold"}}>Date of birth</div> 
              <input type="date" id='dob' className='fadeIn third' value={creds.DateOfBirth} onChange={handleOnChange} name='DateOfBirth' placeholder='dateofbirth' required />
            </div>
            <div style={{ display: "flex" }}>
              {/* <label htmlFor="First Name">First Name</label> */}
            <input type="text" id="login" className="fadeIn second" value={creds.Username} onChange={handleOnChange} name="Username" placeholder="username" required minLength="3" />
            <input type="text" id="password" className="fadeIn third" value={creds.Password} onChange={handleOnChange} name="Password" placeholder="password" minLength="5" required />
            </div>


            <input type="submit" className="fadeIn fourth" value="Sign Up" />
          </form>

        </div>
      </div>
    </div>


  )
}

export default Signup