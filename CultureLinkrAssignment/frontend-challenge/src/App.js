import React, { useState } from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import SuccessMessage from './components/SuccessMessage';
import Navbar from './components/Navbar';

const App = () => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="App-header">

        <h1>Contact Us</h1>
        <div className="form-container">
          {formData ? (
            <SuccessMessage name={formData.name} />
          ) : (
            <ContactForm onSubmit={handleFormSubmit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
