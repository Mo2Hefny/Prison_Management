import React, { useState, useEffect, useRef } from 'react';
import PrisonerDetails from './PrisonerDetails';
import OffensesSection from './OffensesSection';
import CellSection from './CellSection';
import './PrisonerForm.css';

const PrisonerForm = ({isOpen, onClose}) => {
  const formRef = useRef(null);
  const [prisonerDetails, setPrisonerDetails] = useState({
    fname: '',
    lname: '',
    age: '',
    bDate: '',
    Gender: 'Male',
    ssn: '',
    status: 'detained',
  });

  const handlePrisonerDetailsChange = (field, value) => {
    setPrisonerDetails({...prisonerDetails, [field]: value});
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click occurred outside the form.
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Attach the event listener when the form is opened.
    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    // Detach the event listener when the component is unmounted or the form is closed.
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <form className="prisoner-form">
    <h2 className='form-title'>Add a new prisoner</h2>
      <PrisonerDetails
      details={prisonerDetails}
      onChange={handlePrisonerDetailsChange}
      />
      <h3>Offenses</h3>
      <OffensesSection></OffensesSection>
      <h3>Cell</h3>
      <CellSection></CellSection>
    </form>
  )
}

export default PrisonerForm