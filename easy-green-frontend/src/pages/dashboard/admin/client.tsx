import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  TextField,
} from "@mui/material";
import AdminClientModal from "./components/modal";

interface Client {
  client: string;
  email: string;
  loanId: string;
  loanAmount: string;
  balance: string;
  paymentDate: string;
  status: string;
}

const AdminClient = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const rows: Client[] = Array.from({ length: 100 }, (_, index) => ({
    client: `Munachim Arosabo ${index + 1}`,
    email: `munachim${index + 1}@example.com`,
    loanId: `L${1234 + index}`,
    loanAmount: `${(550000 + index * 10000).toLocaleString()}`,
    balance: `${(25500 + index * 5000).toLocaleString()}`,
    paymentDate: `12-11-2024`,
    status: index % 5 === 0 ? "Inactive" : "Active",
  }));

  const handleRowClick = (client: Client) => {
    setSelectedClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClient(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
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
                <TableCell colSpan={5} style={{ textAlign: "center", color: "gray" }}>
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <AdminClientModal open={open} onClose={handleClose} client={selectedClient} />
    </div>
  );
};

export default AdminClient;