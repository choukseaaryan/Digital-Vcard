import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const QR_CODE = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "qr_id",
      headerName: "QR ID",
      flex: 1,
    },
    {
      field: "employee_id",
      headerName: "Employee ID",
      flex: 1,
      cellClassName: "eid-column--cell",
    },
    {
      field: "clicks_phone",
      headerName: "Clicks on Phone",
      flex: 1,
    },
    {
      field: "clicks_email",
      headerName: "Clicks on Email",
      flex: 1,
    },
    {
      field: "clicks_website",
      headerName: "Clicks on Website",
      flex: 1,
    },
    {
      field: "scans",
      headerName: "Number of Scans",
      flex: 1,
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:3000/api/data/qr_code")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };


  return (
    <Box m="20px">
      <Header title="QR Details" subtitle="List of QR codes of users" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .eid-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default QR_CODE;
