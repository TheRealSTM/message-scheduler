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
    SelectChangeEvent, Checkbox, FormControlLabel
} from "@mui/material";


import dayjs, {Dayjs} from "dayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const frequencies = ['adhoc', 'hourly', 'daily', 'weekly', 'monthly'] as const;
type Frequency = typeof frequencies[number];

interface MessageCreationFormProps {
    onSubmit: (data: {
        frequency: Frequency;
        messageStartDate: dayjs.Dayjs | null;
        message: string;
        phoneNumber: string;
    }) => void;
}

const MessageCreationForm = ({ onSubmit }: MessageCreationFormProps) => {
    const [frequency, setFrequency] = useState<Frequency>("adhoc");
    const [checked, setChecked] = useState(false);
    const [messageStartDate, setMessageStartDate] = useState<dayjs.Dayjs | null>(dayjs());
    const [message, setMessage] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const handleFrequencyChange = (event: SelectChangeEvent<Frequency>) => {
        setFrequency(event.target.value as Frequency);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleMessageStartDateChange = (date: dayjs.Dayjs | null) => {
        setMessageStartDate(date);
    };

    const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({ frequency, messageStartDate, message, phoneNumber });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                            <DatePicker
                                label="Message Start date"
                                value={messageStartDate}
                                onChange={handleMessageStartDateChange}
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        name="repeat"
                                        color="primary"
                                    />
                                }
                                label="Repeat"
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
        </LocalizationProvider>
    );
};


export default MessageCreationForm;