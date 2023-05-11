import React, { useState } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";

interface FormData {
    name: string;
    email: string;
    password: string;
}

interface SignUpProps {
    onSubmit: (formData: FormData) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={6} md={4}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" align="center">Sign Up</Typography>
                    <Box margin={1}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Box>
                    <Box margin={1}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Box>
                    <Box margin={1}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Box>
                    <Box margin={1}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Submit
                        </Button>
                    </Box>
                </form>
            </Grid>
        </Grid>
    );
};

export default SignUp;
