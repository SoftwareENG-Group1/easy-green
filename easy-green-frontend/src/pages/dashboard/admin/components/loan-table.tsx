import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper } from "@mui/material";

const LoanTable = () => {
  const rows = new Array(10).fill({
    client: "Munachim Arosabo",
    loanAmount: "550,000",
    balance: "255,700",
    paymentDate: "12-11-2024",
    status: "Active",
  });

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: "10px", color: "white" }}
    >
      <Table>
        <TableHead style={{backgroundColor: "#0a440a"}}>
          <TableRow>
            <TableCell style={{ color: "white" , fontSize:'18px' }}>Client Name</TableCell>
            <TableCell style={{ color: "white" , fontSize:'18px'}}>Loan Amount</TableCell>
            <TableCell style={{ color: "white" , fontSize:'18px'}}>Balance</TableCell>
            <TableCell style={{ color: "white", fontSize:'18px' }}>Next Payment Date</TableCell>
            <TableCell style={{ color: "white" , fontSize:'18px'}}>Loan Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{backgroundColor:"white"}}>
          {rows.map((row, index) => (
            <TableRow key={index} >
              <TableCell style={{ color: "#0a440a" , fontSize:'18px' }}>{row.client}</TableCell>
              <TableCell style={{ color: "#0a440a", fontSize:'18px' }}>{row.loanAmount}</TableCell>
              <TableCell style={{ color: "#0a440a", fontSize:'18px' }}>{row.balance}</TableCell>
              <TableCell style={{ color: "#0a440a" , fontSize:'18px'}}>{row.paymentDate}</TableCell>
              <TableCell style={{ color: "green", fontSize:'18px' }}>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LoanTable;