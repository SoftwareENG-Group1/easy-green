import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper } from "@mui/material";

const RecentActivites = () => {
  const rows = new Array(10).fill({
    notification: "Munachim Arosabo has paid off his loan",
  });

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: "10px", color: "white" }}
    >
      <Table>
        <TableHead style={{backgroundColor: "#0a440a"}}>
          <TableRow>
            <TableCell style={{ color: "white" , fontSize:'18px' }}>Recent Activities</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{backgroundColor: "white"}}>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell style={{ color: "#0a440a" , fontSize:'18px' }}>{row.notification}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RecentActivites;