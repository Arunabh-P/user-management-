import React, { useState, useEffect, Fragment } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import ErrorMessage from '../ErrorMessage';

const AdminLogin = () => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  let navigate = useNavigate();
  useEffect(() => {
    const adminInfo = localStorage.getItem("adminInfo")
    if (adminInfo) {
      navigate('/admin')
    } else {
      navigate("/Adminlogin")
    }
  }, [navigate])

  const adSubmitHandle = async (e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }
      const  data  = await axios.post("/admin/adminlogin", {
        name,
        password,
      }, config)
      localStorage.setItem("adminInfo", JSON.stringify(data))
      if (localStorage.adminInfo) {
        navigate('/admin')
      }
    } catch (error) {
      setError("Invalid Login")
    }
  }

  return (
    <Fragment>
      <div className="vh-100 admin-body">
  <div className="container py-5 h-60">
    <div className="row d-flex justify-content-center align-items-center h-80">
      <div className="col col-xl-8">
        <div className="card mt-5" style={{borderRadius:'1rem'}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">
                  <form action="" className='form' onSubmit={adSubmitHandle}>
                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing:"2px"}}>Hello Admin,Please login</h5>
                  <div clas="form-outline mb-4">
                    <input type="text" id="form2Example17" onChange={(e)=> setName(e.target.value)} placeholder="Enter Name"  value={name} className='form-control form-control-lg' />
                  </div>
                  <div className="form-outline mb-4 mt-4">
                    <input type="password" id="form2Example27" className='form-control form-control-lg' value={password} name='password' onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                  </div>
                  <div className="pt-1 mb-4">
                    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                    <button className='btn btn-dark btn-lg btn-block' type="submit">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </Fragment>
  )
}

export default AdminLogin
