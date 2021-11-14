import { Alert, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Navigation from '../../Shared/Navigation/Navigation';
import loginBg from '../../../images/login.png'
import useStyle from '../../Shared/useStyle/useStyle';
import { NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import { useHistory, useLocation } from 'react-router';
const Register = () => {
    const { btnCustom } = useStyle()
    const [loginData, setloginData] = useState({})
    const { user, registerUser, error, isLoading } = useAuth()

    const history = useHistory()
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        console.log(newLoginData)
        setloginData(newLoginData)

    }
    const handelSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('Your Password did not match')
            return
        }
        registerUser(loginData.email, loginData.password, loginData.name, history)
        e.preventDefault()
    }

    return (
        <>
            <Navigation></Navigation>
            <Container sx={{ mt: 5 }}>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} >
                        <Typography variant="h4" sx={{ color: "#1CC7C1", fontWeight: '600', textAlign: 'center' }} gutterBottom>Register</Typography>
                        <Box sx={{ textAlign: 'center' }}>
                            {isLoading && <CircularProgress />}
                            {user?.email ? <Alert severity="success" sx={{ width: "85%" }}>User Created Successfully !</Alert> : <Alert severity="warning" sx={{ mt: 2, width: "85%" }}> Please put valid Information !</Alert>}
                            {error && <Alert severity="error" sx={{ mt: 2, mb: 5, width: "85%" }}>{error}</Alert>}
                        </Box>
                        <form onSubmit={handelSubmit} >
                            <TextField
                                id="standard basic"
                                style={{ width: '90%' }}
                                label="Your Name"
                                variant="standard"
                                name="name"
                                type="text"
                                onBlur={handleOnBlur}
                            /> <br />
                            <TextField
                                id="standard basic"
                                style={{ width: '90%' }}
                                label="Your Email"
                                variant="standard"
                                name="email"
                                type="email"
                                onBlur={handleOnBlur}
                            /> <br />
                            <TextField
                                id="standard basic"
                                name="password"
                                onBlur={handleOnBlur}
                                label="Your Password"
                                type="password"
                                style={{ width: '90%' }}
                                variant="standard"
                            /> <br />
                            <TextField
                                id="standard basic"
                                name="password2"
                                onBlur={handleOnBlur}
                                label="Retype Password"
                                type="password"
                                style={{ width: '90%' }}
                                variant="standard"
                            /> <br /> <br />
                            <Button type="submit" style={btnCustom} sx={{ width: "90%" }}>Submit</Button>
                            <NavLink to="/login" style={{ textAlign: "center", textDecoration: "none" }}>
                                <Button variant="text" sx={{ width: "90%", color: "#1CC7C1", }} >Already have account? Please Login </Button>
                            </NavLink>
                        </form>

                    </Grid>

                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{ textAlign: 'right' }}>
                        <img src={loginBg} style={{ width: '85%' }} alt="" />
                    </Grid>

                </Grid>
            </Container>
        </>
    );
};

export default Register;