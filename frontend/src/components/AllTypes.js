import React from 'react'
import EachType from './EachType'

const AllTypes = (props) => {
    const {promptAlert} = props
  return (
    <div>
        <EachType promptAlert={promptAlert} pack="Featured" topmargin="150px"/>
        <EachType promptAlert={promptAlert} pack="Adventure" topmargin="100px"/>
        {/* <Adventure promptAlert={promptAlert}/> */}
    </div>
  )
}

export default AllTypes