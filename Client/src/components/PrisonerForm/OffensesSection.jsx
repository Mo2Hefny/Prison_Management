import React, { useEffect, useState } from 'react'
import Input from '../Input';
import DropdownMenu from '../DropdownMenu';
import DisplayTable from '../DisplayTable';
import DateComp from '../DateComp';

const dt = [
  {
    offenseID: 1,
    Pid: 1,
    offenseName: 'Murder',
    convictedDate: '11/4/2020',
    served: false,
    description: 'test'
  },
  {
    offenseID: 2,
    Pid: 1,
    offenseName: 'Theft',
    convictedDate: '12/4/2022',
    served: false,
    description: 'test2'
  },
  {
    offenseID: 2,
    Pid: 1,
    offenseName: 'Theft',
    convictedDate: '12/4/2022',
    served: false,
    description: 'test2'
  },
  {
    offenseID: 2,
    Pid: 1,
    offenseName: 'Theft',
    convictedDate: '12/4/2022',
    served: false,
    description: 'test2'
  },
  {
    offenseID: 2,
    Pid: 1,
    offenseName: 'Theft',
    convictedDate: '12/4/2022',
    served: false,
    description: 'test2'
  },
  {
    offenseID: 2,
    Pid: 1,
    offenseName: 'Theft',
    convictedDate: '12/4/2022',
    served: false,
    description: 'test2'
  },
  {
    offenseID: 2,
    Pid: 1,
    offenseName: 'Theft',
    convictedDate: '12/4/2022',
    served: false,
    description: 'test2'
  },
]

const OffensesSection = ({ details, onChange, toggleOffenseForm, setPrisonerDetails }) => {
  const selectedColumns = ['offenseID', 'offenseName', 'served']

  const handleAdmissionDateChange = (newAdmissionDate) => {
    // Calculate releaseDate based on the new admissionDate
    const newReleaseDate = new Date(newAdmissionDate);
    newReleaseDate.setMonth(newReleaseDate.getMonth() + details['sentenceTime']);

    // Update releaseDate in the parent component using setPrisonerDetails
    setPrisonerDetails((prevDetails) => ({
      ...prevDetails,
      admissionDate: newAdmissionDate,
      releaseDate: newReleaseDate,
    }));
  };

  return (
    <div className='form-section offenses-section'>
      <div className='form-section-input'>
        <div className='sentence-date'>
          <DateComp label='Admission Date' value={details.admissionDate} onChange={handleAdmissionDateChange}/>
          <DateComp label='Release Date' value={details.releaseDate} readOnly={true} />
        </div>
        <DisplayTable title='Offenses' dataTable={dt} selectedColumns={selectedColumns} UIMode='addBtn' onClick={toggleOffenseForm}/>
      </div>
    </div>
  )
}

export default OffensesSection