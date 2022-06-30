import React from 'react'

const BookingPage = () => {
    // if(localStorage.getItem("token")){
    //     getNotes(localStorage.getItem("token"))
    //   }
    //   else{
    //     navigate("/login")
    //   }
    return (
        <div style={{ marginTop: "150px" }}>
            <div className="container">
                <form>
                    <div class="mb-3">
                        <label>Name</label>
                        <input type="name" class="form-control"/>
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BookingPage