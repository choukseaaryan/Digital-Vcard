import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Total Clicks Per User" subtitle="Bar Chart" />
      <Box height="70vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
