import axios from "axios";
import conf from "../conf/conf";

const API_URL = conf.user_backend_url; // API base URL

const configService = {
  // Initialize database
  initializeDatabase: async () => {
    try {
      const response = await axios.get(`${API_URL}/initialize-database`);
      console.log(response);
      return response.data; // Return response data
    } catch (error) {
      console.error("Error searching transaction:", error); // Log error for debugging
      throw new Error("Error searching transaction");
    }
  },
  // Search transaction
  searchTransaction: async (search) => {
    try {
      const requestData = { search };
      const response = await axios.post(`${API_URL}/transactions`, requestData);
      return response.data; // Return response data
    } catch (error) {
      console.error("Error searching transaction:", error); // Log error for debugging
      throw new Error("Error searching transaction");
    }
  },

  // Statistics
  getStatistics: async (month, year) => {
    try {
      const requestData = { year, month };

      const response = await axios.post(`${API_URL}/statistics`, requestData);
      console.log(response.data);
      return response.data; // Return response data
    } catch (error) {
      console.error("Error fetching statistics:", error); // Log error for debugging
      throw new Error("Error fetching statistics");
    }
  },

  // Bar-chart
  barChart: async (year, month) => {
    try {
      const requestData = { year, month };
      const response = await axios.post(`${API_URL}/bar-chart`, requestData);
      return response.data; // Return response data
    } catch (error) {
      console.error("Error fetching bar chart data:", error); // Log error for debugging
      throw new Error("Error fetching bar chart data");
    }
  },

  // Pie-chart
  pieChart: async (year, month) => {
    try {
      const requestData = { year, month };
      const response = await axios.post(`${API_URL}/pie-chart`, requestData);
      console.log(response)
      return response.data; // Return response data
    } catch (error) {
      console.error("Error fetching pie chart data:", error); // Log error for debugging
      throw new Error("Error fetching pie chart data");
    }
  },

  // Combined-data
  combinedData: async (year, month) => {
    try {
      const requestData = { year, month };
      const response = await axios.post(
        `${API_URL}/combined-data`,
        requestData
      );
      return response.data; // Return response data
    } catch (error) {
      console.error("Error fetching combined data:", error); // Log error for debugging
      throw new Error("Error fetching combined data");
    }
  },
};

export default configService;
