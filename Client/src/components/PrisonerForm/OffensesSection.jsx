import React, { useEffect, useState } from 'react'
import Input from '../Input';
import DropdownMenu from '../DropdownMenu';
import DisplayTable from '../DisplayTable';
import DateComp from '../DateComp';
import { fetchOffensesWithNoPrisoner } from '../../service/prisonerService';

const offenseHeadCells = [
  { 
    field: 'offensename', 
    headerName: 'Offense',
    width: 140 
  },
  { 
    field: 'jailtime', 
    headerName: 'Jail Time',
    width: 140 
  },
]

const OffensesSection = ({ details, onChange, toggleOffenseForm }) => {
  const selectedColumns = ['offenseID', 'offenseName', 'served']

  const [offensesTable, setOffensesTable] = useState([{}]);

  useEffect(() => {
    async function fetchOffenses() {
      const offensesNoCorr = await fetchOffensesWithNoPrisoner();
      const offensesWithID = offensesNoCorr.map((offense) => { console.log(offense); return {id:offense.offenseid ,...offense} })
      console.log(offensesWithID);
      setOffensesTable([...offensesWithID])
    }
    fetchOffenses();
  }, [])

  return (
    <div className='form-section offenses-section'>
      <DisplayTable title='Offenses' dataTable={offensesTable} selectedColumns={offenseHeadCells} UIMode='addBtn' onClick={toggleOffenseForm}/>
    </div>
  )
}

export default OffensesSection