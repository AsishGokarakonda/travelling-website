import React, { useEffect, useState } from 'react'
import PackageItem from './PackageItem'
import Axios from 'axios'
import NavAllPackages from './NavAllPackages'

const AllPackages = (props) => {
  const [packages, setPackages] = useState([])

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


    Axios.get(`http://localhost:5000/api/products/getpackages`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(function (response) {
      // console.log(response);
      // console.log(response.data);
      setPackages(response.data)
    })
      .catch(function (error) {
        console.log(error)
        props.promptAlert(error.response.data.message, "danger")
      });

  })
  return (
    <div className="tab-pane fade show active" id="4a" style={{ marginTop: "150px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>All packages</h1>
      <NavAllPackages/>
      {packages.map((packageitem) => {
        return <PackageItem packagedetails={packageitem} image={packageitem.PackageImg.search(".") !== -1 ? packageitem.PackageImg : "none"} key={packageitem._id} />
      })}
    </div>
  )
}

export default AllPackages