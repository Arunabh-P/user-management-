import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { useForm } from "react-hook-form";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
//import Cookies from 'js-cookie';

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate()
  const {register, getValues, handleSubmit,formState:{errors}} = useForm()
  const [error, setError] = React.useState({})

  const submitForm = (data) => {

   axios.post(`/users/signup`,  data ).then(res => {
        swal("Registered Successfully!", "success").then(()=>{
        //  localStorage.setItem("userInfo", JSON.stringify(data))
         // if (localStorage.userInfo) {
            navigate('/login')
          //}
        })
      }).catch((err)=>{
          setError({...error,status:true,message:err.response.data.message})
          setTimeout(() => {
            setError({...error,status:false})
          }, 2000)
      })
    
  };


  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            {error.status && <Alert severity="error" sx={{ mt: 2 }}>{error.message ? error.message : "Email already Exists"}</Alert>}

            <Box component="form" noValidate onSubmit={handleSubmit(submitForm)} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    {...register("name", {
                      required: "This field cannot be blank",
                      validate: {
                        nospace: (value) => {
                          if (value[0] !== " ") return true
                          else return "First letter should not be space"
                        },
                        nospecial: (value) => {
                          var hasNumber = /\d/;
                          if (hasNumber.test(value)) return "Should contain letters only"
                          else return true;
                        }
                      }
                    })}
                    error={!!errors?.name}
                    helperText={errors?.name ? errors?.name.message : ""}
                  />
                </Grid>
       
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    error={!!errors?.email}
                    helperText={errors?.email ? errors.email.message : ""}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    autoComplete="phone"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                        message: "Invalid phone number"
                      }
                    })}
                    error={!!errors?.phone}
                    helperText={errors?.phone ? errors.phone.message : ""}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Minimum 8 letter required"
                      }
                    })}
                    error={!!errors?.password}
                    helperText={errors?.password ? errors.password.message : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="cpassword"
                    label="Confirm password"
                    type="password"
                    id="cpassword"
                    autoComplete="new-password"
                    {...register("cpassword", {
                      required: "Password is required",
                      validate: {
                        matchpass: (value) => {
                          if (getValues().password === value) return true
                          else return "Password should match"
                        }
                      }
                    })}
                    error={!!errors?.cpassword}
                    helperText={errors?.cpassword ? errors.cpassword.message : ""}
                  />
                </Grid>

              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 ,pt:1,pb:1}}
                style={{color:'white',backgroundColor:'black',fontSize:'20px'}}
              >
                Sign Up
              </Button>


              <h5>Already have an account?</h5>

<Link to="/login" style={{textDecoration:'none'}}>
<Button
fullWidth
variant="contained"

sx={{ mt: 2, mb: 2 ,pt:1,pb:1 }}
style={{color:'white',backgroundColor:'black',fontSize:'20px' }}

>
Sign IN
</Button></Link>

              
              
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}