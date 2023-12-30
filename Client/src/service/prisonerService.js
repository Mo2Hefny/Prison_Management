import axios from 'axios'
import { fixPrisonerFormat } from '../utils/formatUtils';
import { view } from "../App";
// prisonerService.js

// Function to fetch a list of prisoners
export const fetchPrisoners = async () => {
  try {
    const response = await axios ({
      method: "get",
      url: `http://localhost:3000/${view}/prisoner`,
    })
    console.log('Response:', response); // Log the response
    const data = response.data;
    console.log('Response:', data); // Log the response
    console.log(`Prisoners: `, data);
    return data;
  } catch (error) {
    console.error('Error fetching prisoners:', error);
    throw error;
  }
};

export const fetchPrisonerById = async (id) => {
  try {
    const response = await axios
    .post(`http://localhost:3000/${view}/prisonerid`, { "prisonerid": id})
    .then((res) => {
      // Find the prisoner with the specified ID
      const data = res.data
      if (!data) {
        throw new Error(`Prisoner with ID ${id} not found`);
      }

      const prisoner = data[0];
      fixPrisonerFormat(prisoner);
      //fixPrisonerDetailsFormat(prisoner[0]);
      console.log(`Prisoner with ID ${id}: `, prisoner); // Log the response
      return prisoner;
    })
    .catch((err) => console.log(err));
    return response;
  } catch (error) {
    console.error(`Error fetching prisoner with ID ${id}:`, error);
    throw error;
  }
};

//{ssn,fname,lname,gender,birthdate,admissiondate,releasedate,status,blockid,cellid}
export const insertPrisoner = async (prisonerDetails) => {
  try {
    console.log(prisonerDetails);
    console.log(localStorage.getItem('token'));
    const response = await axios
    .post(`http://localhost:3000/${view}/prisoner`, prisonerDetails, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      console.log(res);
      return true;
    })
    .catch((err) => { 
      console.log(err);
      return false
    });
    return response;
  } catch (error) {
    console.error(`Error inserting prisoner with Details: ${prisonerDetails}:`, error);
    throw error;
  }
}

// Function to fetch a list of offenses that aren't connected to any prisoner
export const fetchOffensesWithNoPrisoner = async () => {
  try {
    const response = await axios ({
      method: "get",
      url: `http://localhost:3000/${view}/offenses_noprisoner`,
    })
    console.log('Response:', response); // Log the response
    const data = response.data;
    console.log(`Offenses: `, data);
    return data;
  } catch (error) {
    console.error('Error fetching prisoners:', error);
    throw error;
  }
};
// Function to fetch a list of offenses that aren't connected to any prisoner
export const fetchOffensesById = async (id) => {
  try {
    console.log(id);
    const response = await axios
    .post(`http://localhost:3000/${view}/offensesById`, id)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => { 
      console.log(err);
    });
    return response;
  } catch (error) {
    console.error(`Error inserting prisoner with Details: ${prisonerDetails}:`, error);
    throw error;
  }
};

// Function to fetch a list of offenses that aren't connected to any prisoner
export const fetchOffenses = async () => {
  try {
    const response = await axios ({
      method: "get",
      url: `http://localhost:3000/${view}/allOffenses`,
    })
    console.log('Response:', response); // Log the response
    const data = response.data;
    console.log(`Offenses: `, data);
    return data;
  } catch (error) {
    console.error('Error fetching offenses:', error);
    throw error;
  }
};
