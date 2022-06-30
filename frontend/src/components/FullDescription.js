import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import styles2 from '../fullcss/FullDescription/FullDescriptionCss.module.css'
// import { MdOutlineFlight } from 'react-icons/md'
import { FaHotel, FaPlaneDeparture, FaPlaneArrival,FaInfoCircle } from 'react-icons/fa'
import { FaCameraRetro } from 'react-icons/fa'
import { AiFillCar } from 'react-icons/ai'
import { IoFastFoodSharp } from 'react-icons/io5'
import {BiHotel} from 'react-icons/bi'
import { Link } from 'react-router-dom';

const FullDescription = (props) => {
  const [packages, setPackages] = useState({
    "PackageName": "", "PackageDescription": "",
    "PackageCost": null, "PackageDestination": "", "PackageRoute": "", "PackageStartDate": null, "PackageEndDate": null, "PackageMeals": null, "PackageHotels": null, "PackageTransfers": null, "PackageActivites": null, "PackageDays": null, "PackageType": "", "PackageImg": ""
  })
  const [packoverview, setPackoverview] = useState([{ 'fulldescription': "", 'highlights': "", 'traveldetails': "", 'accommodation': "", 'activities': "", 'meals': "", 'transfers': "" }])
  const [datestr, setDatestr] = useState("")
  const [totaldays, setTotaldays] = useState([])
  const [day, setDay] = useState(1)
  const [eachdaypack, setEachdaypack] = useState({ "daynumber": 1, "fulldescription": "", "accommodation": "", "meals": "", "imagefilename": "" })
  const params = useParams();
  const id = params.id;
  const fetchaproduct = useCallback(
    () => {
      Axios.get(`http://localhost:5000/api/products/getparticularpack/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(function (response) {
        setPackages(response.data)

      })
        .catch(function (error) {
          console.log(error)
          props.promptAlert(error.response['data'], "danger")
        });
    },
    [props, id]
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
    fetchaproduct()

  }, [fetchaproduct])

  // useEffect(() => {
  //   Axios.get(`http://localhost:5000/api/products/getparticularpack/${id}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //     }
  //   }).then(function (response) {
  //     setPackages(response.data)
  //   })
  //     .catch(function (error) {
  //       console.log(error)
  //       props.promptAlert(error.response['data'], "danger")
  //     });

  //     Axios.get(`http://localhost:5000/api/packinfo/getpackoverview/${id}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //       }
  //     }).then(function (response) {
  //       setPackoverview(response.data)
  //     })
  //       .catch(function (error) {
  //         console.log(error)
  //         props.promptAlert(error.response['data'], "danger")
  //       });
  // })
  // console.log(packages);

  const handleOnClick = (e) => {
    //get id of the clicked div
    const id = e.target.id;
    if (e.target.id === "EachDayPlan") {
      e.target.classList.add(styles2.active);
      document.getElementById("overviewDesc").classList.remove(styles2.active);
      document.getElementById("fullcontaineroverview").style.display = "none";
      document.getElementById("fullcontaineritinerary").style.display = "block";
    }
    if (e.target.id === "overviewDesc") {
      e.target.classList.add(styles2.active);
      document.getElementById("EachDayPlan").classList.remove(styles2.active);
      document.getElementById("fullcontaineroverview").style.display = "block";
      document.getElementById("fullcontaineritinerary").style.display = "none";

    }
    console.log(id);

  }

  // var decideTravelIcon = <div style={{ textAlign: "center" }}><MdOutlineFlight size={"19"} /></div>
  // var travel = "flight"
  // switch (packages.PackageTravel) {
  //   case "flight":
  //     decideTravelIcon = <div style={{ textAlign: "center" }}><MdOutlineFlight size={"19"} /></div>
  //     if (packages.TravelsNumber > 1) {
  //       travel = "flights"
  //     } else {
  //       travel = "flight"
  //     }
  //     break;
  //   case "train":
  //     decideTravelIcon = <div style={{ textAlign: "center" }}><FaTrain size={"19"} /></div>
  //     if (packages.TravelsNumber > 1) {
  //       travel = "trains"
  //     } else {
  //       travel = "train"
  //     }
  //     break;
  //   default:
  //     break;
  // }

  const getpackoverview = useCallback(
    () => {
      Axios.get(`http://localhost:5000/api/packinfo/getpackoverview/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(function (response) {
        setPackoverview(response.data)
      })
        .catch(function (error) {
          console.log(error)
          props.promptAlert(error.response['data'], "danger")
        });
    },
    [props, id]
  )


  const geteachpack = useCallback( () =>{
    Axios.get(`http://localhost:5000/api/packinfo/geteachdaypack/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'day': 1
      }
    }).then(function (response) {
      setEachdaypack(response.data)
      console.log(response.data);
    })
      .catch(function (error) {
        console.log(error.response['data'])
        props.promptAlert(error.response['data'], "danger")
      });
  },[props,id]
  )

  useEffect(() => {
    getpackoverview()
    geteachpack()
  }, [getpackoverview,geteachpack, props, id])
  // console.log(packoverview[0]);

  useEffect(() => {
    var date = new Date(packages.PackageEndDate)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    var str = ''
    str = year + '-' + month + '-' + dt;
    setDatestr(str)
    var arr = [];
    for (let index = 0; index < packages.PackageDays; index++) {
      arr.push(index + 1)
    }
    setTotaldays(arr)
  }, [packages.PackageEndDate, packages.PackageDays])

  const dayOnChange = (e) => {
    setDay(e.target.value)
    Axios.get(`http://localhost:5000/api/packinfo/geteachdaypack/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'day': e.target.value
      }
    }).then(function (response) {
      setEachdaypack(response.data)
      console.log(response.data);
    })
      .catch(function (error) {
        console.log(error)
        props.promptAlert(error.response['data'], "danger")
      });
  }
  return (
    <div className='container' style={{ marginTop: "150px" }}>
      {/* <div id='MyCarouselTravel' style={{ marginTop: "150px" }}>

          <img className='mySlidesTravel' src={process.env.PUBLIC_URL + '/Goa/1.jpg'} alt="" />
          <img className='mySlidesTravel' src={process.env.PUBLIC_URL + '/Goa/2.jpg'} alt="" />
          <img className='mySlidesTravel' src={process.env.PUBLIC_URL + '/Goa/3.jpg'} alt="" />

          </div> */
      }

      <div className={styles2.headingDesc}>

        {packages.PackageName} - {packages.PackageDays > 1 ? `${packages.PackageDays} Days` : `${packages.PackageDays} Day`} Package
      </div>
      <div className="contFullDesc" style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", flexFlow: "wrap", marginBottom: "20px" }}>
        {/* <div className="card" style={{ width: "18rem", borderRadius: "13px", marginTop: "10px", marginRight: "0px" }}>
          <img src={process.env.PUBLIC_URL + '/img/departureImg.png'} style={styles.roundimage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Departure</h5>
            <p className="card-text">We will departure at <span style={{ fontWeight: "bold", fontSize: "15px" }}>{packages.PackageDeparture}</span> </p>
          </div>
        </div> */}
        <div className="card" style={{ width: "18rem", borderRadius: "13px", marginTop: "10px", marginRight: "0px" }}>
          <img src={process.env.PUBLIC_URL + '/img/destinationImg.png'} style={styles.roundimage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Destination</h5>
            <p className="card-text">We will reach  <span style={{ fontWeight: "bold", fontSize: "15px" }}>{packages.PackageDestination}</span> and start holiday trip.
              <p style={{ fontWeight: "bold", fontSize: "15px" }}>
                {packages.PackageRoute}
              </p>
            </p>

          </div>
        </div>

        <div className="card" style={{ width: "18rem", borderRadius: "13px", marginTop: "10px", marginRight: "0px" }}>
          <img src={process.env.PUBLIC_URL + '/img/cost.png'} style={styles.roundimage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Cost</h5>
            <p className="card-text">Cost of this package is <span style={{ fontWeight: "bold", fontSize: "15px" }}>Rs {packages.PackageCost}</span> without any travelling charges.</p>
          </div>
        </div>

        <div className="card" style={{ width: "18rem", borderRadius: "13px", marginTop: "10px", marginRight: "0px" }}>
          <img src={process.env.PUBLIC_URL + '/img/clock.png'} style={styles.roundimage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">End Date</h5>
            <p className="card-text">This package ends on <span style={{ fontWeight: "bold", fontSize: "15px" }}>{datestr}</span></p>
          </div>
        </div>

      </div>




      <div style={styles.contentsDesc} className="d-flex justify-content-around">
        {/* <div>
          {decideTravelIcon}
          <p className="fontChangeWidth" style={{ textAlign: "center" }}>{packages.TravelsNumber} <span >{travel}</span>  </p>
        </div> */}

        <div>
          <div style={{ textAlign: "center" }}>
            <FaHotel size={"19"} />
          </div>
          <p className="fontChangeWidth" style={{ textAlign: "center" }}>{packages.PackageHotels} <span >{packages.PackageHotels > 1 ? " Hotels" : " Hotel"}</span> </p>
        </div>

        <div>
          <div style={{ textAlign: "center" }}>
            <FaCameraRetro size={"19"} />
          </div>
          <p className="fontChangeWidth" style={{ textAlign: "center" }}>{packages.PackageActivites} <span >{packages.PackageActivites > 1 ? " Activities" : " Activity"}</span>  </p>
        </div>

        <div>
          <div style={{ textAlign: "center" }}>
            <IoFastFoodSharp size={"19"} />
          </div>
          <p className="fontChangeWidth" style={{ textAlign: "center" }}> <span>{packages.PackageMeals ? "Free" : "Paid"}</span> </p>
        </div>


        <div>
          <div style={{ textAlign: "center" }}>
            <AiFillCar size={"19"} />
          </div>
          <p className="fontChangeWidth" style={{ textAlign: "center" }}>{packages.PackageTransfers} <span >{packages.PackageTransfers > 1 ? "Transfers" : "Transfer"}</span> </p>
        </div>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <div className={styles2.headingDesc} style={{ fontSize: "32px" }}>
          Route
          <hr style={{ marginTop: "0px" }} />
        </div>
        <div style={{ textAlign: "center", fontSize: "25px" }}>
          <span><FaPlaneArrival size={23} /></span>   <span style={{ color: "#005cbe" }}>&rarr;</span> {packages.PackageDestination}  <span style={{ color: "#005cbe" }}>&rarr; </span>
          {packages.PackageRoute.split(" - ").map((element) => {
            return <span>{element} <span style={{ color: "#005cbe" }}>&rarr; </span> </span>
          })}
          {packages.PackageDestination} <span style={{ color: "#005cbe" }}>&rarr;</span>
          <span><FaPlaneDeparture size={21} /></span>
        </div>
      </div>



      <div className="d-flex justify-content-start" style={{ borderRadius: "25px", backgroundColor: "#d8d8d8" }}>
        <div className={`${styles2.active}`} id='overviewDesc' style={styles.eachdiv} onClick={handleOnClick}>
          Overview
        </div>
        <div id='EachDayPlan' style={styles.eachdiv} onClick={handleOnClick}>
          Itinerary
        </div>
      </div>
      <div className={`container ${styles2.overviewfullcont}`} id="fullcontaineroverview" style={{ marginTop: "15px", fontSize: "20px" }}>
        <div className="card" style={{ marginBottom: "15px" }}>
          <div className="card-header" style={{ fontWeight: "bold", color: "#005cbe" }}>
            Description
          </div>
          <div className="card-body">
            <p className="card-text">{packoverview[0]['fulldescription']}</p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: "15px" }}>
          <div className="card-header" style={{ fontWeight: "bold", color: "#005cbe" }}>
            Highlights
          </div>
          <div className="card-body">
            <p className="card-text">{packoverview[0]['highlights']}</p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: "15px" }}>
          <div className="card-header" style={{ fontWeight: "bold", color: "#005cbe" }}>
            Accommodation
          </div>
          <div className="card-body">

            <h5 className="card-title" style={{ fontWeight: "bold" }}>{packages.PackageHotels} {packages.PackageHotels > 1 ? " Hotels" : " Hotel"}</h5>
            <p className="card-text">{packoverview[0]['accommodation']}</p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: "15px" }}>
          <div className="card-header" style={{ fontWeight: "bold", color: "#005cbe" }}>
            Activities
          </div>
          <div className="card-body">
            <h5 className="card-title" style={{ fontWeight: "bold" }}>{packages.PackageActivites} {packages.PackageActivites > 1 ? " Activities" : " Activity"}</h5>
            <p className="card-text">{packoverview[0]['activities']}</p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: "15px" }}>
          <div className="card-header" style={{ fontWeight: "bold", color: "#005cbe" }}>
            Meals
          </div>
          <div className="card-body">
            <h5 className="card-title" style={{ fontWeight: "bold" }}>{packages.PackageMeals ? "Free" : "Paid"}</h5>
            <p className="card-text">{packoverview[0]['meals']}</p>
          </div>
        </div>

        <div className="card" style={{ marginBottom: "15px" }}>
          <div className="card-header" style={{ fontWeight: "bold", color: "#005cbe" }}>
            Transfers
          </div>
          <div className="card-body">
            <h5 className="card-title" style={{ fontWeight: "bold" }}>{packages.PackageTransfers} {packages.PackageTransfers > 1 ? "Transfers" : "Transfer"}</h5>
            <p className="card-text">{packoverview[0]['transfers']}</p>
          </div>
        </div>



      </div>



      <div className={`${styles2.containeritinerary}`} id="fullcontaineritinerary">
        <div style={{ fontSize: "20px" }}>
          <div className='packitem' style={{ display: "flex", marginLeft: "auto", marginRight: "auto", marginBottom: "20px" }}>
            <div style={{ marginTop: "auto", marginBottom: "auto", marginRight: "10px" }}>Day: </div>
            <select name="room" value={day} onChange={(e) => { dayOnChange(e) }} className="form-control tm-select" id="inputRoom">
              {totaldays.map((day) => {
                // console.log(month+year);
                return <option label={day} value={day} ></option>
              })}
            </select>
          </div>


          <div>
            <img src={process.env.PUBLIC_URL + `/img/${eachdaypack.imagefilename}`} alt="pic not available" style={styles.eachimage} />
            <div className="card" style={{ marginBottom: "15px",marginLeft:"auto",marginRight:"auto",marginTop:"20px" }}>
              <div className="card-header" style={{ fontWeight: "bold", color: "#005cbe",textAlign:"center" }}>
                Day Number {eachdaypack.daynumber}
              </div>
            </div>


            <div className="card" style={{ marginBottom: "15px",marginLeft:"auto",marginRight:"auto",marginTop:"10px" }}>
              <div className="card-header" style={{ fontWeight: "bold", color: "#005cbe",display:"flex",alignItems:"center" }}>
                Accommodation &nbsp;
                <BiHotel height={20} width={24}/>
              </div>
              <div className="card-body">
                <p className="card-text">{eachdaypack.accommodation}</p>
              </div>
            </div>


            <div className="card" style={{ marginBottom: "15px",marginLeft:"auto",marginRight:"auto",marginTop:"10px" }}>
              <div className="card-header" style={{ fontWeight: "bold", color: "#005cbe",display:"flex",alignItems:"center" }}>
                Meals &nbsp;
                <IoFastFoodSharp size={15} width={24}/>
              </div>
              <div className="card-body">
                <p className="card-text">{eachdaypack.meals}</p>
              </div>
            </div>



            <div className="card" style={{ marginBottom: "15px",marginLeft:"auto",marginRight:"auto",marginTop:"10px" }}>
              <div className="card-header" style={{ fontWeight: "bold", color: "#005cbe",display:"flex",alignItems:"center" }}>
                Details &nbsp;
                <FaInfoCircle size={15}/>
              </div>
              <div className="card-body">
                <p className="card-text">{eachdaypack.fulldescription}</p>
              </div>
            </div>

          </div>


        </div>
      </div>

      <button className="btn btn-primary" style={{cursor:"pointer", borderRadius:"6px",display:"block",marginRight:"auto",marginLeft:"auto",marginBottom:"20px"}}>
        <Link style={{color:"white"}} to={`/booknow/${id}`}>
        Book Now
        </Link>
      </button>
    </div>



  )
}

const styles = {
  eachdiv: {
    padding: "10px",
    fontSize: "25px",
    marginRight: "10px",
    marginTop: "auto",
    marginBottom: "auto",
    paddingRight: "25px",
    paddingLeft: "25px",
    cursor: "pointer",
  },
  contentsDesc: {
    border: "2px solid gray",
    padding: "25px",
    background: "#005cbe",
    marginBottom: "15px",
    borderRadius: "25px",
    fontSize: "18px",
    color: "white"
  },
  roundimage: {
    width: "100px",
    margin: "auto",
    marginTop: " 25px"
  },
  eachimage: {
    display: "block",
    marginLeft: "auto",
    width: "80%",
    marginRight: "auto",
    height: "400px",
    objectFit: "cover"
  }


}

export default FullDescription