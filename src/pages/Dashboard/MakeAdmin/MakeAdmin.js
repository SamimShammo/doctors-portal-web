import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const MakeAdmin = () => {
    const [email, setEmail] = useState('')
    const handleOnBlur = e => {
        setEmail(e.target.value)

    }
    const handleSubmit = e => {
        const user = { email }
        fetch('http://localhost:5000/users/admin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
        e.preventDefault()
    }
    return (
        <div>
            <h1>Make an Admin</h1>

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