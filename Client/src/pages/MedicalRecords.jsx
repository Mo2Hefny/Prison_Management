import React from "react";
import { useState, useEffect } from "react";
import PrisonerForm from "../components/PrisonerForm/PrisonerForm";
import "./Prisoners.css";
import EnhancedTable from "../components/SortingTable";
import { filterDoctorColumns, filterMedicalRecordsColumns, filterStaffColumns } from "../utils/dataUtils";
import { fetchMedicalRecords, fetchMedicalRecordById, fetchTreatmentsByRecordId, fetchMedicalRecordByDoctorId } from "../service/medicalRecordService";
import DisplayTable from "../components/DisplayTable";
import CollapsibleTable from "../components/CollapsibleTable";
import { fetchDoctors, fetchStaff } from "../service/staffService";
import { fixMedicalRecordFormat } from "../utils/formatUtils";

const recordsHeadCells = [
  {
    id: 'Prisoner name',
    numeric: false,
    disablePadding: false,
    color: "var(--primary-color)",
    label: 'Patient',
  },
  {
    id: 'Staff name',
    numeric: false,
    disablePadding: false,
    label: 'Assigned Doctor',
  },
  {
    id: 'updatedate',
    numeric: true,
    disablePadding: false,
    label: 'Last Updated',
  },
  
];

const subRecordsHeadCells = [
  {
    id: 'Prisoner name',
    numeric: false,
    disablePadding: false,
    color: "var(--primary-color)",
    label: 'Patient',
  },
  {
    id: 'record_no',
    numeric: false,
    disablePadding: false,
    label: 'Record Number',
  },
  {
    id: 'updatedate',
    numeric: true,
    disablePadding: false,
    label: 'Last Updated',
  },
  
];

const treatmentsHeadCells = [
  {
    id: 'Drug Name',
    numeric: false,
    disablePadding: false,
    color: "var(--primary-color)",
    label: 'Drug',
  },
  {
    id: 'Admission doses',
    numeric: true,
    disablePadding: false,
    label: 'Admission Dosage',
  },
  {
    id: 'Drug doses',
    numeric: true,
    disablePadding: false,
    label: 'Drug Dosage',
  },
  
];

const doctorsHeadCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Doctor\'s Name',
  },
  {
    id: 'ssn',
    numeric: false,
    disablePadding: false,
    label: 'SSN',
  },
  {
    id: 'speciality',
    numeric: false,
    disablePadding: false,
    label: 'Specialty',
  },
  {
    id: 'num_records',
    numeric: false,
    disablePadding: false,
    label: 'Load',
  },
  
];

const MedicalRecords = ({ view }) => {
  // State variable to manage the form's visibility.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  // Record variables
  const [recordDetails, setRecordDetails] = useState([]);
  const [recordFilteredTable, setRecordsFilteredTable] = useState([{}]);
  // Doctors variables
  const [doctorsFilteredTable, setDoctorsFilteredTable] = useState([{}]);
  const readOnly = ["visitor", "staff"].includes(view);
  // Function to toggle the form's visibility.
  const onClose = () => {
    setIsFormOpen(false);
    setRecordDetails({
      pid: null,
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
  };

  const editForm = () => {
    setIsFormEdit(true);
    setIsFormOpen(true);
  };

  const toggleForm = () => {
    setIsFormEdit(false);
    setIsFormOpen(!isFormOpen);
  };

  const getRecordDetails = async (id) => {
    try {
      const newDetails = await fetchMedicalRecordById(id);
      console.log("Fetched prisoner:", newDetails);
      setRecordDetails({ ...newDetails });
      editForm();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Retrieve all medical records and the treatments administered to each patient
  useEffect(() => {
    async function fetchMedicalRecordData() {
      try {
        const recordsDataTable = await fetchMedicalRecords();
        // Retrieve all treatments details belonging to each patient.
        const tableWithTreatments = await Promise.all(
          recordsDataTable.map(async (record) => {
            console.log(record);
            const treatments = await fetchTreatmentsByRecordId([record['Prisoner id'], record['Record id']]);
            console.log(treatments);
            return { ...record, treatments };
          })
        );
        const filteredTable = filterMedicalRecordsColumns(tableWithTreatments, recordsHeadCells, treatmentsHeadCells);
        console.log("Fetched medical records:", filteredTable);
        setRecordsFilteredTable([ ...filteredTable ]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchMedicalRecordData();
  }, [isFormEdit, isFormOpen]);

  // Retrieve all visitations details on any change or submission
  useEffect(() => {
    async function fetchDoctorsDetails() {
      try {
        const doctorsDataTable = await fetchDoctors();
        const tableWithRecords = await Promise.all(
          doctorsDataTable.map(async (doctor) => {
            console.log(doctor);
            const records = await fetchMedicalRecordByDoctorId(doctor.doctor_id);
            console.log(records);
            return { ...doctor, records };
          })
        );
        console.log(tableWithRecords);
        const filteredTable = filterDoctorColumns(tableWithRecords, doctorsHeadCells, subRecordsHeadCells);
        console.log("Fetched doctors:", filteredTable);
        setDoctorsFilteredTable([ ...filteredTable ]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchDoctorsDetails();
  }, [isFormEdit, isFormOpen]);

  return (
    <div className="page visitations-page">
      {/* Render the form when it is opened */}
      {isFormOpen && (
        <PrisonerForm
          details={visitorDetails}
          isOpen={isFormOpen}
          onClose={onClose}
        ></PrisonerForm>
      )}
      <h1 className="page-title">Medical Wing Dashboard</h1>
      <div className="page-body">
        <div className="page-body-section">
          <div className="table collapsible-table">
            <CollapsibleTable
              dataTable={recordFilteredTable}
              dataHeadCells={recordsHeadCells}
              subDataHeadCells={treatmentsHeadCells}
              title="Medical Records"
              subTableTitle="Patient Treatments"
              onAdd={toggleForm}
              onEdit={getRecordDetails}
              readOnly={readOnly}
              />
          </div>
          <div className="table enhanced-table">
              <CollapsibleTable
                dataTable={doctorsFilteredTable}
                dataHeadCells={doctorsHeadCells}
                subDataHeadCells={subRecordsHeadCells}
                title="Doctors Records"
                subTableTitle="In Charge Of"
                onAdd={toggleForm}
                onEdit={getRecordDetails}
                readOnly={readOnly}
                editable={false}
              />
          </div>
          <div className="table enhanced-table table-grid">
              <EnhancedTable
                dataTable={doctorsFilteredTable}
                dataHeadCells={doctorsHeadCells}
                title="Treatments Management"
                onAdd={toggleForm}
                onEdit={getRecordDetails}
                readOnly={readOnly}
                editable={false}
              />
              <DisplayTable
                title="Prisoners Conditions"
                dataTable={recordFilteredTable}
                selectedColumns={["prisoner", "visitor"]}
                onClick={toggleForm}
                UIMode={"add"}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;
