import React, { useEffect, useState } from 'react'
import Input from '../Input';
import DropdownMenu from '../DropdownMenu';
import DateComp from '../DateComp';
import {getsupervisors} from '../../service/staffService'
import { SelectAutoWidth, SelectSmall } from '../SelectComponent';
import { getMonthDifference } from '../../utils/dateUtils';
import { fetchPrisonBlocks } from '../../service/prisonUnitsService';


const CellDetails = ({ details, onChange, setCellDetails }) => {
  /*
  blockid: null,
  securityType: "",
  blockName: "",
  cellsNum: 10,
  */
  const [blockLists, setBlockLists] = useState([]); // block list to appear 
  const listCapacities = [1,2,3,4,5,6];
  const floors = [1,2,3];
  const types = ['Inmate Cells','solidary cells','dormitory','double cell','single cell']
  console.log(details);
  // on change
  const handleChange = (e, field) => {
    onChange(field, e.target.value);
    console.log(e.target.value);
  };
  
  // use effect to fetch blocks
  useEffect(() => {
    async function fetchBlockIds() {
      try {
        const otherlist = await fetchPrisonBlocks();
        const filteredlist = otherlist.map((sp) => sp.blockid)
        console.log(filteredlist)
        setBlockLists([ ...filteredlist]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchBlockIds();
  }, []);
  console.log(blockLists)
  return (
    <div className='form-section prisoner-details'>
      <h3 className='form-section-title'>Cell Details</h3>
      <div className="form-section-input">
        {/*
        <Input value={details.fname} field='fname' label='First Name' onChange={handleChange} />
        <Input value={details.lname} field='lname' label='Last Name' onChange={handleChange} />
        <Input type="number" value={details.ssn} field='ssn' label='SSN' onChange={handleChange} />
        <Input type="number" value={details.salary} field='salary' label='Salary' onChange={handleChange} />*/}
        <Input type="number" value={details.cell_id} field='cell_id' label='cell id' onChange={handleChange} />
        <SelectSmall value={details.capacity} label='Size' list={listCapacities} field='capacity' onChange={onChange} maxWidth={190}/>
        <SelectSmall value={details.block_id} label='Block id' list={blockLists} field='block_id' onChange={onChange} maxWidth={190}/>
        <SelectSmall value={details.type} label='type' list={types} field='type' onChange={onChange} maxWidth={190}/>
        <SelectSmall value={details.floor} label='Floor' list={floors} field='floor' onChange={onChange} maxWidth={190}/>
      </div>
    </div>
    
  )
}

export default CellDetails