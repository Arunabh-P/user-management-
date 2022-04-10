import React from 'react'
import Header from './Header'
import Secret from './Secret'
import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Home() {
  const [name, setName] = useState("user")
  const [date,setDate] =useState('')
  let navigate = useNavigate();
  
  function getDate(){
    let date=new Date()
    let hours=date.getHours()
    if(hours>0 && hours<12){
      setDate('Good Morning')
    }
    else if(hours>=12 && hours<18){
      setDate('Good Afternoon')
    }
    else if(hours>=18 && hours<24){
      setDate('Good Night')
    }
  }

  useEffect(() => {
      getDate()
      const userInfo = localStorage.getItem("userInfo")
      const info = JSON.parse(userInfo)
      console.log(userInfo);
      setName(info ? info.data.name:"user")
      if(userInfo){
          navigate('/')
      }else{
          navigate("/login")
      }
     
  }, [navigate])
  return (
    <div style={{height:"102vh" , width:"100%"}}>
       <Header title ={name} date={date}/>
       <Secret/>

    </div>
  )
}

export default Home