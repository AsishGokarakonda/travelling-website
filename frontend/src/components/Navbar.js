import React from 'react'
import { Link } from 'react-router-dom'
import '../fullcss/mainpageCss/css/mainpage-bootstrap.css'
import '../fullcss/mainpageCss/css/templatemo-style.css'
import '../fullcss/mainpageCss/css/datepicker.css'
import '../fullcss/mainpageCss/slick/slick.css'
import '../fullcss/mainpageCss/slick/slick-theme.css'
import { useLocation,useNavigate } from 'react-router-dom'

const Navbar = (props) => {
  const loc = useLocation()
  const navigate = useNavigate()
  const handleOnLogout = () =>{
    props.promptAlert("Logged out successfully", "warning")
    console.log("Hi");
    localStorage.removeItem("Authorization")
    navigate("/login")
    // console.log(localStorage.getItem("Authorization"))
  }

  return (
    <div className="tm-top-bar" id="tm-top-bar">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg narbar-light">
            <Link className="navbar-brand mr-auto" to="/">
              <img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="Site logo" />
              
            </Link>
            <button type="button" id="nav-toggle" className="navbar-toggler collapsed" data-toggle="collapse" data-target="#mainNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div id="mainNav" className="collapse navbar-collapse tm-bg-white">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className={`nav-link ${loc.pathname === "/" ? "active" : ""}`} style={{ fontSize: "15px" }} to="/">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${loc.pathname === "/topdestinations" ? "active" : ""}`} style={{ fontSize: "15px" }} to="/topdestinations">Top Destinations</Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${loc.pathname === "/allpackages" ? "active" : ""}`} style={{ fontSize: "15px" }} to="/allpackages">Packages</Link>
                </li>
                {!localStorage.getItem("Authorization") ? <li className="nav-item">
                  <Link className={`nav-link ${loc.pathname === "/login" ? "active" : ""}`} style={{ fontSize: "15px" }} to="/login">Login/Signup</Link>
                </li>
                  : <li className="nav-item">
                    <Link className="nav-link" style={{ fontSize: "15px" }} onClick={handleOnLogout} to="/login">Logout</Link>
                  </li>

                }
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar