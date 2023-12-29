import React, { useState, useEffect, useRef } from "react";
import "../Form.css";
import "../PrisonerForm/PrisonerForm.css";
import Button from "../Button";
import { queryStaffFormat } from "../../utils/formatUtils";
import {insertBlock, insertCell} from "../../service/prisonUnitsService"
import BlockDetails from "./BlockDetails";


const BlockForm = ({ details, isOpen, onClose }) => {
  const formRef = useRef(null);
  // State variable to manage the form's input values.
  const [blockDetails, setBlockDetails] = useState(details);
  
  const handleCellDetailsChange = (field, value) => {
    setBlockDetails({ ...blockDetails, [field]: value });
  };

  const insertNewBlock = () => {
    console.log(blockDetails);
    const info = {...blockDetails};
    console.log(info)
    const success = insertBlock(info);
    if (success) onClose();
  }


  return (
    <form ref={formRef} className="form prisoner-form">
      <h2 className="form-title">Blocks Form</h2>
      <div className="grid-container">
        <BlockDetails
          details={blockDetails}
          onChange={handleCellDetailsChange}
          setPrisonerDetails={setBlockDetails}
        />
      </div>
      <div className="btn-section">
        <Button onClick={insertNewBlock} classNames='btn btn-4' text='Add Block' />
        <Button onClick={onClose} classNames='btn btn-3' text='Cancel' />
      </div>
    </form>
  );
};

export default BlockForm;
