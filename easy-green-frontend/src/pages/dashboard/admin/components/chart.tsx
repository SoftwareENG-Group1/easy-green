import { Card, Typography } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';

const LoanChart = () => {

  return (
    <Card
      className="flex p-4 items-center justify-between text-white w-[41vw]"
      sx={{ borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}
    >
        <Typography variant='h4' className="text-3xl"> Loan Application Chart</Typography>
      <PieChart 
      series={[
        {
          data: [
            { id: 0, value: 23, label: 'Rejected', color:'red' },
            { id: 1, value: 32, label: 'Pending', color:'darkBlue' },
            { id: 2, value: 45, label: 'Accepted', color:'green' },
          ],
        },
      ]}
      width={500}
      height={250}
       />
    </Card>
  );
};

export default LoanChart;