import React from 'react'
import Input from '../Input';
import DropdownMenu from '../DropdownMenu';
import DateComp from '../DateComp';

const PrisonerDetails = ({ details, onChange }) => {
  const handleChange = (e, field) => {
    onChange(field, e.target.value);
  }
  
  const HandleBirthDateChange = (newBirthDate) => {
    onChange('bdate', newBirthDate);
  }

  const genderList = ['Male', 'Female']
  const statusList = ['Detained', 'Released', 'Dead', 'Hospitalized']

  return (
    <div className='form-section prisoner-details'>
      <h3 className='form-section-title'>Prisoner Details</h3>
      <div className="form-section-input">
        <Input value={details.fname} field='fname' label='First Name' onChange={handleChange}/>
        <Input value={details.lname} field='lname' label='Last Name' onChange={handleChange}/>
        <Input type="number" value={details.ssn} field='ssn' label='SSN' onChange={handleChange} width={'150px'}/>
        <div className='input-container input-dropdown'>
          <label>Gender:</label>
          <DropdownMenu list={genderList} defaultValue={details.gender} label='Gender' field='gender' onChange={handleChange} />
          <div class="error"></div>
        </div>
        <Input type="number" value={details.age} label='Age' field='age' onChange={handleChange} width={'100px'}/>
        <DateComp label="Birth date" value={details.bdate} onChange={HandleBirthDateChange} />
        <div className='input-container input-dropdown'>
          <label>Status:</label>
          <DropdownMenu list={statusList} defaultValue={details.status} label='Status' field='status' onChange={handleChange} />
          <div class="error"></div>
        </div>
      </div>
    </div>
  )
}

export default PrisonerDetails