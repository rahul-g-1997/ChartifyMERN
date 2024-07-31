import { useState, useEffect } from "react";
import "./App.css";
import configService from "./services/config"; // Adjust the path as needed
import {
  TransactionsTable,
  StatisticsBox,
  Bar_Chart,
  Pie_Chart,
} from "./components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify
import TextField from "@mui/material/TextField"; // Import MUI TextField
import Button from "@mui/material/Button"; // Import MUI Button
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import theme from "./theme"; // Import your custom theme


const App = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [transactions, setTransactions] = useState([]); // State for search results
  const [loading, setLoading] = useState(false); // State for loading
  const [initializing, setInitializing] = useState(false); // State for initializing the database

  // Function to handle search
  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await configService.searchTransaction(searchQuery);
      console.log(data);
      setTransactions(data.transactions); // Set the results in state
    } catch (err) {
      toast.error(err.message); // Display the error message using Toastify
    }
    setLoading(false);
  };

  // Function to handle database initialization
  const handleInitializeDatabase = async () => {
    setInitializing(true);
    try {
      await configService.initializeDatabase();
      toast.success("Database initialized successfully!");
    } catch (err) {
      toast.error(err.message); // Display the error message using Toastify
    }
    setInitializing(false);
  };

  // Use useEffect to trigger search when searchQuery changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 500); // Add a delay to debounce the search

    return () => clearTimeout(delayDebounceFn); // Cleanup the timeout
  }, [searchQuery]);

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <h1>Transactions Dashboard</h1>
        <div className="action-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handleInitializeDatabase}
            disabled={initializing}
            style={{ marginRight: "20px" }}
            size="small"
          >
            {initializing ? "Initializing..." : "Load Database"}
          </Button>
          <TextField
            label="Search transactions"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
            size="small"
            style={{ marginRight: "20px" }}
          />
          
        </div>
        {loading && <p>Searching...</p>} {/* Display loading text */}
        <TransactionsTable
          transactions={transactions}
         
        />
        <StatisticsBox
         
        />
        <Bar_Chart />
        <Pie_Chart />
        <ToastContainer /> {/* Add ToastContainer to render toast messages */}
      </div>
    </ThemeProvider>
  );
};

export default App;
