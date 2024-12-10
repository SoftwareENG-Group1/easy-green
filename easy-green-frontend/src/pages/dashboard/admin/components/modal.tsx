import React from "react";
import { Modal, Box, Avatar, Typography, Button, Tab, Tabs, TableCell, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { AdminClientModalProps } from "./interfaces";

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
        <div className="flex items-center gap-4 text-black">
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
        <div className="mt-4 text-black">
          {activeTab === 0 && (
            <div>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                Email: {client.email}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                Loan Amount: {client.loanAmount}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                Status: {client.status}
              </Typography>
            </div>
          )}
          {activeTab === 1 && (
            <TableContainer component={Paper} sx={{ maxHeight: "56vh", marginTop: 2 }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#0a440a" }}>
                  <TableRow>
                    <TableCell style={{ color: "white" }}>Transaction ID</TableCell>
                    <TableCell style={{ color: "white" }}>Date</TableCell>
                    <TableCell style={{ color: "white" }}>Amount</TableCell>
                    <TableCell style={{ color: "white" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {client.transactionHistory.map((txn) => (
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
                  ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {activeTab === 2 && (
            <TableContainer component={Paper} sx={{ maxHeight: "56vh", marginTop: 2 }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#0a440a" }}>
                  <TableRow>
                    <TableCell style={{ color: "white" }}>Loan ID</TableCell>
                    <TableCell style={{ color: "white" }}>Amount</TableCell>
                    <TableCell style={{ color: "white" }}>Date Issued</TableCell>
                    <TableCell style={{ color: "white" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {client.loanHistory.map((loan) => (
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
                  ))} */}
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
