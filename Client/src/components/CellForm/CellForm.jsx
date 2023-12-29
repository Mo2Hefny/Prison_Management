import React, { useState, useEffect, useRef } from "react";
import "../Form.css";
import "../PrisonerForm/PrisonerForm.css";
import Button from "../Button";
import { queryStaffFormat } from "../../utils/formatUtils";
import {insertCell} from "../../service/prisonUnitsService"
import CellDetails from "./CellDetails";


const CellForm = ({ details, isOpen, onClose }) => {
  const formRef = useRef(null);
  // State variable to manage the form's input values.
  const [cellDetails, setCellDetails] = useState(details);
  
  const handleCellDetailsChange = (field, value) => {
    setCellDetails({ ...cellDetails, [field]: value });
  };

  const insertNewCell = () => {
    console.log(cellDetails);
    const info = {...cellDetails};
    console.log(info)
    const success = insertCell(info);
    if (success) onClose();
  }


  return (
    <form ref={formRef} className="form prisoner-form">
      <h2 className="form-title">Cells Form</h2>
      <div className="grid-container">
        <CellDetails
          details={cellDetails}
          onChange={handleCellDetailsChange}
          setPrisonerDetails={setCellDetails}
        />
      </div>
      <div className="btn-section">
        <Button onClick={insertNewCell} classNames='btn btn-4' text='Add Cell' />
        <Button onClick={onClose} classNames='btn btn-3' text='Cancel' />
      </div>
    </form>
  );
};

export default CellForm;
