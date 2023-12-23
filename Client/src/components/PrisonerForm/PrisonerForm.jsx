import React, { useState, useEffect, useRef } from "react";
import PrisonerDetails from "./PrisonerDetails";
import OffensesSection from "./OffensesSection";
import CellSection from "./CellSection";
import "../Form.css";
import "./PrisonerForm.css";
import Button from "../Button";
import OffenseForm from "../OffenseForm/OffenseForm";

const PrisonerForm = ({ isOpen, onClose }) => {
  const formRef = useRef(null);
  // State variable to manage the form's input values.
  const [prisonerDetails, setPrisonerDetails] = useState({
    fname: "",
    lname: "",
    age: "",
    bDate: "",
    gender: "Male",
    ssn: "",
    status: "Detained",
    admissionDate: new Date(),
    releaseDate: null,
    sentenceTime: 10,
  });

  const handlePrisonerDetailsChange = (field, value) => {
    setPrisonerDetails({ ...prisonerDetails, [field]: value });
  };

  // State variable to manage the form's visibility.
  const [isOffenseFormOpen, setIsOffenseFormOpen] = useState(false);

  // Function to toggle the form's visibility.
  const toggleOffenseForm = () => {
    setIsOffenseFormOpen(!isOffenseFormOpen);
  };
  

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
      <h2 className="form-title">Add a new prisoner</h2>
      <div className="grid-container">
        <PrisonerDetails
          details={prisonerDetails}
          onChange={handlePrisonerDetailsChange}
        />
        <OffensesSection
          details={prisonerDetails}
          onChange={handlePrisonerDetailsChange}
          toggleOffenseForm={toggleOffenseForm}
          setPrisonerDetails={setPrisonerDetails}
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
      {isOffenseFormOpen && (<OffenseForm isOpen={isOffenseFormOpen} onClose={toggleOffenseForm} />)}
    </form>
  );
};

export default PrisonerForm;
