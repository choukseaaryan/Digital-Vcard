import { Box, useTheme } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import MakeProtectedAPICall from "../../utils/api";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const QrCode = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const columns = [
		{
			field: "employeeId",
			headerName: "Employee ID",
			flex: 1,
			cellClassName: "eid-column--cell",
		},
		{
			field: "clicksPhone",
			headerName: "Clicks on Phone",
			flex: 1,
		},
		{
			field: "clicksEmail",
			headerName: "Clicks on Email",
			flex: 1,
		},
		{
			field: "clicksWebsite",
			headerName: "Clicks on Website",
			flex: 1,
		},
		{
			field: "totalClicks",
			headerName: "Total Clicks",
			flex: 1,
		},
		{
			field: "download_qrcode",
			headerName: "Download QR Code",
			flex: 1,
			renderCell: (params) => {
				const handleDownloadQRCode = async () => {
					try {
						const qrCodeUrl = params.row.qrCodeUrl;
						const employeeId = params.row.employeeId;
						const response = await fetch(qrCodeUrl);
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
						toast.error(
							"Error downloading QR code. Please try again!"
						);
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
		const fetchData = async () => {
			const response = await MakeProtectedAPICall("get-qr-codes", "get");
			if (response.status === 200) {
				setData(response.data.data);
			}
		};

		fetchData();
	}, []);

	return (
		<Box m="20px">
			<Header title="QR Details" subtitle="List of QR codes of users" />
			<Box
				height="70vh"
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
					getRowId={(row) => row._id}
				/>
			</Box>
		</Box>
	);
};

export default QrCode;
