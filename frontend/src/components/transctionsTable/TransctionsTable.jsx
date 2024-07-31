import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import ImageIcon from "@mui/icons-material/Image";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "title", headerName: "Title", width: 300 },
  { field: "category", headerName: "Category", width: 130 },
  { field: "price", headerName: "Price", type: "number", width: 70 },
  { field: "sold", headerName: "Sold", width: 70 },
  { field: "description", headerName: "Description", width: 630 },
  {
    field: "image",
    headerName: "Image",
    width: 50,
    renderCell: (params) => (
      <IconButton
        onClick={() => window.open(params.row.image, "_blank")}
        color="primary"
      >
        <ImageIcon />
      </IconButton>
    ),
  },
];

const TransactionsTable = ({ transactions }) => {
  // Transform transactions to rows
  const rows = transactions.map((transaction, index) => ({
    id: index + 1,
    title: transaction.title,
    category: transaction.category,
    price: transaction.price,
    sold: transaction.sold,
    description: transaction.description,
    image: transaction.image, // Include image in the rows
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

// Define prop types
TransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      sold: PropTypes.bool.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired, // Validate image field
    })
  ).isRequired,
};

export default TransactionsTable;
