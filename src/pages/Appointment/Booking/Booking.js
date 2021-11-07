import { Button, Grid } from '@mui/material';
import React from 'react';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import useStyle from '../../Shared/useStyle/useStyle';
import BookingModal from '../BookingModal/BookingModal';

const Booking = ({ booking, date, setBookingSuccess }) => {
    const [bookingOpen, setBookingOpen] = React.useState(false);
    const handleBookingOpen = () => setBookingOpen(true);
    const handleBookingClose = () => setBookingOpen(false);

    const { btnCustom } = useStyle()
    const { name, time, space } = booking;
    return (
        <>
            <Grid item xl={4} md={4} xs={6} >

                <Paper elevation={3} sx={{ textAlign: 'center', p: 5, }}>
                    <Typography sx={{ color: '#1CC7C1' }} variant="h4">{name}</Typography>
                    <Typography sx={{}} variant="h6">{time}</Typography>
                    <Typography sx={{ color: 'gray' }} variant="h6">{space}</Typography>
                    <Button onClick={handleBookingOpen} sx={{ textAlign: 'center' }} style={btnCustom} variant="contained">BOOK APPOINTMENT</Button>
                </Paper>
            </Grid>
            <BookingModal
                date={date}
                booking={booking}
                handleBookingClose={handleBookingClose}
                bookingOpen={bookingOpen}
                setBookingSuccess={setBookingSuccess}
            >

            </BookingModal>
        </>
    );
};

export default Booking;