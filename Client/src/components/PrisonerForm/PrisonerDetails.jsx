import React from 'react'
import Input from '../Input';

const PrisonerDetails = ({ details, onChange }) => {
  const handleChange = (e, field) => {
    onChange(field, e.target.value);
  }

  return (
    <div className='form-section prisoner-details'>
      <h3 className='form-section-title'>Prisoner Details</h3>
      <Input value={details.fname} field='fname' label='first name' onChange={handleChange}/>
      <Input value={details.lname} field='lname' label='second name' onChange={handleChange}/>
      <Input type="number" value={details.ssn} field='ssn' label='SSN' onChange={handleChange}/>
      <Input value={details.gender} field='gender' onChange={handleChange}/>
      <Input type="number" value={details.age} field='age' onChange={handleChange}/>
      <Input type="date" value={details.bdate} field='bdate' onChange={handleChange}/>
      <Input value={details.status} field='status' onChange={handleChange} isDisabled={true} />
    </div>
  )
}

export default PrisonerDetails