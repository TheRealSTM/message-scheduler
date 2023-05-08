import React from 'react';
import './App.css';
import SignUp from "./sign-up/SignUp";

const App = () => {
  const handleSubmit = (formData: any) => {
    console.log(formData);
  };

  return <SignUp onSubmit={handleSubmit} />;
};

export default App;
