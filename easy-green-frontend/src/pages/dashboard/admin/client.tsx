import { useState, useEffect } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TextField,
  Alert,
} from "@mui/material";
import AdminClientModal from "./components/modal";
import { Client } from "./components/interfaces";
import axios from "axios";

const AdminClient = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const handleRowClick = async (client: Client) => {
    setLoading(true);
    try {
      const response = await axios.get(`/borrower/${client.loanId}`);
      setSelectedClient(response.data);
      setOpen(true);
    } catch (err) {
      setError(`Failed to fetch borrower details. (${err})`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClient(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = clients.filter((row) =>
    row.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col mx-auto pt-5 h-screen w-[83vw] overflow-hidden bg-white">
      {/* Search Bar */}
      <TextField
        label="Search by Client Name"
        variant="outlined"
        fullWidth
        sx={{ borderRadius: 10, marginBottom: 2 }}
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Error and Loading State */}
      {loading && <CircularProgress style={{ margin: "0 auto" }} />}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: "#0a440a",
              position: "sticky",
              top: 0,
              zIndex: 2,
            }}
          >
            <TableRow>
              <TableCell style={{ color: "white", fontSize: "18px" }}>
                Client Name
              </TableCell>
              <TableCell style={{ color: "white", fontSize: "18px" }}>
                Email
              </TableCell>
              <TableCell style={{ color: "white", fontSize: "18px" }}>
                Loan Amount
              </TableCell>
              <TableCell style={{ color: "white", fontSize: "18px" }}>
                Balance
              </TableCell>
              <TableCell style={{ color: "white", fontSize: "18px" }}>
                Next Payment Date
              </TableCell>
              <TableCell style={{ color: "white", fontSize: "18px" }}>
                Loan Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: "white" }}>
            {filteredRows.length > 0 ? (
              filteredRows.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleRowClick(row)}
                  style={{ cursor: "pointer" }}
                  sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
                >
                  <TableCell style={{ color: "#0a440a", fontSize: "18px" }}>
                    {row.client}
                  </TableCell>
                  <TableCell style={{ color: "#0a440a", fontSize: "18px" }}>
                    {row.email}
                  </TableCell>
                  <TableCell style={{ color: "#0a440a", fontSize: "18px" }}>
                    {row.loanAmount}
                  </TableCell>
                  <TableCell style={{ color: "#0a440a", fontSize: "18px" }}>
                    {row.balance}
                  </TableCell>
                  <TableCell style={{ color: "#0a440a", fontSize: "18px" }}>
                    {row.paymentDate}
                  </TableCell>
                  <TableCell
                    style={{
                      color: row.status === "Inactive" ? "red" : "green",
                      fontSize: "18px",
                    }}
                  >
                    {row.status}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  style={{ textAlign: "center", color: "gray" }}
                >
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <AdminClientModal
        open={open}
        onClose={handleClose}
        client={selectedClient}
      />
    </div>
  );
};

export default AdminClient;
