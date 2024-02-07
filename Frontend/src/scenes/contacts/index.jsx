import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import MakeProtectedApiCall from "../../utils/api";

const Contacts = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const columns = [
		{ field: "employeeId", headerName: "Employee ID" },
		{
			field: "name",
			headerName: "Name",
			flex: 1,
			cellClassName: "name-column--cell",
			renderCell: (params) => {
				return (
					<div
						className="scrollable-column"
						style={{ overflowX: "auto", whiteSpace: "nowrap" }}
					>
						{params.row.firstName} {params.row.lastName}
					</div>
				);
			},
		},
		{
			field: "position",
			headerName: "Position",
			headerAlign: "left",
			align: "left",
		},
		{
			field: "company",
			headerName: "Company",
			headerAlign: "left",
			align: "left",
		},
		{
			field: "contact",
			headerName: "Phone Number",
			flex: 1,
		},
		{
			field: "email",
			headerName: "Email",
			flex: 1,
			renderCell: (params) => {
				return (
					<div
						className="scrollable-column"
						style={{ overflowX: "auto", whiteSpace: "nowrap" }}
					>
						{params.value}
					</div>
				);
			},
		},
		{
			field: "address",
			headerName: "Address",
			flex: 1,
			renderCell: (params) => {
				return (
					<div
						className="scrollable-column"
						style={{ overflowX: "auto", whiteSpace: "nowrap" }}
					>
						{params.value}
					</div>
				);
			},
		},
		{
			field: "city",
			headerName: "City",
			flex: 1,
		},
		{
			field: "zipCode",
			headerName: "Zip Code",
			flex: 1,
		},
		{
			field: "delete",
			headerName: "",
			sortable: false,
			flex: 1,
			renderCell: (params) => (
				<Button
					variant="text"
					sx={{
						color: colors.grey[100],
						transition: "all 0.3s",
						"&:hover": {
							color: colors.redAccent[500],
						},
					}}
					onClick={() => {
						const confirmed = window.confirm(
							"Are you sure you want to delete this user?"
						);
						if (confirmed) {
							handleDelete(params.row._id);
						}
					}}
				>
					<DeleteIcon />
				</Button>
			),
		},
	];

	const handleDelete = async (id) => {
		const response = await MakeProtectedApiCall(
			`delete-user/${id}`,
			"post"
		);
		if (response.status === 200) {
			setData((prevData) => prevData.filter((user) => user._id !== id));
		}
	};

	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await MakeProtectedApiCall("get-users", "get");
				if (response.status === 200) {
					setData(response.data.data);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<Box m="20px">
			<Header title="USERS" subtitle="Manage your users here." />
			<Box
				height="70vh"
				sx={{
					"& .MuiDataGrid-root": {
						border: "none",
					},
					"& .MuiDataGrid-cell": {
						borderBottom: "none",
					},
					"& .name-column--cell": {
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
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
						color: `${colors.grey[100]} !important`,
					},
				}}
			>
				<DataGrid
					rows={data}
					columns={columns}
					components={{ Toolbar: GridToolbar }}
					getRowId={(row) => row._id}
				/>
			</Box>
		</Box>
	);
};

export default Contacts;
