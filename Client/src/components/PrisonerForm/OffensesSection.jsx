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

const OffensesSection = ({ details, onChange, toggleOffenseForm }) => {
  const selectedColumns = ['offenseID', 'offenseName', 'served']

  return (
    <div className='form-section offenses-section'>
      <DisplayTable title='Offenses' dataTable={dt} selectedColumns={selectedColumns} UIMode='addBtn' onClick={toggleOffenseForm}/>
    </div>
  )
}

export default OffensesSection