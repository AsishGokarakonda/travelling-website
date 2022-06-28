import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios'
import styles2 from '../fullcss/FullDescription/FullDescriptionCss.module.css'
import { MdOutlineFlight } from 'react-icons/md'
import { FaHotel, FaTrain } from 'react-icons/fa'
import { FaCameraRetro } from 'react-icons/fa'
import { AiFillCar } from 'react-icons/ai'
import { FaRupeeSign } from 'react-icons/fa'
import { IoFastFoodSharp } from 'react-icons/io5'

// body {
//   max-width: 37.5rem;
//   margin: 0 auto;
//   padding: 0 1.25rem;
//   font-family: 'Lato', sans-serif;
// }

// * {
//   box-sizing: border-box;
//   scrollbar-color: transparent transparent; /* thumb and track color */
//   scrollbar-width: 0px;
// }

// *::-webkit-scrollbar {
//   width: 0;
// }

// *::-webkit-scrollbar-track {
//   background: transparent;
// }

// *::-webkit-scrollbar-thumb {
//   background: transparent;
//   border: none;
// }

// * {
//   -ms-overflow-style: none;
// }

// ol, li {
//   list-style: none;
//   margin: 0;
//   padding: 0;
// }


const FullDescription = (props) => {
  const [packages, setPackages] = useState({})
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

    // document.getElementById("overviewDesc")
    // e.target.classList.add(styles2.active);

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

  return (
    <div className='container' style={{ marginTop: "150px" }}>
      {/* <div id='MyCarouselTravel' style={{ marginTop: "150px" }}>

          <img className='mySlidesTravel' src={process.env.PUBLIC_URL + '/Goa/1.jpg'} alt="" />
          <img className='mySlidesTravel' src={process.env.PUBLIC_URL + '/Goa/2.jpg'} alt="" />
          <img className='mySlidesTravel' src={process.env.PUBLIC_URL + '/Goa/3.jpg'} alt="" />

          </div> */
      }
      <div className={styles2.headingDesc}>

        {packages.PackageName}
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
          <p  className="fontChangeWidth" style={{ textAlign: "center" }}>{packages.PackageActivites} <span >{packages.PackageActivites > 1 ? " Activites" : " Activity"}</span>  </p>
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
          <p  className="fontChangeWidth" style={{ textAlign: "center" }}>{packages.PackageTransfers} <span >{packages.PackageTransfers > 1 ? "Transfers" : "Transfer"}</span> </p>
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
      <div className='container' style={{width:"92%",border:"2px solid red",marginTop:"15px",fontSize:"25px"}}>
        <div style={{ borderRadius: "25px", backgroundColor: "white", }}>
          Flights
          <hr />
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
    background: "white",
    marginBottom: "15px",
    borderRadius: "25px",
    fontSize:"18px"
  }

}

export default FullDescription