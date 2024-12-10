import React from "react";
import { Modal, Box, Avatar, Typography, Button, Tab, Tabs, TableCell, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";

interface Client {
  client: string;
  email: string;
  loanId: string;
  loanAmount: string;
  balance: string;
  paymentDate: string;
  status: string;
}

interface AdminClientModalProps {
  open: boolean;
  onClose: () => void;
  client: Client | null;
}

const AdminClientModal: React.FC<AdminClientModalProps> = ({
  open,
  onClose,
  client,
}) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!client) return null; 


  const transactionHistory = Array.from({ length: 13 }, (_, index) => ({
    id: `T${index + 1}`,
    date: `${index + 1}-09-2024`,
    amount: `${(1000 + index * 500).toLocaleString()}`,
    status: index % 2 === 0 ? "Success" : "Pending",
  }));

  const loanHistory = Array.from({ length: 5 }, (_, index) => ({
    loanId: `L${5678 + index}`,
    amount: `${(50000 + index * 2000).toLocaleString()}`,
    dateIssued: `${index + 5}-09-2024`,
    status: index % 2 === 0 ? "Completed" : "Ongoing",
  }));

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: 1000,
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        {/* Top Section */}
        <div className="flex items-center gap-4 text-black ">
          <Avatar sx={{ width: 80, height: 80 }} />
          <div>
          <Typography variant="h5" sx={{ marginTop: 2 }}>
            {client.client}
          </Typography>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Customer ID: {client.loanId}
          </Typography>
        </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            marginTop: 3,
            borderBottom: "1px solid #ddd",
          }}
        >
          <Tab label="Personal Info" />
          <Tab label="Transaction History" />
          <Tab label="Loan History" />
        </Tabs>

        {/* Tab Content */}
        <div className="mt-4 text-black" >
          {activeTab === 0 && (
            <div>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                Email: {client.email}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                Loan ID: {client.loanId}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                Status: {client.status}
              </Typography>
            </div>
          )}
          {activeTab === 1 && (
         <TableContainer component={Paper} style={{ marginTop: "16px",maxHeight: "56vh", }}>
            <Table>
              <TableHead style={{ backgroundColor: "#0a440a" }}>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Transaction ID</TableCell>
                  <TableCell style={{ color: "white" }}>Date</TableCell>
                  <TableCell style={{ color: "white" }}>Amount</TableCell>
                  <TableCell style={{ color: "white" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionHistory.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>{txn.id}</TableCell>
                    <TableCell>{txn.date}</TableCell>
                    <TableCell>{txn.amount}</TableCell>
                    <TableCell
                      style={{
                        color: txn.status === "Success" ? "green" : "orange",
                      }}
                    >
                      {txn.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {activeTab === 2 && (
          <TableContainer component={Paper} style={{ marginTop: "16px" ,maxHeight: "56vh",}}>
            <Table>
              <TableHead style={{ backgroundColor: "#0a440a" }}>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Loan ID</TableCell>
                  <TableCell style={{ color: "white" }}>Amount</TableCell>
                  <TableCell style={{ color: "white" }}>Date Issued</TableCell>
                  <TableCell style={{ color: "white" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loanHistory.map((loan) => (
                  <TableRow key={loan.loanId}>
                    <TableCell>{loan.loanId}</TableCell>
                    <TableCell>{loan.amount}</TableCell>
                    <TableCell>{loan.dateIssued}</TableCell>
                    <TableCell
                      style={{
                        color: loan.status === "Completed" ? "green" : "blue",
                      }}
                    >
                      {loan.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          )}
        </div>

        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{ marginTop: 3, display: "block", marginLeft: "auto" }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default AdminClientModal;