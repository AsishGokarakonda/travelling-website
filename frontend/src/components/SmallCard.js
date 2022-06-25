import React from 'react'
import { Link } from 'react-router-dom'
import { FaRupeeSign } from 'react-icons/fa'
const SmallCard = (props) => {
    const imgsrc = process.env.PUBLIC_URL + '/img/' + props.packagedetails.PackageImg
    return (

        <div className='card wrapperimages' style={{ width: "18rem", height: "18rem" }}>
            {/* <div style={{display: 'flex',justifyContent: 'flex-end',position:'absolute',right: '0'}}> 
                        <span className="badge rounded-pill bg-info">featured</span>
                </div> */}
            <img src={imgsrc} style={{ height: "170px" }} class="card-img-top " alt="..." />
            <div class="card-body" style={{ paddingTop: "16px" }}>
                <h5 class="card-title" style={{ textAlign: "center", marginBottom: "4px" }}>{props.packagedetails.PackageName}</h5>
                <div class="d-flex justify-content-between">
                    <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                        {props.packagedetails.PackageDays} Days
                    </div>
                    <div >
                        <div class="d-flex flex-column mb-3">
                            <div>
                                <span>
                                    <FaRupeeSign size={18} />
                                </span>
                                <span style={{ fontWeight: "bold", fontSize: "23px" }}>
                                    {props.packagedetails.PackageCost}
                                </span>
                            </div>
                            <div style={{textAlign:"end"}}>per person</div>
                        </div>

                    </div>
                </div>
                <Link to="/" class="btn btn-primary details">More Details</Link>
            </div>
        </div>

    )
}

export default SmallCard