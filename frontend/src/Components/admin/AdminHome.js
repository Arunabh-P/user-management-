import React, { useEffect, useState } from 'react'
import { Navbar, Table, Container, Form, FormControl } from 'react-bootstrap'
import {Button} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Header from '../user/Header';
import './admin.css'

const AdminHome = () => {
    const [search, setSearch] = useState('');
    const [arr, setArr] = useState([])
    const [refresh, setRefresh] = useState(false)

    const navigate = useNavigate()

    const getAdmin= async()=>{
        const adminInfo = localStorage.getItem("adminInfo")

        if (adminInfo) {

            try {

                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                }

                const { data } = await axios.get("/admin", {

                }, config)
                setArr(data)
            }

            catch (error) {
                throw new error(error.response.data.message)
            }


        } else {

            navigate('/adminlogin')
        }
    }
    useEffect(() => {
        getAdmin()
    }, [refresh])

    const clickHandler = async (id) => {
        if (window.confirm(`This will Delete the User?`)) {

            try {

                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
                await axios.delete(`/admin/delete/${id}`, {

                }, config)


                setRefresh(!refresh)
            }

            catch (error) {
                throw new error(error.response.data.message)
            }

        }
    }
    const editHandle = (id) => {
        navigate(`/edit/${id}`)
    }

    const searchHandler = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }
            const { data } = await axios.post('/admin', {
                search
            }, config)
            console.log(data);
            setArr(data)
        } catch (error) {

        }
    }

    return (

        <div style={{height:'120vh', width:"100%" }}>
            <Header admin={'admin'} />
            <Navbar className='pt-5' expand="lg">
                <Container className='pt-5 d-flex justify-content-center'>
                    <Form onSubmit={searchHandler} className="d-flex ">
                        <FormControl
                            type="text" placeholder="Serach by Name" onChange={(e) => setSearch(e.target.value)}
                            className="me-2 search-bar" value={search} />
                        <Button type="submit " variant='contained' color='success' className="search-button px-4 ">Search</Button>
                    </Form>
                </Container>
            </Navbar>
            
            <Container className=" mt-5 ">
                <div className="justify-content-center d-flex">
                    <div className="col-lg-8 box-admin">
                        <div className='text-center'>
                            <h5>User Management</h5>
                        </div>
                        <Table  hover >
                            <thead>
                                <tr>

                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Options</th>

                                </tr>
                            </thead>
                            <tbody>
                                {arr.map((e) => {
                                return (
                                    <tr>
                                    <td>{e.name}</td>
                                    <td>{e.phone}</td>
                                    <td>{e.email}</td>
                                    <td><Button variant="outlined" color="info"  startIcon={<EditIcon/>} onClick={() => { editHandle(e._id) }} >Edit</Button> <Button variant="outlined" color="error" startIcon={<DeleteIcon />}  onClick={() => { clickHandler(e._id) }}>Delete</Button> </td>

                                    </tr>
                                )
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>

        </div>

    )

}

export default AdminHome
