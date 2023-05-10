import React from 'react';
import './App.css';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import SignUp from "./sign-up/SignUp";
import MessageCreationForm from "./message-creation-form/MessageCreationForm";

const App = () => {
  const handleSubmit = (formData: any) => {
    console.log(formData);
  };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignUp onSubmit={handleSubmit}/>} />
                <Route path="/create-message" element={<MessageCreationForm onSubmit={handleSubmit}/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
