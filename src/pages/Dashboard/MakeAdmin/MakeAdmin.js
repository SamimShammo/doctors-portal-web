import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from './../../../hooks/useAuth';

const MakeAdmin = () => {
    const { token } = useAuth()
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    const handleOnBlur = e => {
        setEmail(e.target.value)

    }
    const handleSubmit = e => {
        const user = { email }
        fetch('http://localhost:5000/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {

                    setSuccess(true)
                }
                console.log(data)
            })
        e.preventDefault()
    }
    return (
        <div>
            <h1>Make an Admin</h1>
            {success && <Alert severity="success" sx={{ width: "85%" }}>Made Admin Successfully!</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    onBlur={handleOnBlur}
                    label="Email"
                    type="email"
                    sx={{ width: '100%', mb: 2 }}

                />
                <Button type="submit">Make Admin</Button>
            </form>
        </div>
    );
};

export default MakeAdmin;