import React, { useState, useEffect, useRef } from "react";
import PrisonerDetails from "./PrisonerDetails";
import OffensesSection from "./OffensesSection";
import CellSection from "./CellSection";
import "../Form.css";
import "./PrisonerForm.css";
import Button from "../Button";
import OffenseForm from "../OffenseForm/OffenseForm";
import { insertPrisoner } from "../../service/prisonerService";
import { queryPrisonerFormat } from "../../utils/formatUtils";

const PrisonerForm = ({ details, isOpen, isEdit, onClose, onSubmit }) => {
  const formRef = useRef(null);
  // State variable to manage the form's input values.
  const [prisonerDetails, setPrisonerDetails] = useState(details);

  const handlePrisonerDetailsChange = (field, value) => {
    setPrisonerDetails({ ...prisonerDetails, [field]: value });
  };

  // State variable to manage the form's visibility.
  const [isOffenseFormOpen, setIsOffenseFormOpen] = useState(false);

  // Function to toggle the form's visibility.
  const toggleOffenseForm = () => {
    setIsOffenseFormOpen(!isOffenseFormOpen);
  };
  
  //Insert new prisoner
  const insertNewPrisoner = () => {
    console.log(prisonerDetails);
    const info = {...prisonerDetails};
    queryPrisonerFormat(info);
    const success = insertPrisoner(info);
    if (success) onClose();
  }

  return (
    <form ref={formRef} className="form prisoner-form">
      <h2 className="form-title">Prisoner Form</h2>
      <div className="grid-container">
        <PrisonerDetails
          details={prisonerDetails}
          onChange={handlePrisonerDetailsChange}
          setPrisonerDetails={setPrisonerDetails}
        />
        <OffensesSection
          details={prisonerDetails}
          onChange={handlePrisonerDetailsChange}
          toggleOffenseForm={toggleOffenseForm}
        />
        <CellSection
          details={prisonerDetails}
          onChange={handlePrisonerDetailsChange}
        />
      </div>
      <div className="btn-section">
        <Button onClick={isEdit ? insertNewPrisoner : insertNewPrisoner} classNames='btn btn-4' text={isEdit ? 'Edit Prisoner' : 'Add Prisoner'} />
        <Button onClick={onClose} classNames='btn btn-3' text='Cancel' />
      </div>
      {isOffenseFormOpen && (<OffenseForm isOpen={isOffenseFormOpen} onClose={toggleOffenseForm} />)}
    </form>
  );
};

export default PrisonerForm;
