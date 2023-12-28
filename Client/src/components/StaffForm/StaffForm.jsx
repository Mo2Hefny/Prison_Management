import React, { useState, useEffect, useRef } from "react";
import StaffDetails from "./StaffDetails";
import "../Form.css";
import "../PrisonerForm/PrisonerForm.css";
import Button from "../Button";
import { queryStaffFormat } from "../../utils/formatUtils";
import {insertStaff} from "../../service/staffService"


const StaffForm = ({ details, isOpen, onClose }) => {
  const formRef = useRef(null);
  // State variable to manage the form's input values.
  const [staffdetails, setStaffDetails] = useState(details);

  const handleStaffDetailsChange = (field, value) => {
    setStaffDetails({ ...staffdetails, [field]: value });
  };

  const insertNewStaff = () => {
    console.log(staffdetails);
    const info = {...staffdetails};
    console.log(info)
    queryStaffFormat(info);
    const success = insertStaff(info);
    if (success) onClose();
  }


  

  return (
    <form ref={formRef} className="form prisoner-form">
      <h2 className="form-title">Staff Form</h2>
      <div className="grid-container">
        <StaffDetails
          details={staffdetails}
          onChange={handleStaffDetailsChange}
          setPrisonerDetails={setStaffDetails}
        />
      </div>
      <div className="btn-section">
        <Button onClick={insertNewStaff} classNames='btn btn-4' text='Add Staff' />
        <Button onClick={onClose} classNames='btn btn-3' text='Cancel' />
      </div>
    </form>
  );
};

export default StaffForm;
