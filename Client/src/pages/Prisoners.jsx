import React from 'react'
import { useState } from 'react';
import PrisonerForm from '../components/PrisonerForm/PrisonerForm';
import './Prisoners.css'
import EnhancedTable from '../components/SortingTable';

const Prisoners = () => {

  // State variable to manage the form's visibility.
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Function to toggle the form's visibility.
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  
  return (
    <div className='page prisoners-page'>
    {/* Render the form when it is opened */}
    {isFormOpen && (<PrisonerForm isOpen={isFormOpen} onClose={toggleForm}></PrisonerForm>)}
      <h1 className='page-title'>Prisoners Management Dashboard</h1>
      <div className='page-body'>
        <div className='page-body-section'>
          <div className='table'>
            <EnhancedTable title='Prisoners' onAdd={toggleForm} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Prisoners