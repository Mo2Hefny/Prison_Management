import React from 'react'
import Input from '../Input'
import DisplayTable from '../DisplayTable';

const dt = [
  {
    blockID: 1,
    cellID: 1,
    currCap: 0,
    capacity: 2,
    type: 'double cell',
    secType: 'High'
  },
  {
    blockID: 2,
    cellID: 3,
    currCap: 2,
    capacity: 4,
    type: 'Dormitory',
    secType: 'Low'
  },
]

const CellSection = ({ details, onChange }) => {
  const handleChange = (e, field) => {
    onChange(field, e.target.value);
  }

  const selectedColumns = ['cellID', 'currCap', 'capacity', 'secType']

  return (
    <div className='form-section cell-section'>
      <DisplayTable title='Cells' dataTable={dt} selectedColumns={selectedColumns}/>
    </div>
  )
}

export default CellSection