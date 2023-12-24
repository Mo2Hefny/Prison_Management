import React from 'react'
import { useState } from 'react';
import PrisonerForm from '../components/PrisonerForm/PrisonerForm';
import './Prisoners.css'
import EnhancedTable from '../components/SortingTable';
import { fetchPrisonerById } from '../service/prisonerService';

const Prisoners = () => {

  // State variable to manage the form's visibility.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [prisonerDetails, setPrisonerDetails] = useState({
    pid: null,
    fname: "",
    lname: "",
    age: "",
    bDate: "",
    gender: "Male",
    ssn: "",
    status: "Detained",
    admissionDate: new Date(),
    releaseDate: null,
    sentenceTime: 10,
  });
  // Function to toggle the form's visibility.
  const onClose = () => {
    setIsFormOpen(false);
    setPrisonerDetails({
      pid: null,
      fname: "",
      lname: "",
      age: "",
      bDate: "",
      gender: "Male",
      ssn: "",
      status: "Detained",
      admissionDate: new Date(),
      releaseDate: null,
      sentenceTime: 10,
    })
  }

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const getPrisonerDetails = async (id) => {
    try {
      const newDetails = await fetchPrisonerById(id);
      console.log('Fetched prisoner:', newDetails);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  return (
    <div className='page prisoners-page'>
    {/* Render the form when it is opened */}
    {isFormOpen && (<PrisonerForm details={prisonerDetails} edit={true} isOpen={isFormOpen} onClose={onClose}></PrisonerForm>)}
      <h1 className='page-title'>Prisoners Management Dashboard</h1>
      <div className='page-body'>
        <div className='page-body-section'>
          <div className='table enhanced-table'>
            <EnhancedTable title='Prisoners' onAdd={toggleForm} onEdit={getPrisonerDetails} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Prisoners