import React, { useEffect, useState } from 'react'
import Input from '../Input';
import DropdownMenu from '../DropdownMenu';
import DateComp from '../DateComp';
import { SelectAutoWidth, SelectSmall } from '../SelectComponent';


const BlockDetails = ({ details, onChange, setBlockDetails }) => {
  /*
    blockid: null,
    securityType: "",
    blockName: "",
    cellsNum: 10,
  */
  const types = ['very Low','Low','Medium','High','Maximum'];
  const cellsnum = [1,2,3,4,5,6,7,8,9,10]
  console.log(details);
  // on change
  const handleChange = (e, field) => {
    onChange(field, e.target.value);
    console.log(e.target.value);
  };
  
  return (
    <div className='form-section prisoner-details'>
      <h3 className='form-section-title'>Block Details</h3>
      <div className="form-section-input">
        <Input type="number" value={details.blockid} field='blockid' label='Block id' onChange={handleChange} Null={false}/>
        <Input value={details.blockName} field='blockName' label='Block name' onChange={handleChange} Null={false}/>
        <SelectSmall value={details.securityType} label='security Type' list={types} field='securityType' onChange={onChange} maxWidth={190} Null={false}/>
        <SelectSmall value={details.cellsNum} label='Cells num' list={cellsnum} field='cellsNum' onChange={onChange} maxWidth={190}/>
      </div>
    </div>
    
  )
}

export default BlockDetails