import React, { useState, useRef } from "react";
import "../Form.css";
import "../PrisonerForm/PrisonerForm.css";
import Button from "../Button";
import { insertBlock } from "../../service/prisonUnitsService";
import BlockDetails from "./BlockDetails";
import ReportComponent from "../../../ShowBarPlot";

const BlockForm = ({ details, isOpen, onClose }) => {
  const formRef = useRef(null);
  const [blockDetails, setBlockDetails] = useState(details);
  const [showReport, setShowReport] = useState(false);

  const handleCellDetailsChange = (field, value) => {
    setBlockDetails({ ...blockDetails, [field]: value });
  };

  const insertNewBlock = () => {
    console.log(blockDetails);
    const info = { ...blockDetails };
    console.log(info);
    const success = insertBlock(info);
    if (success) onClose();
  };

  const handleShowReportClick = () => {
    // Set the state to show the ReportComponent
    setShowReport(true);
  };

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
        <Button onClick={insertNewBlock} classNames="btn btn-4" text="Add Block" />
        <Button onClick={onClose} classNames="btn btn-3" text="Cancel" />
        <Button onClick={handleShowReportClick} classNames="btn btn-3" text="Yes" />
      </div>
    </form>
  );
};

export default BlockForm;