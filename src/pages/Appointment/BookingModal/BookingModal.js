import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import useStyle from '../../Shared/useStyle/useStyle';
import useAuth from '../../../hooks/useAuth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const BookingModal = ({ bookingOpen, handleBookingClose, booking, date, setBookingSuccess }) => {
    const { user } = useAuth()
    const { name, time } = booking;
    const { btnCustom } = useStyle()
    const initialInfo = {
        patientName: user.displayName, email: user.email, phone: ''

    }
    const [bookingInfo, setBookingInfo] = useState(initialInfo)

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...bookingInfo };
        newInfo[field] = value;
        setBookingInfo(newInfo)
        console.log(newInfo)
    }
    const handleSubmit = e => {
        e.preventDefault()
        const appointment = {
            ...bookingInfo,
            time,
            serviceName: name,
            date: date.toLocaleDateString()
        }
        fetch('http://localhost:5000/appointments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(appointment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    setBookingSuccess(true)
                    handleBookingClose()
                }
            })
        console.log(appointment)

    }
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={bookingOpen}
            onClose={handleBookingClose}
            closeAfterTransition

            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={bookingOpen} >
                <Box sx={style} >
                    <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', color: '#1CC7C1', mb: 2 }}>
                        {name}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            disabled
                            sx={{ width: '100%', mb: 2 }}
                            id="outlined-size-small"
                            defaultValue={time}
                            size="small"
                        />
                        <TextField
                            name="patientName"
                            onBlur={handleOnBlur}
                            sx={{ width: '100%', mb: 2 }}
                            id="outlined-size-small"
                            defaultValue={user?.displayName}
                            size="small"
                        />
                        <TextField
                            onBlur={handleOnBlur}
                            name="email"
                            sx={{ width: '100%', mb: 2 }}
                            id="outlined-size-small"
                            defaultValue={user?.email}
                            size="small"
                        />
                        <TextField
                            disabled
                            sx={{ width: '100%', mb: 2 }}
                            id="outlined-size-small"
                            defaultValue={date.toDateString()}
                            size="small"
                        />
                        <TextField
                            onBlur={handleOnBlur}
                            name="phone"
                            sx={{ width: '100%', mb: 2 }}
                            id="outlined-size-small"
                            placeholder="Your Phone Number"
                            size="small"
                        />
                        <Button onClick={handleSubmit} sx={{ textAlign: 'center' }} style={btnCustom} variant="contained" type="submit">Submit</Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default BookingModal;