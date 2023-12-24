// prisonerService.js

const JSON_FILE_URL = '../../data/cellBlocks.json'; // Adjust the path as needed

// Function to fetch a list of prisoners
export const fetchPrisoners = async () => {
  try {
    const response = await fetch(JSON_FILE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch prisoners');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching prisoners:', error);
    throw error;
  }
};

export const fetchPrisonerById = async (id) => {
  try {
    const response = await fetch(JSON_FILE_URL);
    console.log('Response:', response); // Log the response
    if (!response.ok) {
      throw new Error('Failed to fetch prisoners');
    }
    
    const data = await response.json();

    // Find the prisoner with the specified ID
    const prisoner = data.find((prisoner) => prisoner.pid === id);

    if (!prisoner) {
      throw new Error(`Prisoner with ID ${id} not found`);
    }

    fixPrisonerDetailsFormat(prisoner);
    console.log(`Prisoner with ID ${id}: `, prisoner); // Log the response
    return prisoner;
  } catch (error) {
    console.error(`Error fetching prisoner with ID ${id}:`, error);
    throw error;
  }
};

const fixPrisonerDetailsFormat = (details) => {
  details.bdate = new Date(details.bdate);
  details.admissionDate = new Date(details.admissionDate);
  details.releaseDate = new Date(details.releaseDate);
}