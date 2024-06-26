// src/api/companiesHouse.js
import axios from 'axios';

const API_KEY = process.env.API_KEY; // Replace with your new live Companies House API key

export const fetchCompanies = async (postcode, sicCodes) => {
  // Convert the array of SIC codes to a comma-separated string

  // Include the SIC codes in the request URL
  const url = `/api/advanced-search/companies?location=${postcode}&sic_codes=${sicCodes}&size=4000`;

  try {
    const response = await axios.get(url, {
      auth: {
        username: API_KEY,
        password: '' // No password needed
      }
    });

    // Filter for active companies
    const activeCompanies = response.data.items.filter(company => company.company_status === 'active');
    return activeCompanies;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error; // Re-throw the error to be handled in the calling function
  }
};