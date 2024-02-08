import React, { useEffect, useState } from "react";
import { Box, useTheme, Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import MakeProtectedApiCall from "../../utils/api";
import PageLoader from "../../components/PageLoader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Contacts = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [userIdToDelete, setUserIdToDelete] = useState(null);

	const handleClose = () => {
		setOpen(false);
	};

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
						setUserIdToDelete(params.row._id);
						setOpen(true);
					}}
					// onClick={() => {
					// 	const confirmed = window.confirm(
					// 		"Are you sure you want to delete this user?"
					// 	);
					// 	if (confirmed) {
					// 		handleDelete(params.row._id);
					// 	}
					// }}
				>
					<DeleteIcon />
				</Button>
			),
		},
	];

	const handleDelete = async () => {
		setOpen(false);
		setLoading(true);
		const response = await MakeProtectedApiCall(
			`delete-user/${userIdToDelete}`,
			"post"
		);
		if (response.status === 200) {
			setData((prevData) => prevData.filter((user) => user._id !== userIdToDelete));
		}
		setLoading(false);
	};

	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await MakeProtectedApiCall("get-users", "get");
				if (response.status === 200) {
					setData(response.data.data);
				}
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			{loading && <PageLoader />}
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
			<Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle fontSize="18px" id="alert-dialog-slide-description">{"Are you sure you want to delete this user?"}</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: colors.grey[400], fontSize: "16px"}} onClick={() => setOpen(false)}>Cancel</Button>
          <Button sx={{ color: colors.redAccent[500], fontSize: "16px"}} onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
		</>
	);
};

export default Contacts;
