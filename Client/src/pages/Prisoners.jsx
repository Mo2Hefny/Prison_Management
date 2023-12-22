import React from 'react'
import { useState } from 'react';
import PrisonerForm from '../components/PrisonerForm/PrisonerForm';
import './Prisoners.css'

const Prisoners = () => {

  // State variable to manage the form's visibility.
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Function to toggle the form's visibility.
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  
  return (
    <div className='prisoners-page'>
    <div>Prisoners</div>
    <button onClick={toggleForm}>Open Form</button>
    {/* Render the form when it is opened */}
    {isFormOpen && (<PrisonerForm isOpen={isFormOpen} onClose={toggleForm}></PrisonerForm>)}
    </div>
  )
}

export default Prisoners