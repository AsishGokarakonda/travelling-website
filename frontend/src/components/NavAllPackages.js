import React from 'react'
import '../fullcss/NavAllPackagesCss/NavPackagesCss.css'
const NavAllPackages = () => {
    return (
        <div>


            <div className='allpackdiv'>

                <div className='packitem'>
                    <label htmlFor="inputRoom">Duration</label>
                    <select name="room" defaultValue="Flight" className="form-control tm-select" id="inputRoom">
                        <option value="1" >Bus</option>
                        <option value="2">Cab</option>
                        <option value="3">Train</option>
                        <option value="3">Flight</option>
                    </select>
                </div>

                <div className='packitem'>
                    <label htmlFor="inputRoom">Cost Per Person</label>
                    <select name="room" defaultValue="Flight" className="form-control tm-select" id="inputRoom">
                        <option value="1" >Bus</option>
                        <option value="2">Cab</option>
                        <option value="3">Train</option>
                        <option value="3">Flight</option>
                    </select>
                </div>

                <div className='packitem'>
                    <label htmlFor="inputRoom">Month Of Travel</label>
                    <select name="room" defaultValue="Flight" className="form-control tm-select" id="inputRoom">
                        <option value="1" >Bus</option>
                        <option value="2">Cab</option>
                        <option value="3">Train</option>
                        <option value="3">Flight</option>
                    </select>
                </div>

                <div className='packitem'>
                    <label htmlFor="inputRoom">Themes</label>
                    <select name="room" defaultValue="Flight" className="form-control tm-select" id="inputRoom">
                        <option value="1" >Family</option>
                        <option value="2">Couple</option>
                    </select>
                </div>
            </div>
            <div className='searchdiv'>
                <form class="d-flex destinationform" role="search">
                    <input style={{height: "37px",borderRadius: "2px"}} class="form-control me-2" type="search" placeholder="Type your departure..." aria-label="Search"/>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                <form class="d-flex destinationform" role="search">
                    <input style={{height: "37px",borderRadius: "2px"}} class="form-control me-2" type="search" placeholder="Type your destination..." aria-label="Search"/>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    )
}

export default NavAllPackages