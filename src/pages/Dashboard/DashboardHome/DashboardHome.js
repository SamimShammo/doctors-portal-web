import React from 'react';
import Calendar from '../../Shared/Calendar/Calendar/Calendar'
import { Grid } from '@mui/material';
import Appointments from '../Appointments/Appointments';

const DashboardHome = () => {
    const [date, setDate] = React.useState(new Date())
    return (
        <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                <Calendar
                    date={date}
                    setDate={setDate}></Calendar>
            </Grid>
            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                <Appointments date={date}></Appointments>
            </Grid>
        </Grid>
    );
};

export default DashboardHome;