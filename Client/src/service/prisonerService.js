import axios from 'axios'
import { fixPrisonerFormat } from '../utils/formatUtils';
// prisonerService.js

// Function to fetch a list of prisoners
export const fetchPrisoners = async () => {
  try {
    const response = await axios ({
      method: "get",
      url: "http://localhost:3000/admin/prisoner",
    })
    console.log('Response:', response); // Log the response
    const responseData = response.data;
    const data = responseData["data"];
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
    .post("http://localhost:3000/admin/prisonerid", { "prisonerid": id})
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