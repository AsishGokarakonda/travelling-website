import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import '../fullcss/mainpageCss/css/mainpage-bootstrap.css'
import '../fullcss/mainpageCss/css/templatemo-style.css'
import '../fullcss/mainpageCss/css/datepicker.css'
import '../fullcss/mainpageCss/slick/slick.css'
import '../fullcss/mainpageCss/slick/slick-theme.css'
// import dots from './img/dots-3.png'
// import img1 from './img/tm-img-01.jpg'
// import img2 from './img/tm-img-02.jpg'
// import img3 from './img/tm-img-03.jpg'
// import img4 from './img/tm-img-04.jpg'
// import noimage from './img/noImage.jpeg'
import PackageItem from './PackageItem'
import Axios from 'axios'
const Mainpage = (props) => {
  const [packages, setPackages] = useState([])

  useEffect(() => {
    // console.log(packages);

    window.addEventListener('scroll',()=>{
      if(window.scrollY > 100){
        let nav = document.querySelector(".tm-top-bar")
        nav.classList.add("active")
      }else{
        let nav = document.querySelector(".tm-top-bar")
        // nav.removeClass("active")
        nav.classList.remove("active")
      }
    })


    Axios.get(`http://localhost:5000/api/products/gettoppackages`,{
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
  }).then(function (response) {
      // console.log(response);
      // console.log(response.data);
      setPackages(response.data)
  })
      .catch(function (error) {
          console.log(error)
          props.promptAlert(error.response.data.message, "danger")
      });

  }, )

 
  return (
    <div className="tm-main-content" id="top">
      <div className="tm-top-bar-bg"></div>
      



      <section className="tm-banner">
        <div className="tm-container-outer tm-banner-bg">
          <div className="container">

            <div className="row tm-banner-row tm-banner-row-header">
              <div className="col-xs-12">
                <div className="tm-banner-header">
                  <h1 className="text-uppercase tm-banner-title">Welcome</h1>
                  <p className="tm-banner-subtitle">We assist you to choose the best.</p>
                </div>
              </div>
            </div>
            <div className="row tm-banner-row" id="tm-section-search">

              <form action="index.html" method="get" className="tm-search-form tm-section-pad-2">
                <div className="form-row tm-search-form-row">
                  <div className="form-group tm-form-group tm-form-group-pad tm-form-group-1">
                    <label htmlFor="inputCity">From</label>
                    <input name="destination" type="text" className="form-control" id="inputCity" placeholder="Type your departure place..." required />
                  </div>
                  <div className="form-group tm-form-group tm-form-group-pad tm-form-group-1">
                    <label htmlFor="inputCity">To</label>
                    <input name="destination" type="text" className="form-control" id="inputCity" placeholder="Type your destination place..." required/>
                  </div>

                </div>
                <div className="form-row tm-search-form-row">
                <div className="form-group tm-form-group tm-form-group-1">
                    <div className="form-group tm-form-group tm-form-group-pad tm-form-group-2">
                      <label htmlFor="inputRoom">Transport Type</label>
                      <select name="room" defaultValue="Flight" className="form-control tm-select" id="inputRoom">
                        <option value="1" >Flight</option>
                        <option value="2">Train</option>
                        <option value="3">Bus</option>
                        <option value="3">Cab</option>
                      </select>
                    </div>
                    <div className="form-group tm-form-group tm-form-group-pad tm-form-group-2">
                      <label htmlFor="inputRoom">Departure Date</label>
                      <input type="date" style={{height:"45px"}} className="form-control" required/>
                    </div>
                  </div>
                  
                  <div className="form-group tm-form-group tm-form-group-pad tm-form-group-1">
                    <label htmlFor="btnSubmit">&nbsp;</label>
                    <button type="submit" className="btn btn-primary tm-btn tm-btn-search text-uppercase" id="btnSubmit">Check Availability</button>
                  </div>
                </div>
              </form>

            </div>
            <div className="tm-banner-overlay"></div>
          </div>
        </div>
      </section>





      {/* <div className="tab-pane fade show active" id="4a">
          <h1 style={{textAlign:"center",marginBottom:"30px"}}>Top packages</h1>
        <div className="tm-recommended-place-wrap">
          <div className="tm-recommended-place">
            <img src={img1} alt={noimage} className="img-fluid tm-recommended-img" />
            <div className="tm-recommended-description-box">
              <h3 className="tm-recommended-title">Asia Resort Hotel</h3>
              <p className="tm-text-highlight">Singapore</p>
              <p className="tm-text-gray">Sed egestas, odio nec bibendum mattis, quam odio hendrerit risus, eu varius eros lacus sit amet lectus. Donec blandit luctus dictum...</p>
            </div>
            <Link to="/" className="tm-recommended-price-box">
              <p className="tm-recommended-price">$440</p>
              <p className="tm-recommended-price-link">Continue Reading</p>
            </Link>
          </div>

          <div className="tm-recommended-place">
            <img src={img2} alt={noimage} className="img-fluid tm-recommended-img" />
            <div className="tm-recommended-description-box">
              <h3 className="tm-recommended-title">Nullam eget est a nisl</h3>
              <p className="tm-text-highlight">Yangon, Myanmar</p>
              <p className="tm-text-gray">Sed egestas, odio nec bibendum mattis, quam odio hendrerit risus, eu varius eros lacus sit amet lectus. Donec blandit luctus dictum...</p>
            </div>
            <div id="preload-hover-img"></div>
            <Link to="/" className="tm-recommended-price-box">
              <p className="tm-recommended-price">$450</p>
              <p className="tm-recommended-price-link">Continue Reading</p>
            </Link>
          </div>

          <div className="tm-recommended-place">
            <img src={img3} alt={noimage} className="img-fluid tm-recommended-img" />
            <div className="tm-recommended-description-box">
              <h3 className="tm-recommended-title">Proin interdum ullamcorper</h3>
              <p className="tm-text-highlight">Bangkok, Thailand</p>
              <p className="tm-text-gray">Sed egestas, odio nec bibendum mattis, quam odio hendrerit risus, eu varius eros lacus sit amet lectus. Donec blandit luctus dictum...</p>
            </div>
            <Link to="/" className="tm-recommended-price-box">
              <p className="tm-recommended-price">$460</p>
              <p className="tm-recommended-price-link">Continue Reading</p>
            </Link>
          </div>

          <div className="tm-recommended-place">
            <img src={img4} alt={noimage} className="img-fluid tm-recommended-img" />
            <div className="tm-recommended-description-box">
              <h3 className="tm-recommended-title">Lorem ipsum dolor sit</h3>
              <p className="tm-text-highlight">Vientiane, Laos</p>
              <p className="tm-text-gray">Sed egestas, odio nec bibendum mattis, quam odio hendrerit risus, eu varius eros lacus sit amet lectus. Donec blandit luctus dictum...</p>
            </div>
            <Link to="/" className="tm-recommended-price-box">
              <p className="tm-recommended-price">$470</p>
              <p className="tm-recommended-price-link">Continue Reading</p>
            </Link>
          </div>
        </div>
      </div> */}
      <div className="tab-pane fade show active" id="4a">
      <h1 style={{textAlign:"center",marginBottom:"30px"}}>Top packages</h1>
      {packages.map((packageitem) => {
          return <PackageItem packagedetails={packageitem}  image={packageitem.PackageImg.search(".")!== -1 ? packageitem.PackageImg : "none"} key={packageitem._id}/>
        })}
      </div>



    </div>

  )
}

export default Mainpage