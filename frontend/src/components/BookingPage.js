import React, { useState, useEffect } from 'react'
import styles3 from '../fullcss/BookingPageCss/Bookingpagecss.module.css'
const BookingPage = () => {
    // if(localStorage.getItem("token")){
    //     getNotes(localStorage.getItem("token"))
    //   }
    //   else{
    //     navigate("/login")
    //   }
    const [rooms, setRooms] = useState(1)
    const [travel, setTravel] = useState("none")
    const handleIncrementClick = () => {

    }
    const handleRoomIncrement = () => {
        if (rooms < 5) {
            setRooms(rooms + 1)
            document.getElementById("minrooms").style.display = "none"
        }
        else {
            document.getElementById("maxrooms").style.display = "block"
        }
    }

    const handleRoomDecrement = () => {
        if (rooms > 1) {
            document.getElementById("maxrooms").style.display = "none"
            setRooms(rooms - 1)
        }
        else {
            document.getElementById("minrooms").style.display = "block"
        }
    }
    // useEffect(() => {
    //     const plus = document.querySelector(".plus");
    //     let minus = document.querySelector(".minus");
    //     let num = document.querySelector(".num");
    //     console.log(plus);
    //     console.log(minus);
    //     console.log(num);
    //     let a = 1;
    //     plus.addEventListener("click", ()=>{
    //         console.log("hi");
    //       a++;
    //       a = (a < 10) ? "0" + a : a;
    //       num.innerText = a;
    //     });

    //     minus.addEventListener("click", ()=>{
    //       if(a > 1){
    //         a--;
    //         a = (a < 10) ? "0" + a : a;
    //         num.innerText = a;
    //       }
    //     });
    // })

    const travelOnChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setTravel(e.target.value)
    }


    return (
        <div style={{ marginTop: "150px" }}>
            <div className="container">
                <div style={{textAlign:"center",fontSize:"40px"}}>
                    Bookings Page
                </div>
                <hr style={{marginTop:"0px"}} />
                <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ textAlign: "center", fontSize: "20px" }}>Rooms</h3>
                    <div className={styles3.wrapper} style={{ margin: "auto auto" }}>
                        <button id='minusroom' className="minus disabled" onClick={handleRoomDecrement}>-</button>
                        <span id='numroom' style={style.number} className="num">{rooms}</span>
                        <button id='plusroom' className="plus" onClick={handleRoomIncrement}>+</button>
                    </div>
                    <div id='maxrooms' style={{ textAlign: "center", color: "red", display: "none" }}>
                        maximum 5 rooms only
                    </div>
                    <div id='minrooms' style={{ textAlign: "center", color: "red", display: "none" }}>
                        minimum 1 room is required
                    </div>

                    <div style={{ display: "flex", flexFlow: "wrap", justifyContent: "space-around", flexDirection: "row", marginTop: "20px" }}>
                        <div>
                            <h3 style={{ textAlign: "center", fontSize: "20px" }}>Enter Your Departure City</h3>
                            <div>
                                <input style={{ width: "290px" }} type="text" placeholder='Type Your Departure City'></input>
                            </div>
                        </div>

                        <div className='packitem' style={{width:"200px"}}>
                            <label htmlFor="inputRoom">Travel Mode</label>
                            <select style={{height:"50px",borderRadius:"5px"}} name="room" value={travel} className="form-control tm-select" id="inputRoom" onChange={(e) => { travelOnChange(e) }}>
                                <option label='none' value="none">none</option>
                                <option label='bus' value="bus">Bus</option>
                                <option label='cab' value="cab">Cab</option>
                                <option label='train' value="train">Train</option>
                                <option label='flight' value="flight">Flight</option>
                            </select>
                        </div>

                    </div>
                    <div style={{textAlign:"center"}}>
                        we will get back to you after checking the availability of tickets in specified travel mode and specified city
                    </div>



                </div>

                {/* <div style={{textAlign:"center",fontSize:"20px"}}>
                    Room1
                </div> */}
                {/* <div style={{ display: "flex", justifyContent: "space-around", flexDirection: "row", flexFlow: "wrap" }}>

                    <div>
                        <h3 style={{ textAlign: "center", fontSize: "13px" }}>Adults</h3>
                        <div className={styles3.wrapper}>
                            <button id='minus' className="minus disabled">-</button>
                            <span id='num' style={style.number} className="num">1</span>
                            <button id='plus' className="plus" onClick={handleIncrementClick}>+</button>
                        </div>
                    </div>
                    <div>
                        <h3 style={{ textAlign: "center", fontSize: "13px" }}>Child (with bed)</h3>
                        <div className={styles3.wrapper}>
                            <button id='minus' className="minus disabled">-</button>
                            <span id='num' style={style.number} className="num">1</span>
                            <button id='plus' className="plus">+</button>
                        </div>
                    </div>
                    <div>
                        <h3 style={{ textAlign: "center", fontSize: "13px" }}>Child (without bed)</h3>
                        <div className={styles3.wrapper}>
                            <button id='minus' className="minus disabled">-</button>
                            <span id='num' style={style.number} className="num">1</span>
                            <button id='plus' className="plus">+</button>
                        </div>
                    </div>

                    <div>
                        <h3 style={{ textAlign: "center", fontSize: "13px" }}>Infants</h3>
                        <div className={styles3.wrapper}>
                            <button id='minus' className="minus disabled">-</button>
                            <span id='num' style={style.number} className="num">1</span>
                            <button id='plus' className="plus">+</button>
                        </div>
                    </div>
                </div> */}

            </div>
        </div>
    )
}

const style = {
    number: {
        borderRight: "2px solid rgba(0,0,0,0.2)",
        borderLeft: "2px solid rgba(0,0,0,0.2)",
        fontSize: "20px",
        fontWeight: "600",
        cursor: "default",
    }
}

export default BookingPage