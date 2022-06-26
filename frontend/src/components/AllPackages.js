import React, { useEffect, useState, useCallback } from 'react'
import PackageItem from './PackageItem'
import Axios from 'axios'
import '../fullcss/NavAllPackagesCss/NavPackagesCss.css'

const AllPackages = (props) => {
  const [packages, setPackages] = useState([])
  const [travel, setTravel] = useState("any")
  const [nights, setNights] = useState("any")

  const fetchproducts = useCallback(
    () => {
      Axios.get(`http://localhost:5000/api/products/getpackages`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(function (response) {
        setPackages(response.data)
      })
        .catch(function (error) {
          console.log(error)
          props.promptAlert(error.response.data.message, "danger")
        });
    },
    [props]
  )


  useEffect(() => {

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        let nav = document.querySelector(".tm-top-bar")
        nav.classList.add("active")
      } else {
        let nav = document.querySelector(".tm-top-bar")
        // nav.removeClass("active")
        nav.classList.remove("active")
      }
    })
    fetchproducts();
    console.log("Hi");
  }, [fetchproducts])

  const travelOnChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const temp = e.target.value
    setTravel(temp)
    console.log(travel);
    Axios.get(` http://localhost:5000/api/products/getpackages?travelmode=${e.target.value}&nights=${nights}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(function (response) {
      console.log("set");
      setPackages(response.data)
      console.log(packages);
    })
      .catch(function (error) {
        console.log(error)
        props.promptAlert(error.response.data.message, "danger")
      });
  }

  const durationOnChange = (e) => {
    e.preventDefault();
    setNights(e.target.value)
    Axios.get(` http://localhost:5000/api/products/getpackages?travelmode=${travel}&nights=${e.target.value}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(function (response) {
      console.log("set");
      setPackages(response.data)
      console.log(packages);
      if (packages) {
        console.log("nothing");
      }
    })
      .catch(function (error) {
        console.log(error)
        props.promptAlert(error.response.data.message, "danger")
      });
  }


  // const getfilters = useCallback(() => {
  //   console.log("filters");
  //   console.log(travel);
  //   console.log(nights);
  //   Axios.get(` http://localhost:5000/api/products/getpackages?travelmode=${travel}&nights=${nights}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   }).then(function (response) {
  //     console.log("set");
  //     setPackages(response.data)
  //     console.log(packages);
  //   })
  //     .catch(function (error) {
  //       console.log(error)
  //       props.promptAlert(error.response.data.message, "danger")
  //     });
  // },[nights,packages,travel,props]
  // )


  // useEffect(() => {
  //   getfilters()
  // }, [])


  return (
    <div className="tab-pane fade show active" id="4a" style={{ marginTop: "150px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>All packages</h1>
      <div>
        <div className='allpackdiv'>

          <div className='packitem'>
            <label htmlFor="inputRoom">Duration</label>
            <select name="room" value={nights} onChange={(e) => { durationOnChange(e) }} className="form-control tm-select" id="inputRoom">
              <option label='any' value="any">Any</option>
              <option label='< 8 nights' value="lessnights" >Less than 8 nights</option>
              <option label='8 to 12 nights' value="averagenights">8 to 12 nights</option>
              <option label='> 12 nights' value="morenights">More thatn 12 nights</option>

            </select>
          </div>

          <div className='packitem'>
            <label htmlFor="inputRoom">Cost Per Person</label>
            <select name="room" defaultValue="lsdkjfl" className="form-control tm-select" id="inputRoom">
              <option value="1" >Bus</option>
              <option value="2">Cab</option>
              <option value="3">Train</option>
              <option value="4">Flight</option>
            </select>
          </div>

          <div className='packitem'>
            <label htmlFor="inputRoom">Month Of Travel</label>
            <select name="room" defaultValue="Flight" className="form-control tm-select" id="inputRoom">
              <option value="1" >Bus</option>
              <option value="2">Cab</option>
              <option value="3">Train</option>
              <option value="4">Flight</option>
            </select>
          </div>

          <div className='packitem'>
            <label htmlFor="inputRoom">Travel Mode</label>
            <select name="room" value={travel} className="form-control tm-select" id="inputRoom" onChange={(e) => { travelOnChange(e) }}>
              <option label='any' value="any">Any</option>
              <option label='bus' value="bus">Bus</option>
              <option label='cab' value="cab">Cab</option>
              <option label='train' value="train">Train</option>
              <option label='flight' value="flight">Flight</option>
            </select>
          </div>
        </div>
        <div className='searchdiv'>
          <form className="d-flex destinationform" role="search">
            <input style={{ height: "37px", borderRadius: "2px" }} className="form-control me-2" type="search" placeholder="Type your departure..." aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <form className="d-flex destinationform" role="search">
            <input style={{ height: "37px", borderRadius: "2px" }} className="form-control me-2" type="search" placeholder="Type your destination..." aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
      <div style={{textAlign: "center",marginTop:"60px",fontSize: "40px"}}>
        {packages.length === 0 && "No packages to display"}
      </div>
      {packages.map((packageitem) => {
        return <PackageItem packagedetails={packageitem} image={packageitem.PackageImg.search(".") !== -1 ? packageitem.PackageImg : "none"} key={packageitem._id} />
      })}
    </div>
  )
}

export default AllPackages