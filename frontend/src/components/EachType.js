import React, { useEffect, useState ,useCallback } from 'react'
import '../fullcss/FeaturedCss/FeatureCss.css'
import Axios from 'axios'
import SmallCard from './SmallCard'

const EachType = (props) => {
  const [packages, setPackages] = useState([])
  var url;
  switch (props.pack) {
    case "Featured":
      url = "featuredpackages"
      break;
    case "Adventure":
      url = "adventurepackages"
      break;
    default:
      url = "featuredpackages"
      break;
  }
  const fetchproducts = useCallback(
    () => {
      Axios.get(`http://localhost:5000/api/products/${url}`, {
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
    [url,props]
  )
  

  
  useEffect(() => {
    fetchproducts();
    // console.log(packages);
  },[fetchproducts])

  console.log(packages);
  return (
    <div style={{ marginTop: `${props.topmargin}`, marginLeft: "15px", marginRight: "15px" }}>
      <h1 style={{ textAlign: "center" }}>{props.pack} Packages</h1>
      <hr />
      <div id="wrapper" style={{ marginLeft: "15px" }}>
        {packages.map((packageitem) => {
          return <SmallCard packagedetails={packageitem} key={packageitem._id} />
        })}
      </div>
    </div>
  )
}

export default EachType