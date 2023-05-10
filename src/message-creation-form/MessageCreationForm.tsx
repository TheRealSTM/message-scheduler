import { useState, ChangeEvent, FormEvent } from 'react';

type Frequency = 'adhoc' | 'hourly' | 'daily' | 'weekly' | 'monthly';

interface MessageCreationFormProps {
    onSubmit: (data: {
        frequency: Frequency;
        startDate: string;
        message: string;
        phoneNumber: string;
    }) => void;
}

const MessageCreationForm = ({ onSubmit }: MessageCreationFormProps) => {
    const [frequency, setFrequency] = useState<Frequency>('hourly');
    const [startDate, setStartDate] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const handleFrequencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
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
        <form onSubmit={handleSubmit}>
            <label htmlFor="frequency">Frequency: </label>
            <select id="frequency" value={frequency} onChange={handleFrequencyChange}>
                <option value="adhoc">Ad Hoc</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="weekly">Monthly</option>
            </select>
            <br />
            <label htmlFor="startDate">Start Date: </label>
            <input type="text" id="startDate" value={startDate} onChange={handleStartDateChange} />
            <br />
            <label htmlFor="message">Message: </label>
            <input type="text" id="message" value={message} onChange={handleMessageChange} />
            <br />
            <label htmlFor="phoneNumber">Phone Number: </label>
            <input type="text" id="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};


export default MessageCreationForm;