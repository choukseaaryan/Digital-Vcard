import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import EmailModal from "./EmailModal";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const ModalComponent = ({ data, setLoading }) => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDownloadClick = async () => {
		setOpen(false);
		setLoading(true);
		const response = await fetch(data.vcfUrl);
		const blob = await response.blob();
		const url = URL.createObjectURL(blob);
		const downloadLink = document.createElement("a");
		downloadLink.href = url;
		downloadLink.download = `${data.firstName}_${data.lastName}.vcf`;
		downloadLink.click();

		setLoading(false);
	};

	return (
		<>
			<Button
				onClick={handleClickOpen}
				sx={{
					width: "100%",
					backgroundColor: "#001d6e",
					color: "#fee2c5",
					borderRadius: "5px",
					fontSize: "20px",
					margin: "20px 0",
					boxShadow:
						"0px 10px 14.1px 0.9px rgba(0, 0, 0, 0.24), 0px 4px 19.6px 0.4px rgba(0, 0, 0, 0.16)",
					"&:hover": {
						backgroundColor: "#001d6e",
						boxShadow:
							"0px 20px 28.2px 0.9px rgba(0, 0, 0, 0.24), 0px 8px 40.18px 0.82px rgba(0, 0, 0, 0.16)",
					},
				}}
			>
				Dowload VCard
			</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle fontSize="26px">Save VCard</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						<Button
							onClick={handleDownloadClick}
							variant="outline"
							sx={{
								fontSize: "16px",
							}}
						>
							Download Vcard
						</Button>
						<EmailModal data={data} setLoading={setLoading} />
						<Button
							variant="outline"
							href={`mailto:?subject=${data.firstName} ${data.lastName}'s vCard&body=Follow this link to view ${data.firstName} ${data.lastName}'s vCard: https://digital-vcard.vercel.app/vcard/${data.company}/${data.employeeId}`}
							sx={{
								fontSize: "16px",
							}}
						>
							Share VCard via Email
						</Button>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						sx={{
							fontSize: "14px",
							color: "#fff",
						}}
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ModalComponent;
