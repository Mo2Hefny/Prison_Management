import React, { useState, useEffect, useRef } from "react";
import PrisonerDetails from "./PrisonerDetails";
import OffensesSection from "./OffensesSection";
import CellSection from "./CellSection";
import "../Form.css";
import "./PrisonerForm.css";
import Button from "../Button";

const PrisonerForm = ({ isOpen, onClose }) => {
  const formRef = useRef(null);
  const [prisonerDetails, setPrisonerDetails] = useState({
    fname: "",
    lname: "",
    age: "",
    bDate: "",
    gender: "Male",
    ssn: "",
    status: "Detained",
    admissionDate: "",
    releaseDate: "",
  });

  const handlePrisonerDetailsChange = (field, value) => {
    setPrisonerDetails({ ...prisonerDetails, [field]: value });
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click occurred outside the form.
      if (formRef.current && !formRef.current.contains(event.target)) {
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
  }, [isOpen, onClose]);

  return (
    <form className="form prisoner-form">
      <h2 className="form-title">Add a new prisoner</h2>
      <div className="grid-container">
        <PrisonerDetails
          details={prisonerDetails}
          onChange={handlePrisonerDetailsChange}
        />
        <OffensesSection
          details={prisonerDetails}
          onChange={handlePrisonerDetailsChange}
        />
        <CellSection
          details={prisonerDetails}
          onChange={handlePrisonerDetailsChange}
        />
      </div>
      <div className="btn-section">
        <Button type='submit' classNames='btn btn-4' text='Add Prisoner' />
        <Button onClick={onClose} classNames='btn btn-3' text='Cancel' />
      </div>
    </form>
  );
};

export default PrisonerForm;
