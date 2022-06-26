import React, { useEffect, useState, useCallback } from 'react'
import PackageItem from './PackageItem'
import Axios from 'axios'
import '../fullcss/NavAllPackagesCss/NavPackagesCss.css'

const AllPackages = (props) => {
  const [packages, setPackages] = useState([])
  const [travel, setTravel] = useState("any")
  const [nights, setNights] = useState("any")
  const [price, setPrice] = useState("any")
  const [date, setDate] = useState("any")
  var monthYear =[]
  const month = ["any","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const d = new Date();
  // let monthName = month[d.getMonth()];
  let year = d.getFullYear();
  var i=0
  let index = d.getMonth()+1
  monthYear.push(
    {
      'year':'',
      'month':'any'
    }
  )
  while (i<12) {
    if(index <=12){

      monthYear.push({
        'year':year,
        'month':month[index]
      })
    }
    else{

      monthYear.push({
        'year':year+1,
        'month':month[index-12]
      })
    }
    index=index+1
    i=i+1
  }
  // console.log(monthYear)

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
    Axios.get(` http://localhost:5000/api/products/getpackages?travelmode=${e.target.value}&nights=${nights}&price=${price}&month=${date}`, {
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
    Axios.get(` http://localhost:5000/api/products/getpackages?travelmode=${travel}&nights=${e.target.value}&price=${price}&month=${date}`, {
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

  const priceOnChange = (e) =>{
    e.preventDefault();
    setPrice(e.target.value)
    Axios.get(` http://localhost:5000/api/products/getpackages?travelmode=${travel}&nights=${nights}&price=${e.target.value}&month=${date}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(function (response) {
      console.log("set");
      setPackages(response.data)
      console.log(packages);
      if (packages) {
        console.log("nothing1");
      }
    })
      .catch(function (error) {
        console.log(error)
        props.promptAlert(error.response.data.message, "danger")
      });
  }


  const dateOnChange = (e) =>{
    e.preventDefault();
    console.log("target");
    setDate(e.target.value)
    console.log(e.target.value);
    Axios.get(` http://localhost:5000/api/products/getpackages?travelmode=${travel}&nights=${nights}&price=${price}&month=${e.target.value}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(function (response) {
      console.log("set3");
      setPackages(response.data)
      console.log(packages);
      if (packages) {
        console.log("nothing3");
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
            <select name="room" value={price} onChange={(e) => { priceOnChange(e) }}  className="form-control tm-select" id="inputRoom">
              <option label='any' value="any">Any</option>
              <option label='< 7000 Rs' value="7kless" >less than 7k</option>
              <option label='7k Rs - 13k Rs' value="7kto13k">7k to 13k</option>
              <option label='13k - 20k Rs' value="13kto20k">13k to 20k</option>
              <option label='>20,0000Rs' value="20kmore">greater than 20k</option>
            </select>
          </div>

          <div className='packitem'>
            <label htmlFor="inputRoom">Month Of Travel</label>
            <select name="room" value={date} onChange={(e) => { dateOnChange(e) }} className="form-control tm-select" id="inputRoom">
            {monthYear.map(({ month, year }) => {
              // console.log(month+year);
              return <option label={month+' '+year} value={month+' '+year} ></option>
            })}
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