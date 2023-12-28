import axios from 'axios'
import { fixMedicalRecordFormat } from '../utils/formatUtils';
// medicalRecordService.js

// Function to fetch a list of prisoners
export const fetchMedicalRecords = async () => {
  try {
    const response = await axios ({
      method: "get",
      url: "http://localhost:3000/admin/all_records",
    })
    console.log('Response:', response); // Log the response
    const data = response.data;
    console.log(`Medical Records: `, data);
    return data;
  } catch (error) {
    console.error('Error fetching prisoners:', error);
    throw error;
  }
};

export const fetchMedicalRecordByDoctorId = async (id) => {
  try {
    console.log(id)
    const response = await axios
    .post("http://localhost:3000/admin/getdoctorrecords", { "doctorid": id })
    .then((res) => {
      // Find the prisoner with the specified ID
      const data = res.data
      if (!data) {
        throw new Error(`Medical records for doctor ${id} not found`);
      }
      return data;
    })
    .catch((err) => console.log(err));
    return response;
  } catch (error) {
    console.error(`Error fetching prisoner with ID ${id}:`, error);
    throw error;
  }
}

export const fetchMedicalRecordById = async (id) => {
  try {
    const response = await axios
    .post("http://localhost:3000/admin/medical_record", { "prisoner_id": id[0], "record_id": id[1]})
    .then((res) => {
      // Find the prisoner with the specified ID
      const data = res.data
      if (!data) {
        throw new Error(`Medical record with ID ${id} not found`);
      }
      console.log(data);
      const medicalRecord = data[0];
      fixMedicalRecordFormat(medicalRecord);
      console.log(`Prisoner with ID ${id}: `, medicalRecord); // Log the response
      return medicalRecord;
    })
    .catch((err) => console.log(err));
    return response;
  } catch (error) {
    console.error(`Error fetching prisoner with ID ${id}:`, error);
    throw error;
  }
};

export const fetchTreatmentsByRecordId = async (id) => {
  try {
    console.log(id)
    const response = await axios
    .post("http://localhost:3000/admin/getrecordtreatments", { "pid": id[0], "recordid": id[1] })
    .then((res) => {
      // Find the prisoner with the specified ID
      const data = res.data
      if (!data) {
        throw new Error(`Medical record with ID ${id} not found`);
      }
      console.log(data);
      const treatments = data;
      console.log(`Treatments for Record ${id}: `, treatments); // Log the response
      return treatments;
    })
    .catch((err) => console.log(err));
    return response;
  } catch (error) {
    console.error(`Error fetching prisoner with ID ${id}:`, error);
    throw error;
  }
};