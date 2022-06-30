import React from 'react'
import { Link } from 'react-router-dom'
// import { MdOutlineFlight } from 'react-icons/md'
import { FaHotel } from 'react-icons/fa'
import { FaCameraRetro } from 'react-icons/fa'
import { AiFillCar } from 'react-icons/ai'
import { FaRupeeSign } from 'react-icons/fa'
import { IoFastFoodSharp } from 'react-icons/io5'

const PackageItem = (props) => {
    const { packagedetails, image, travel } = props
    console.log(travel);
    let srcimage = ''
    if (image === "none") {
        srcimage = process.env.PUBLIC_URL + '/img/noImage.jpeg'
    } else {
        srcimage = process.env.PUBLIC_URL + '/img/' + image
    }
    // console.log(packagedetails);
    // var decideTravelIcon =<div style={{textAlign:"center"}}><MdOutlineFlight size={"19"} /></div>
    // var travel = "flight"
    // switch (packagedetails.PackageTravel) {
    //     case "flight":
    //         decideTravelIcon =<div style={{textAlign:"center"}}><MdOutlineFlight size={"19"} /></div>
    //         if (packagedetails.TravelsNumber>1){
    //             travel = "flights"
    //         }else{
    //             travel ="flight"
    //         }
    //         break;
    //     case "train":
    //         decideTravelIcon =<div style={{textAlign:"center"}}><FaTrain size={"19"} /></div>
    //         if (packagedetails.TravelsNumber>1){
    //             travel = "trains"
    //         }else{
    //             travel ="train"
    //         }
    //         break;
    //     default:
    //         break;
    // }
    return (
        <div className="tm-recommended-place">
            <img src={srcimage} alt="pic not availabe" className="img-fluid tm-recommended-img" />
            <div className="tm-recommended-description-box">
                <h3 className="tm-recommended-title">{packagedetails.PackageName}</h3>
                <p className="tm-text-highlight">{packagedetails.PackageRoute}</p>
                <p className="tm-text-gray">
                    {packagedetails.PackageDescription}
                </p>
                <div className="d-flex justify-content-around">
                    {/* <div>
                        {decideTravelIcon}
                        <p style={{ textAlign: "center" }}>{packagedetails.TravelsNumber} <span className="widthChangeRemove">{travel}</span>  </p>
                    </div> */}

                    <div>
                        <div style={{ textAlign: "center" }}>
                            <FaHotel size={"19"} />
                        </div>
                        <p style={{ textAlign: "center" }}>{packagedetails.PackageHotels} <span className="widthChangeRemove">{packagedetails.PackageHotels > 1 ? " Hotels" : " Hotel"}</span> </p>
                    </div>

                    <div>
                        <div style={{ textAlign: "center" }}>
                            <FaCameraRetro size={"19"} />
                        </div>
                        <p style={{ textAlign: "center" }}>{packagedetails.PackageActivites} <span className="widthChangeRemove">{packagedetails.PackageActivites > 1 ? " Activities" : " Activity"}</span>  </p>
                    </div>

                    <div>
                        <div style={{ textAlign: "center" }}>
                            <IoFastFoodSharp size={"19"} />
                        </div>
                        <p style={{ textAlign: "center" }}> <span>{packagedetails.PackageMeals ? "Free" : "Paid"}</span> </p>
                    </div>


                    <div>
                        <div style={{ textAlign: "center" }}>
                            <AiFillCar size={"19"} />
                        </div>
                        <p style={{ textAlign: "center" }}>{packagedetails.PackageTransfers} <span className="widthChangeRemove">{packagedetails.PackageTransfers > 1 ? "Transfers" : "Transfer"}</span> </p>
                    </div>
                </div>

            </div>
            {/* <div id="preload-hover-img"></div> */}
            <Link to={`/viewdetails/${packagedetails._id}`} className="tm-recommended-price-box">
                <p className="tm-recommended-price">
                    <span style={{ fontSize: "23px", marginBottom: "0px" }}>
                        <div style={{textAlign:"center"}}>
                            <span><FaRupeeSign size={18} /></span>
                            <span>{packagedetails.PackageCost}</span>
                        </div>

                        <div style={{ fontSize: "14px", color: "white",textAlign:"center" }}>{travel !== "none" ? `+` : ""}
                        <div style={{ fontSize: "14px", color: "white",textAlign:"center" }} >{travel !== "none" ? `${travel} ticket charges` : ""}</div>
                        </div>

                    </span> </p>

                <p className="tm-recommended-price-link">View Details</p>
            </Link>
        </div>
    )
}

export default PackageItem