import {Fragment, useState} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    try{

      const res= await axios.post('/users/login',{email,password})
      localStorage.setItem("userInfo", JSON.stringify(res))
      if (localStorage.userInfo) {
        navigate('/')
      }
    }
    catch (err){
      setError(err.response.data.message)
    }
  };

  return (
    <Fragment>
      <div className="vh-100 ">
  <div className="container py-5 h-60">
    <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5" >
            Sign In
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              
              label="Email Address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <p style={{color:'red'}}>{error}</p>
            <Button
              type="submit"
              fullWidth
              onClick={handleSubmit}
              variant="contained"
              
              sx={{ mt: 2, mb: 2 ,pt:1,pb:1 }}
              style={{color:'white',backgroundColor:'black',fontSize:'20px'}}
              
            >
              Sign In
            </Button>
            
                
                <h5>Don't have an account?</h5>

                <Link to="/signup" style={{textDecoration:'none'}}>
                <Button
              fullWidth
              variant="contained"
              
              sx={{ mt: 2, mb: 2 ,pt:1,pb:1 }}
              style={{color:'white',backgroundColor:'black',fontSize:'20px' }}
              
            >
              Sign Up
            </Button></Link>



              
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
</div>
    </Fragment>
   
  );
}