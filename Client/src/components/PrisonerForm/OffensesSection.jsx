import React from 'react'
import Input from '../Input';
import DropdownMenu from '../DropdownMenu';
import DisplayTable from '../DisplayTable';

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

const OffensesSection = ({ details, onChange }) => {
  const handleChange = (e, field) => {
    onChange(field, e.target.value);
  }

  const selectedColumns = ['offenseID', 'offenseName', 'served']

  return (
    <div className='form-section offenses-section'>
      <div className='form-section-input'>
        <div className='sentence-date'>
          <Input type="date" value={details.admissionDate} field='admissionDate' onChange={handleChange}/>
          <Input type="date" value={details.releaseDate} field='releaseDate' onChange={handleChange}/>
        </div>
        <DisplayTable title='Offenses' dataTable={dt} selectedColumns={selectedColumns}/>
      </div>
    </div>
  )
}

export default OffensesSection