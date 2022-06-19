import React from 'react'

export default function Alert(props) {
    return (
        <div style={{height:"50px",position:"absolute",top:"18%",width:"100%",zIndex:"100"}}>
        {props.alert && 
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
         {props.alert.message}
      </div>}
      </div>
    )
}