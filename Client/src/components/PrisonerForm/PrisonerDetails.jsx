import React, { useEffect } from 'react'
import Input from '../Input';
import DropdownMenu from '../DropdownMenu';
import DateComp from '../DateComp';
import { SelectAutoWidth, SelectSmall } from '../SelectComponent';

const PrisonerDetails = ({ details, onChange, setPrisonerDetails }) => {
  const handleChange = (e, field) => {
    onChange(field, e.target.value);
  }
  
  const handleBirthDateChange = (newBirthDate) => {
    onChange('bdate', newBirthDate);
  }

  useEffect(() => {handleAdmissionDateChange(details.admissionDate)}, []);

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

  const genderList = ['Male', 'Female']
  const statusList = ['Detained', 'Released', 'Dead', 'Hospitalized']

  return (
    <div className='form-section prisoner-details'>
      <h3 className='form-section-title'>Prisoner Details</h3>
      <div className="form-section-input">
        <Input value={details.fname} field='fname' label='First Name' onChange={handleChange} />
        <Input value={details.lname} field='lname' label='Last Name' onChange={handleChange} />
        <Input type="number" value={details.ssn} field='ssn' label='SSN' onChange={handleChange} />
        <Input type="number" value={details.age} label='Age' field='age' onChange={handleChange} />
        <SelectSmall value={details.gender} label='Gender' list={genderList} field='gender' onChange={handleChange} maxWidth={190} Null={false}/>
        <SelectSmall value={details.status} label='Status' list={statusList} field='status' onChange={handleChange} maxWidth={190} Null={false}/>
        <DateComp label='Admission Date' value={details.admissionDate} onChange={handleAdmissionDateChange}/>
        <DateComp label="Birth date" value={details.bdate} onChange={handleBirthDateChange} />
        <DateComp label='Release Date' value={details.releaseDate} readOnly={true} />
      </div>
    </div>
  )
}

export default PrisonerDetails