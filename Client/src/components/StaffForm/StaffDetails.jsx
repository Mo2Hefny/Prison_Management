import React, { useEffect, useState } from 'react'
import Input from '../Input';
import DropdownMenu from '../DropdownMenu';
import DateComp from '../DateComp';
import {getsupervisors} from '../../service/staffService'
import { SelectAutoWidth, SelectSmall } from '../SelectComponent';
import { getMonthDifference } from '../../utils/dateUtils';

const StaffDetails = ({ details, onChange, setPrisonerDetails }) => {
  const [supervisor, setSupervisor] = useState([]);
  const genderList = ['Male', 'Female']
  const statusList = ['Single', 'Married', 'Divorced', 'Widowed']
  const staff_types = ['doctor', 'guard', 'general']
  const handleChange = (e, field) => {
    onChange(field, e.target.value);
  };
  const handleDateChange = (newDate, field) => {
    onChange(field, newDate);
  };
  useEffect(() => {
    async function fetchSupervisorSSN() {
      try {
        const supervisorslist = await getsupervisors();
        const filteredlist = supervisorslist.map((sp) => sp.supervisor_id)
        console.log(filteredlist)
        setSupervisor([ ...filteredlist]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchSupervisorSSN();
  }, []);
  console.log(supervisor)
  return (
    <div className='form-section prisoner-details'>
      <h3 className='form-section-title'>Staff Details</h3>
      <div className="form-section-input">
        <Input value={details.fname} field='fname' label='First Name' onChange={handleChange} />
        <Input value={details.lname} field='lname' label='Last Name' onChange={handleChange} />
        <Input type="number" value={details.ssn} field='ssn' label='SSN' onChange={handleChange} />
        <Input type="number" value={details.salary} field='salary' label='Salary' onChange={handleChange} />
        <Input type="password" value={details.password} field='password' label='Password' onChange={handleChange} />
        <SelectSmall value={details.gender} label='Gender' list={genderList} field='gender' onChange={handleChange} maxWidth={190} Null={false}/>
        <SelectSmall value={details.staff_type} label='Staff Type' list={staff_types} field='staff type' onChange={handleChange} maxWidth={190} Null={false}/>
        <SelectSmall value={details.status} label='Status' list={statusList} field='status' onChange={handleChange} maxWidth={190} Null={false}/>
        <SelectSmall value={details.supervisorID} label='Supervisor id' list={supervisor} field='supervisor id' onChange={handleChange} maxWidth={190} Null={false}/>
        <DateComp label='Hire Date' value={new Date(details.hireDate)} onChange={(value) => handleDateChange(value, `hiredate`)}/>
        <DateComp label="Birth date" value={new Date(details.bdate)} onChange={(value) => { handleDateChange(value, `bdate`) }} />
      </div>
    </div>
  )
}

export default StaffDetails