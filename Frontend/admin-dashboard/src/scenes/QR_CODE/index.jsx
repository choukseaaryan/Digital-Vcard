import { Box, useTheme } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const QR_CODE = () => {
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
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
      field: "qrcode_data",
      headerName: "QR Code Data",
    },
    {
      field: "download_qrcode",
      headerName: "Download QR Code",
      flex: 1,
      renderCell: (params) => {
        const handleDownloadQRCode = async () => {
          try {
            const employeeId = params.row.employee_id;
            const response = await fetch(
              `http://localhost:3003/QRCodes/${employeeId}.png`
            );
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const downloadLink = document.createElement("a");
            downloadLink.href = url;
            downloadLink.download = `${employeeId}.png`;
            downloadLink.click();

            URL.revokeObjectURL(url);
            toast.success("QR code downloaded successfully!");
          } catch (error) {
            console.error("Error downloading QR code:", error);
            toast.error("Error downloading QR code. Please try again!");
          }
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

  const fetchData = async () => {
    await axios
      .get("http://localhost:3003/api/data/qr_code")
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
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
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default QR_CODE;
