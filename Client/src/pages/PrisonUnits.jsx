import React from 'react'
import { useState } from 'react';
import PrisonerForm from '../components/PrisonerForm/PrisonerForm';
import './Prisoners.css'
import CollapsibleTable from '../components/CollapsibleTable';

const PrisonUnits = ({ view }) => {

  // State variable to manage the form's visibility.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const readOnly = ["staff", "visitor", "doctor"].includes(view);

  // Function to toggle the form's visibility.
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  
  return (
    <div className='page prison-units-page'>
    {/* Render the form when it is opened */}
    {isFormOpen && (<PrisonerForm isOpen={isFormOpen} onClose={toggleForm}></PrisonerForm>)}
      <h1 className='page-title'>Prison Units Management</h1>
      <div className='page-body'>
        <div className='page-body-section'>
          <div className='table collapsible-table'>
            <CollapsibleTable title='Prison Blocks' onAdd={toggleForm} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrisonUnits