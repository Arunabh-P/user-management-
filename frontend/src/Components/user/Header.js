import React, { useEffect } from 'react'
import { Button, Container, Grid } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'


function Header(props) {
    const Navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault()
        Navigate('/')
      }
      const handleClick2 = (e) => {
        e.preventDefault()
        Navigate('/admin')
      }
      
  return (
    <>
    <div> 
        <div className='secret-header'>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={10} className="title-head">
                    {props.admin ? <a className="secret-head-content" href='/#' onClick={handleClick2}>Hy, {props.admin}</a> : <a className="secret-head-content pt-5" href='/#' onClick={handleClick}>{props.date}, {props.title}</a>}
                    </Grid>
                    <Grid item xs={2}>
                    {props.admin ? <form className="d-flex">
                  <ul className="navbar-nav">

                    <li className="nav-item">
                      <a className="nav-link text-uppercase" href='/#' >{props.title}</a>
                    </li>
                    <li className="nav-item text-end">
                      <button className="button-nav2" href='/#' onClick={() => {
                                localStorage.removeItem('adminInfo')
                                Navigate('/adminlogin')
                            }}>Logout</button>
                    </li>

                  </ul>
                </form> :  <form className="d-flex">
                
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <button className="button-nav btn btn-outline-danger" href='/#' onClick={()=>{
                                     localStorage.removeItem('userInfo')
                                     Navigate('/login')}}>Logout</button>
                    </li>
                  </ul>
                </form> }
                    </Grid>
                </Grid>
            </Container>
            </div>
    </div>
    </>
  )
}

export default Header