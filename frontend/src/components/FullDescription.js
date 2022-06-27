import React, { useEffect, useState ,useCallback} from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios'

const FullDescription = (props) => {
    const [packages, setPackages] = useState({})
    const params = useParams();
    const id  = params.id;
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
        [props,id]
      )
      useEffect(() => {
        fetchaproduct()
      }, [fetchaproduct])
      console.log(packages);
      
  return (
    <div style={{marginTop:"150px"}}>
        Hi
    </div>
  )
}

export default FullDescription