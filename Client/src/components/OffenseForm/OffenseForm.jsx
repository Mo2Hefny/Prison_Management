import React, { useState, useEffect, useRef } from "react";
import "../Form.css";
import Button from "../Button";

const OffenseForm = ({ isOpen, onClose }) => {

  const formRef = useRef(null);
  const [offenseDetails, setOffenseDetails] = useState({
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

  const handleOffenseDetailsChange = (field, value) => {
    setOffenseDetails({ ...offenseDetails, [field]: value });
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click occurred outside the form.
      if (formRef.current && !formRef.current.contains(event.target) && !event.target.closest('.add-btn')) {
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
    <form ref={formRef} className="form offense-form">
      <h3 className="form-title">Add an Offense</h3>
      <div className="grid-container">
      </div>
      <div className="btn-section">
        <Button type='submit' classNames='btn btn-4' text='Add Offense' />
        <Button onClick={onClose} classNames='btn btn-3' text='Cancel' />
      </div>
    </form>
  )
}

export default OffenseForm