import React, { useState, useEffect, useRef } from "react";
import StaffDetails from "./StaffDetails";
import "../Form.css";
import "../PrisonerForm/PrisonerForm.css";
import Button from "../Button";

const StaffForm = ({ details, isOpen, onClose }) => {
  const formRef = useRef(null);
  // State variable to manage the form's input values.
  const [staffdetails, setStaffDetails] = useState(details);

  const handleStaffDetailsChange = (field, value) => {
    setStaffDetails({ ...staffdetails, [field]: value });
  };

  /*
  // State variable to manage the form's visibility.
  const [isOffenseFormOpen, setIsOffenseFormOpen] = useState(false);

  // Function to toggle the form's visibility.
  const toggleOffenseForm = () => {
    setIsOffenseFormOpen(!isOffenseFormOpen);
  };*/
  

  /*useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click occurred outside the form.
      if (formRef.current && !formRef.current.contains(event.target) && !event.target.classList.contains('openPrisonerForm')) {
        onClose();
      }
    };

    // Attach the event listener when the form is opened.
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    // Detach the event listener when the component is unmounted or the form is closed.
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);*/

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
        <Button type='submit' classNames='btn btn-4' text='Add Staff' />
        <Button onClick={onClose} classNames='btn btn-3' text='Cancel' />
      </div>
    </form>
  );
};

export default StaffForm;
