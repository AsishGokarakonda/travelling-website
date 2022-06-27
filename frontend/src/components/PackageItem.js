import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineFlight } from 'react-icons/md'
import { FaHotel,FaTrain } from 'react-icons/fa'
import { FaCameraRetro } from 'react-icons/fa'
import { AiFillCar } from 'react-icons/ai'
const PackageItem = (props) => {
    const { packagedetails, image } = props

    let srcimage = ''
    if (image === "none") {
        srcimage = process.env.PUBLIC_URL + '/img/noImage.jpeg'
    } else {
        srcimage = process.env.PUBLIC_URL + '/img/' + image
    }

    var decideTravelIcon =<div style={{textAlign:"center"}}><MdOutlineFlight size={"19"} /></div>
    var travel = "flight"
    switch (packagedetails.PackageTravel) {
        case "flight":
            decideTravelIcon =<div style={{textAlign:"center"}}><MdOutlineFlight size={"19"} /></div>
            if (packagedetails.TravelsNumber>1){
                travel = "flights"
            }else{
                travel ="flight"
            }
            break;
        case "train":
            decideTravelIcon =<div style={{textAlign:"center"}}><FaTrain size={"19"} /></div>
            if (packagedetails.TravelsNumber>1){
                travel = "trains"
            }else{
                travel ="train"
            }
            break;
        default:
            break;
    }
    return (
        <div className="tm-recommended-place">
            <img src={srcimage} alt={process.env.PUBLIC_URL + '/img/noImage.jpeg'} className="img-fluid tm-recommended-img" />
            <div className="tm-recommended-description-box">
                <h3 className="tm-recommended-title">{packagedetails.PackageName}</h3>
                <p className="tm-text-highlight">From {packagedetails.PackageDeparture} To {packagedetails.PackageDestination}</p>
                <p className="tm-text-gray">
                    {packagedetails.PackageDescription}
                </p>
                <div className="d-flex justify-content-around">
                    <div>
                        {decideTravelIcon}
                        <p style={{ textAlign: "center" }}>{packagedetails.TravelsNumber} {travel}</p>
                    </div>

                    <div>
                        <div style={{textAlign:"center"}}>
                            <FaHotel size={"19"} />
                        </div>
                        <p style={{ textAlign: "center" }}>{packagedetails.PackageHotels}{packagedetails.PackageHotels>1? " Hotels":" Hotel"}</p>
                    </div>

                    <div>
                        <div style={{textAlign:"center"}}>
                            <FaCameraRetro size={"19"} />
                        </div>
                        <p style={{ textAlign: "center" }}>{packagedetails.PackageActivites} {packagedetails.PackageActivites>1? " Activites":" Activity"}</p>
                    </div>

                    <div>
                        <div style={{textAlign:"center"}}>
                            <AiFillCar  size={"19"} />
                        </div>
                        <p style={{ textAlign: "center" }}>{packagedetails.PackageTransfers} Transfers</p>
                    </div>
                </div>

            </div>
            <div id="preload-hover-img"></div>
            <Link to="/" className="tm-recommended-price-box">
                <p className="tm-recommended-price">Rs {packagedetails.PackageCost}</p>
                <p className="tm-recommended-price-link">Continue Reading</p>
            </Link>
        </div>
    )
}

export default PackageItem