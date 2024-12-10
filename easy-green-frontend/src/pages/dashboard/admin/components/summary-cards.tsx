import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts"; 

interface CardProps {
  title: string;
  value: string;
  trend: string;
  color: string;
  sparklineData: {
    data: number[];
    xAxisData: Date[];
  };
}

const SummaryCard: React.FC<CardProps> = ({
  title,
  value,
  trend,
  color,
  sparklineData,
}) => (
  <Card
    className="p-4 text-white"
    sx={{
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >
    <Typography variant="h6">{title}</Typography>
    <div className="flex items-center justify-between mt-2">
      <Typography variant="h4" component="span" fontWeight="bold">
        {value}
      </Typography>
      <Typography variant="h6" component="span" className={`text-${color}-500 `}>
        {trend}
      </Typography>
    </div>
    <Box>
      <SparkLineChart
        data={sparklineData.data}
        colors={[color]}
        xAxis={{
          scaleType: "time",
          data: sparklineData.xAxisData,
          valueFormatter: (value) => value.toISOString().slice(0, 10),
        }}
        height={50}
        showTooltip
        showHighlight
      />
    </Box>
  </Card>
);

const SummaryCards = () => (
  <div
    className="grid grid-cols-3 gap-6"
    style={{ width: "82vw",height: "15vh", maxWidth: "1750px", margin: "0 auto" }}
  >
    <SummaryCard
      title="New Users"
      value="2k+"
      trend="+2%"
      color="green"
      sparklineData={{
        data: [1, 4, 2, 5, 7, 2, 4, 6],
        xAxisData: [
          new Date(2022, 5, 1),
          new Date(2022, 5, 2),
          new Date(2022, 5, 5),
          new Date(2022, 5, 6),
          new Date(2022, 5, 7),
          new Date(2022, 5, 8),
          new Date(2022, 5, 11),
          new Date(2022, 5, 12),
        ],
      }}
    />
    <SummaryCard
      title="Loan Accepted"
      value="20+"
      trend="+1.4%"
      color="green"
      sparklineData={{
        data: [2, 3, 1, 4, 6, 3, 5, 7],
        xAxisData: [
          new Date(2022, 5, 1),
          new Date(2022, 5, 2),
          new Date(2022, 5, 5),
          new Date(2022, 5, 6),
          new Date(2022, 5, 7),
          new Date(2022, 5, 8),
          new Date(2022, 5, 11),
          new Date(2022, 5, 12),
        ],
      }}
    />
    <SummaryCard
      title="Delinquent Rate"
      value="20+"
      trend="-1.6%"
      color="red"
      sparklineData={{
        data: [5, 3, 6, 2, 1, 4, 2, 3],
        xAxisData: [
          new Date(2022, 5, 1),
          new Date(2022, 5, 2),
          new Date(2022, 5, 5),
          new Date(2022, 5, 6),
          new Date(2022, 5, 7),
          new Date(2022, 5, 8),
          new Date(2022, 5, 11),
          new Date(2022, 5, 12),
        ],
      }}
    />
  </div>
);

export default SummaryCards;