import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import bannerbg from '../../../images/bg.png'
import chair from '../../../images/chair.png'
import Calendar from '../../Shared/Calendar/Calendar/Calendar';





const AppointmentHeader = ({ date, setDate }) => {

    const banner = {
        backgroundImage: `url(${bannerbg})`,
        padding: '14% 0',
        backgroundAttachment: "fixed",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: 'black'

    }
    return (
        <Box sx={{ flexGrow: 1, }} style={banner}>
            <Container>
                <Grid container spacing={2} style={{ alignItems: 'center' }} >
                    <Grid item xll={7} xl={7} lg={7} md={7} xs={12}>
                        <Calendar date={date} setDate={setDate} ></Calendar>
                    </Grid>
                    <Grid item xll={5} xl={5} lg={5} md={5} xs={12} >
                        <img src={chair} style={{ width: '500px' }} alt="" />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AppointmentHeader;