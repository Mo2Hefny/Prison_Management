import React from 'react'
import Input from '../Input';
import DropdownMenu from '../DropdownMenu';

const PrisonerDetails = ({ details, onChange }) => {
  const handleChange = (e, field) => {
    onChange(field, e.target.value);
  }

  const genderList = ['Male', 'Female']
  const statusList = ['Detained', 'Released', 'Dead', 'Hospitalized']

  return (
    <div className='form-section prisoner-details'>
      <h3 className='form-section-title'>Prisoner Details</h3>
      <div className="form-section-input">
        <Input value={details.fname} field='fname' label='first name' onChange={handleChange}/>
        <Input value={details.lname} field='lname' label='second name' onChange={handleChange}/>
        <Input type="number" value={details.ssn} field='ssn' label='SSN' onChange={handleChange} width={'150px'}/>
        <div className='input-container input-dropdown'>
          <label>Gender:</label>
          <DropdownMenu list={genderList} defaultValue={details.gender} field='gender' onChange={handleChange} />
          <div class="error"></div>
        </div>
        <Input type="number" value={details.age} field='age' onChange={handleChange} width={'100px'}/>
        <Input type="date" value={details.bdate} field='bdate' onChange={handleChange}/>
        <div className='input-container input-dropdown'>
          <label>Status:</label>
          <DropdownMenu list={statusList} defaultValue={details.status} field='status' onChange={handleChange} />
          <div class="error"></div>
        </div>
      </div>
    </div>
  )
}

export default PrisonerDetails