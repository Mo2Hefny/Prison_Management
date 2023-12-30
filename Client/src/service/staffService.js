import axios from "axios";
import { fixStaffFormat } from "../utils/formatUtils";
import { view } from "../App";
// Staff service

// Function to fetch a list of prisoners
export const fetchStaff = async () => {
  try {
    const response = await axios ({
      method: "get",
      url: `http://localhost:3000/${view}/getallstaff`,
    })
    console.log('Response:', response); // Log the response
    const data = response.data;
    console.log(`Staff: `, data);
    return data;
  } catch (error) {
    console.error('Error fetching staff:', error);
    throw error;
  }
};

export const fetchDoctors = async () => {
  try {
    const response = await axios ({
      method: "get",
      url: `http://localhost:3000/${view}/doctors`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    console.log('Response:', response); // Log the response
    const data = response.data;
    console.log(`Doctors: `, data);
    return data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

export const fetchStaffById = async (id) => {
  try {
    const response = await axios
    .post(`http://localhost:3000/${view}/getstaffbyid`, { "staff_id": id})
    .then((res) => {
      // Find the prisoner with the specified ID
      const data = res.data
      if (!data) {
        throw new Error(`Staff with ID ${id} not found`);
      }

      const staff = data[0];
      fixStaffFormat(staff);
      //fixPrisonerDetailsFormat(prisoner[0]);
      console.log(`Staff with ID ${id}: `, prisoner); // Log the response
      return prisoner;
    })
    .catch((err) => console.log(err));
    return response;
  } catch (error) {
    console.error(`Error fetching staff with ID ${id}:`, error);
    throw error;
  }
};


export const getStaffType = (staff) => {
  if (staff.hasOwnProperty("specialty")) {
    // Doctor
    return "Doctor";
  } else if (staff.hasOwnProperty("type")) {
    // Guard
    return "Guard";
  } else {
    // General Staff
    return "Staff";
  }
};

export const getsupervisors = async () => {
  try {
    const response = await axios
    .get(`http://localhost:3000/${view}/getsupervisors`)
    .then((res) => {
      // Find the prisoner with the specified ID
      const data = res.data;
      if (!data) {
        throw new Error(`No avaialable staff`);
      }
      //fixPrisonerDetailsFormat(prisoner[0]);
      console.log(`Staff back`); // Log the response
      return data;
    })
    .catch((err) => console.log(err));
    return response;
  } catch (error) {
    console.error(`Error getting supervisor`, error);
    throw error;
  }
}
 // Function to insert staff
export const insertStaff = async (staffdetails) => {
  try {
    console.log(staffdetails);
    console.log(localStorage.getItem('token'));
    const response = await axios
    .post(`http://localhost:3000/${view}/staff`, staffdetails, {
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
    console.error(`Error inserting staff with Details: ${staffdetails}:`, error);
    throw error;
  }
}