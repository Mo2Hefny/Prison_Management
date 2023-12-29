import React from "react";
import { useState, useEffect } from "react";
import PrisonerForm from "../components/PrisonerForm/PrisonerForm";
import "./Prisoners.css";
import EnhancedTable from "../components/SortingTable";
import { filterConditionsColumns, filterDoctorColumns, filterMedicalRecordsColumns, filterStaffColumns, filterTreatmentsColumns } from "../utils/dataUtils";
import { fetchMedicalRecords, fetchMedicalRecordById, fetchTreatmentsByRecordId, fetchMedicalRecordByDoctorId, fetchAllPrisonersConditions, fetchAllTreatments } from "../service/medicalRecordService";
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
    numeric: true,
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

const recordTreatmentsHeadCells = [
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

const treatmentsHeadCells = [
  {
    id: 'Drug Name',
    numeric: false,
    disablePadding: false,
    color: "var(--primary-color)",
    label: 'Drug Name',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Targets',
  },
  {
    id: 'Drug doses',
    numeric: true,
    disablePadding: false,
    label: 'Drug Dosage',
  },
  {
    id: 'availability',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
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
    numeric: true,
    disablePadding: false,
    label: 'Load',
  },
];

const conditionsHeadCells = [
  { 
    id: 'Prisoner name', 
    field: 'Prisoner name', 
    headerName: 'Prisoner',
    width: 100 
  },
  { 
    id: 'Condition name', 
    field: 'Condition name', 
    headerName: 'Condition',
    width: 100 
  },
  { 
    id: 'Severity', 
    field: 'Severity', 
    headerName: 'Severity',
    width: 100 
  },
]

const MedicalRecords = ({ view }) => {
  // State variable to manage the form's visibility.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  // Record variables
  const [recordDetails, setRecordDetails] = useState([]);
  const [recordsFilteredTable, setRecordsFilteredTable] = useState([{}]);
  // Doctors variables
  const [doctorsFilteredTable, setDoctorsFilteredTable] = useState([{}]);
  const readOnly = ["visitor", "staff"].includes(view);
  // Treatments variabkes
  const [isTreatmentFormOpen, setIsTreatmentFormOpen] = useState(false);
  const [isTreatmentFormEdit, setIsTreatmentFormEdit] = useState(false);
  const [treatmentsFilteredDataTable, setTreatmentsFilteredTable] = useState([{}]);
  // Prisoners_Conditions variabkes
  const [conditonDetails, setConditionDetails] = useState([]);
  const [conditionsFilteredTable, setConditionsFilteredTable] = useState([{}]);
  const [isConditionFormOpen, setIsConditionFormOpen] = useState(false);
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
        const filteredTable = filterMedicalRecordsColumns(tableWithTreatments, recordsHeadCells, recordTreatmentsHeadCells);
        console.log("Fetched medical records:", filteredTable);
        setRecordsFilteredTable([ ...filteredTable ]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchMedicalRecordData();
  }, [isFormEdit, isFormOpen]);

  // Retrieve all doctors details and the medical records assigned to them on any change or submission
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

  // Retrieve all prisoners conditions on any change or submission
  useEffect(() => {
    async function fetchTreatmentsDetails() {
      try {
        const treatmentsDataTable = await fetchAllTreatments();
        console.log(treatmentsDataTable);
        const filteredTable = filterTreatmentsColumns(treatmentsDataTable, treatmentsHeadCells);
        console.log("Fetched treatments:", filteredTable);
        setTreatmentsFilteredTable([ ...filteredTable ]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchTreatmentsDetails();
  }, [isTreatmentFormEdit, isTreatmentFormOpen]);

  // Retrieve all prisoners conditions on any change or submission
  useEffect(() => {
    async function fetchConditionsDetails() {
      try {
        const conditionsDataTable = await fetchAllPrisonersConditions();
        console.log(conditionsDataTable);
        const filteredTable = filterConditionsColumns(conditionsDataTable, conditionsHeadCells);
        console.log("Fetched doctors:", filteredTable);
        setConditionsFilteredTable([ ...filteredTable ]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchConditionsDetails();
  }, [isConditionFormOpen]);

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
          <div className="table collapsible-table glassmorphism">
            <CollapsibleTable
              dataTable={recordsFilteredTable}
              dataHeadCells={recordsHeadCells}
              subDataHeadCells={recordTreatmentsHeadCells}
              title="Medical Records"
              subTableTitle="Patient Treatments"
              onAdd={toggleForm}
              onEdit={getRecordDetails}
              readOnly={readOnly}
              />
          </div>
          <div className="table glassmorphism">
              <CollapsibleTable
                dataTable={doctorsFilteredTable}
                dataHeadCells={doctorsHeadCells}
                subDataHeadCells={subRecordsHeadCells}
                title="Doctors Records"
                subTableTitle="In Charge Of"
                onAdd={toggleForm}
                onEdit={getRecordDetails}
                readOnly={readOnly}
                addable={false}
                subEditable={false}
              />
          </div>
          <div className="table enhanced-table table-grid glassmorphism">
              <EnhancedTable
                dataTable={treatmentsFilteredDataTable}
                dataHeadCells={treatmentsHeadCells}
                title="Treatments Management"
                onAdd={toggleForm}
                onEdit={getRecordDetails}
                readOnly={readOnly}
              />
              <DisplayTable
                title="Prisoners Conditions"
                dataTable={conditionsFilteredTable}
                selectedColumns={conditionsHeadCells}
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
