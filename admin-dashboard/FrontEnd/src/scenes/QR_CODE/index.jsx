import { Box, useTheme } from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

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
    {
      field: "qrcode_data",
      headerName: "QR Code Data",
      width: 0,
    },
    {
      field: "download_qrcode",
      headerName: "Download QR Code",
      flex: 1,
      renderCell: (params) => {
        const handleDownloadQRCode = () => {
          const downloadLink = document.createElement("a");
          downloadLink.href = params.row.qrcode_data;
          downloadLink.download = `${params.row.employee_id}.png`;
          downloadLink.click();
        };

        return (
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadQRCode}
          >
            <FileDownloadOutlinedIcon />
          </Button>
        );
      },
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3003/api/data/qr_code")
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
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                qrcode_data: false,
              },
            },
          }}
          rows={data}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default QR_CODE;
