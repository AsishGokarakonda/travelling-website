import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineFlight } from 'react-icons/md'
import { FaHotel } from 'react-icons/fa'
import { FaCameraRetro } from 'react-icons/fa'
import { AiFillCar } from 'react-icons/ai'
const PackageItem = (props) => {
    const { packagedetails, image } = props
    // console.log(packagedetails)
    let srcimage = ''
    if (image === "none") {
        srcimage = process.env.PUBLIC_URL + '/img/noImage.jpeg'
        // console.log(srcimage);
    } else {
        srcimage = process.env.PUBLIC_URL + '/img/' + image
        // console.log(srcimage);
    }

    return (
        <div className="tm-recommended-place">
            <img src={srcimage} alt={process.env.PUBLIC_URL + '/img/noImage.jpeg'} className="img-fluid tm-recommended-img" />
            <div className="tm-recommended-description-box">
                <h3 className="tm-recommended-title">{packagedetails.PackageName}</h3>
                <p className="tm-text-highlight">From {packagedetails.PackageDeparture} To {packagedetails.PackageDestination}</p>
                <p className="tm-text-gray">{packagedetails.PackageDescription}</p>
                <div class="d-flex justify-content-around">
                    <div>
                        <div style={{textAlign:"center"}}>
                            <MdOutlineFlight size={"19"} />
                        </div>
                        <p style={{ textAlign: "center" }}>{packagedetails.PackageFlights} Flights</p>
                    </div>

                    <div>
                        <div style={{textAlign:"center"}}>
                            <FaHotel size={"19"} />
                        </div>
                        <p style={{ textAlign: "center" }}>{packagedetails.PackageHotels} Hotel</p>
                    </div>

                    <div>
                        <div style={{textAlign:"center"}}>
                            <FaCameraRetro size={"19"} />
                        </div>
                        <p style={{ textAlign: "center" }}>{packagedetails.PackageActivites} Activites</p>
                    </div>

                    <div>
                        <div style={{textAlign:"center"}}>
                            <AiFillCar size={"19"} />
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