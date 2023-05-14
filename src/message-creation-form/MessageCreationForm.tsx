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


import dayjs from "dayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const frequencies = ['adhoc', 'hourly', 'daily', 'weekly', 'monthly'] as const;
type Frequency = typeof frequencies[number];

interface MessageCreationFormProps {
    onSubmit: (data: {
        frequency: Frequency;
        messageStartDate: dayjs.Dayjs | null;
        message: string;
        destinationPhoneNumber: string;
        callbackPhoneNumber: string;
    }) => void;
}

const MessageCreationForm = ({ onSubmit }: MessageCreationFormProps) => {
    const [messageStartDate, setMessageStartDate] = useState<dayjs.Dayjs | null>(dayjs());
    const [message, setMessage] = useState<string>('');
    const [destinationPhoneNumber, setDestinationPhoneNumber] = useState<string>('');
    const [callbackPhoneNumber, setCallbackPhoneNumberPhoneNumber] = useState<string>('');
    const [repeatMessageChecked, setRepeatMessageChecked] = useState(false);
    const [frequency, setFrequency] = useState<Frequency>("adhoc");

    const handleMessageStartDateChange = (date: dayjs.Dayjs | null) => {
        setMessageStartDate(date);
    };

    const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleDestinationPhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDestinationPhoneNumber(event.target.value);
    };

    const handleCallbackPhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCallbackPhoneNumberPhoneNumber(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({ frequency, messageStartDate, message, destinationPhoneNumber, callbackPhoneNumber });
    };

    const handleFrequencyChange = (event: SelectChangeEvent<Frequency>) => {
        setFrequency(event.target.value as Frequency);
    };

    const handleRepeatMessageChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatMessageChecked(event.target.checked);
    };

    const renderMessageFrequencySelectComponent = () => {
        return (
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
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <Grid item xs={12} sm={6} md={4}>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h5" align="center">Create Message:</Typography>
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
                                label="Destination Phone Number"
                                name="destinationPhoneNumber"
                                value={destinationPhoneNumber}
                                onChange={handleDestinationPhoneNumberChange}
                                variant="outlined"
                            />
                        </Box>
                        <Box margin={1}>
                            <TextField
                                fullWidth
                                label="Callback Phone Number"
                                name="callbackPhoneNumber"
                                value={callbackPhoneNumber}
                                onChange={handleCallbackPhoneNumberChange}
                                variant="outlined"
                            />
                        </Box>
                        <Box margin={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={repeatMessageChecked}
                                        onChange={handleRepeatMessageChecked}
                                        name="repeat"
                                        color="primary"
                                    />
                                }
                                label="Repeat"
                            />
                        </Box>
                        {
                            repeatMessageChecked ? renderMessageFrequencySelectComponent() : null
                        }
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