import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import styles2 from '../fullcss/FullDescription/FullDescriptionCss.module.css'
import { MdOutlineFlight } from 'react-icons/md'
import { FaHotel, FaTrain } from 'react-icons/fa'
import { FaCameraRetro } from 'react-icons/fa'
import { AiFillCar } from 'react-icons/ai'
import { IoFastFoodSharp } from 'react-icons/io5'


const FullDescription = (props) => {
  const [packages, setPackages] = useState({})
  const [packoverview, setPackoverview] = useState([{'fulldescription':"",'highlights':"",'traveldetails':"",'accommodation':"",'activities':"",'meals':"",'transfers':""}])
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
          props.promptAlert(error.response.data.message, "danger")
        });
    },
    [props, id]
  )
  useEffect(() => {
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
  //       props.promptAlert(error.response.data.message, "danger")
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
  //         props.promptAlert(error.response.data.message, "danger")
  //       });
  // })
  console.log(packages);

  const handleOnClick = (e) => {
    //get id of the clicked div
    const id = e.target.id;
    if (e.target.id === "EachDayPlan") {
      e.target.classList.add(styles2.active);
      document.getElementById("overviewDesc").classList.remove(styles2.active);
    }
    if (e.target.id === "overviewDesc") {
      e.target.classList.add(styles2.active);
      document.getElementById("EachDayPlan").classList.remove(styles2.active);
    }
    console.log(id);

  }

  var decideTravelIcon = <div style={{ textAlign: "center" }}><MdOutlineFlight size={"19"} /></div>
  var travel = "flight"
  switch (packages.PackageTravel) {
    case "flight":
      decideTravelIcon = <div style={{ textAlign: "center" }}><MdOutlineFlight size={"19"} /></div>
      if (packages.TravelsNumber > 1) {
        travel = "flights"
      } else {
        travel = "flight"
      }
      break;
    case "train":
      decideTravelIcon = <div style={{ textAlign: "center" }}><FaTrain size={"19"} /></div>
      if (packages.TravelsNumber > 1) {
        travel = "trains"
      } else {
        travel = "train"
      }
      break;
    default:
      break;
  }

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
            props.promptAlert(error.response.data.message, "danger")
          });
      },
      [props, id]
  )

  useEffect(() => {
    getpackoverview()
  }, [getpackoverview])
  console.log(packoverview[0]);

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
        <div class="card" style={{ width: "18rem", borderRadius: "13px", marginTop: "10px", marginRight: "0px" }}>
          <img src={process.env.PUBLIC_URL + '/img/departureImg.png'} style={styles.roundimage} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Departure</h5>
            <p class="card-text">We will departure at <span style={{ fontWeight: "bold", fontSize: "15px" }}>{packages.PackageDeparture}</span> </p>
          </div>
        </div>
        <div class="card" style={{ width: "18rem", borderRadius: "13px", marginTop: "10px", marginRight: "0px" }}>
          <img src={process.env.PUBLIC_URL + '/img/destinationImg.png'} style={styles.roundimage} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Destination</h5>
            <p class="card-text">We will reach  <span style={{ fontWeight: "bold", fontSize: "15px" }}>{packages.PackageDestination}</span> and start holiday trip</p>
          </div>
        </div>
        <div class="card" style={{ width: "18rem", borderRadius: "13px", marginTop: "10px", marginRight: "0px" }}>
          <img src={process.env.PUBLIC_URL + '/img/cost.png'} style={styles.roundimage} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Cost</h5>
            <p class="card-text">Cost of this package is <span style={{ fontWeight: "bold", fontSize: "15px" }}>Rs {packages.PackageCost}</span></p>
          </div>
        </div>

      </div>




      <div style={styles.contentsDesc} className="d-flex justify-content-around">
        <div>
          {decideTravelIcon}
          <p className="fontChangeWidth" style={{ textAlign: "center" }}>{packages.TravelsNumber} <span >{travel}</span>  </p>
        </div>

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

      <div class="d-flex justify-content-start" style={{ borderRadius: "25px", backgroundColor: "#d8d8d8" }}>
        <div className={`${styles2.active}`} id='overviewDesc' style={styles.eachdiv} onClick={handleOnClick}>
          Overview
        </div>
        <div id='EachDayPlan' style={styles.eachdiv} onClick={handleOnClick}>
          Itinerary
        </div>
      </div>
      <div className='container' style={{marginTop: "15px", fontSize: "20px" }}>
        <div class="card" style={{marginBottom:"15px"}}>
          <div class="card-header" style={{fontWeight:"bold",color:"#005cbe"}}>
            Description
          </div>
          <div class="card-body">
            <p class="card-text">{packoverview[0]['fulldescription']}</p>
          </div>
        </div>
        
        <div class="card" style={{marginBottom:"15px"}}>
          <div class="card-header" style={{fontWeight:"bold",color:"#005cbe"}}>
            Highlights
          </div>
          <div class="card-body">
            <p class="card-text">{packoverview[0]['highlights']}</p>
          </div>
        </div>

        <div class="card" style={{marginBottom:"15px"}}>
          <div class="card-header" style={{fontWeight:"bold",color:"#005cbe"}}>
          Accommodation
          </div>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">{packoverview[0]['accommodation']}</p>
          </div>
        </div>

        <div class="card" style={{marginBottom:"15px"}}>
          <div class="card-header" style={{fontWeight:"bold",color:"#005cbe"}}>
          Activities
          </div>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">{packoverview[0]['activities']}</p>
          </div>
        </div>

        <div class="card" style={{marginBottom:"15px"}}>
          <div class="card-header" style={{fontWeight:"bold",color:"#005cbe"}}>
          Meals
          </div>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">{packoverview[0]['meals']}</p>
          </div>
        </div>

        <div class="card" style={{marginBottom:"15px"}}>
          <div class="card-header" style={{fontWeight:"bold",color:"#005cbe"}}>
          Transfers
          </div>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">{packoverview[0]['transfers']}</p>
          </div>
        </div>



      </div>
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
  }


}

export default FullDescription