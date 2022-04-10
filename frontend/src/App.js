import './App.css';
import SignIn from './Components/user/SignIn'
import Signup from './Components/user/Signup'
import Home from './Components/user/Home'
import AdminHome from './Components/admin/AdminHome';
import AdminLogin from './Components/admin/AdminLogin';
import Userupdate from './Components/admin/Userupdate';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<SignIn data />} />
      <Route path='/admin' element={ <AdminHome/>}></Route>
      <Route path='/edit/:id' element={ <Userupdate/>}></Route>
      <Route path='/adminlogin' element={ <AdminLogin/>}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
