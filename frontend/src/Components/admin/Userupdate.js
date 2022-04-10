import React ,{useEffect, useState , Fragment} from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Userupdate = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const navigate=useNavigate()
    const id1 =useParams()

    useEffect(() => {
      const getUser = async () =>{
          const {data} = await axios.get(`/admin/edit/${id1.id}`)
          setEmail(data.email)
          setName(data.name)
          setPhone(data.phone)
      }
     getUser()
    },[])
    
    const submitHandling =async (e)=>{
        e.preventDefault()
        
        try {
            const config ={
                headers: {
                    "Content-type":"application/json",
                },
            }
          
            await axios.patch(`/admin/edit/${id1.id}`,{
           name,
           phone,
           email
               
            },config)
        
          navigate('/admin')
        }

            catch(error){
                console.log(error.response.data.message);
                
            }     
        }

    return (
        <Fragment>
          <div  style={{height:"102vh" , width:"100%" ,background: '#FAF0E6'}}>
        <div className="container pt-5">
          <div className="pt-5 justify-content-center d-flex" >
            <div className="col-lg-6 border shadow py-5 ps-5 text-center" style={{backgroundColor:'rgb(233, 236, 244)'}}>
              <div className="form-head ">
                <h3>Edit User Details</h3>
              </div>
              <div className="form-body pt-2">
                <form action="" className='form' onSubmit={submitHandling} >
  
                  <div className='input-field py-3'>
                    <label htmlFor="" style={{paddingRight:'10px'}}>Name</label>
        
                    <input className='px-2' type="text"
                      value={name} onChange={((e) => {
                        setName(e.target.value)
                      })} required />
                  
                  </div>
  
                  <div className='input-field py-3'>
                    <label htmlFor="" style={{paddingRight:'10px'}}>Mobile Number</label>
                    <input className='number ps-2' name='phone' type='number'
                      value={phone} onChange={((e) => {
                        setPhone(e.target.value)
                      })} required />
                 
                  </div>
  
                  <div className='input-field py-3'>
                    <label htmlFor="" style={{paddingRight:'10px'}}>Email Address</label>
                    <input className='email' type='email' name='email'
                      value={email} onChange={((e) => {
                        setEmail(e.target.value)
                      })} required />
                    
                  </div>
  
  
                  <div className="submit  mx-3 mt-5 text-center">
                    
                    <Button className='submit-button  px-5 py-2' type='submit' >submit</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      </Fragment>
    )
}

export default Userupdate
