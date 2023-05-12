import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";

const frequencies = ['adhoc', 'hourly', 'daily', 'weekly', 'monthly'] as const;
type Frequency = typeof frequencies[number];

interface MessageCreationFormProps {
    onSubmit: (data: {
        frequency: Frequency;
        startDate: string;
        message: string;
        phoneNumber: string;
    }) => void;
}

const MessageCreationForm = ({ onSubmit }: MessageCreationFormProps) => {
    const [frequency, setFrequency] = useState<Frequency>("adhoc");
    const [startDate, setStartDate] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const handleFrequencyChange = (event: SelectChangeEvent<Frequency>) => {
        setFrequency(event.target.value as Frequency);
    };

    const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.target.value);
    };

    const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({ frequency, startDate, message, phoneNumber });
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={6} md={4}>

                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" align="center">Create Message:</Typography>
                    <Box margin={1}>
                        <FormControl fullWidth>
                            <InputLabel id="message-frequency-label">Message Frequency</InputLabel>
                            <Select
                                labelId="message-frequency-label"
                                id="frequency"
                                value={frequency}
                                label="Message Frequency"
                                onChange={handleFrequencyChange}
                            >
                                {
                                    frequencies.map(
                                        (frequency) => (
                                            <MenuItem key={frequency} value={frequency}>
                                                {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                                            </MenuItem>
                                        )
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box margin={1}>
                        <TextField
                            fullWidth
                            label="Start Date"
                            name="startDate"
                            value={startDate}
                            onChange={handleStartDateChange}
                            variant="outlined"
                        />
                    </Box>
                    <Box margin={1}>
                        <TextField
                            fullWidth
                            label="Message"
                            name="message"
                            value={message}
                            onChange={handleMessageChange}
                            variant="outlined"
                        />
                    </Box>
                    <Box margin={1}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
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


export default MessageCreationForm;