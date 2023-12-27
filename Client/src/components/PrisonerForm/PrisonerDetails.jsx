import React, { useEffect, useState } from 'react'
import Input from '../Input';
import DropdownMenu from '../DropdownMenu';
import DateComp from '../DateComp';
import { SelectAutoWidth, SelectSmall } from '../SelectComponent';
import { getMonthDifference } from '../../utils/dateUtils';

const PrisonerDetails = ({ details, onChange, setPrisonerDetails }) => {
  const [sentenceTime, setSentenceTime] = 
    useState(getMonthDifference(new Date(details.admission_date), new Date(details.release_date)));

  const handleChange = (e, field) => {
    onChange(field, e.target.value);
  }

  const handleBirthDateChange = (newBirthDate) => {
    onChange('bdate', newBirthDate);
  }

  const updateReleaseDate = (newSentenceTime) => {
    handleAdmissionDateChange(details.admission_date, newSentenceTime);
    setSentenceTime(newSentenceTime);
  }

  useEffect(() => {handleAdmissionDateChange(details.admission_date, sentenceTime)}, [sentenceTime, details.admission_date]);

  const handleAdmissionDateChange = (newAdmissionDate, sentenceTime) => {
    // Calculate releaseDate based on the new admissionDate
    const newReleaseDate = new Date(newAdmissionDate);
    newReleaseDate.setMonth(newReleaseDate.getMonth() + sentenceTime);

    // Update releaseDate in the parent component using setPrisonerDetails
    setPrisonerDetails((prevDetails) => ({
      ...prevDetails,
      admissionDate: newAdmissionDate,
      releaseDate: newReleaseDate,
    }));
  };

  console.log(sentenceTime);
  const genderList = ['Male', 'Female']
  const statusList = ['Detained', 'Released', 'Dead', 'Hospitalized']

  return (
    <div className='form-section prisoner-details'>
      <h3 className='form-section-title'>Prisoner Details</h3>
      <div className="form-section-input">
        <Input value={details.fname} field='fname' label='First Name' onChange={handleChange} />
        <Input value={details.lname} field='lname' label='Last Name' onChange={handleChange} />
        <Input type="number" value={details.ssn} field='ssn' label='SSN' onChange={handleChange} />
        <SelectSmall value={details.gender} label='Gender' list={genderList} field='gender' onChange={handleChange} maxWidth={190} Null={false}/>
        <SelectSmall value={details.status} label='Status' list={statusList} field='status' onChange={handleChange} maxWidth={190} Null={false}/>
        <DateComp label='Admission Date' value={new Date(details.admission_date)} onChange={handleAdmissionDateChange}/>
        <DateComp label="Birth date" value={new Date(details.bdate)} onChange={handleBirthDateChange} />
        <DateComp label='Release Date' value={new Date(details.release_date)} readOnly={true} />
      </div>
    </div>
  )
}

export default PrisonerDetails