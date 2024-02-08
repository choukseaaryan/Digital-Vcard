import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog({ data, setLoading }) {
	const [open, setOpen] = useState(false);
	const [email, setEmail] = useState("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSend = async () => {
		setOpen(false);
		setLoading(true);
		const bodyMessage = `Hello, \n\nPlease find the VCard of ${data.firstName} ${data.lastName} attached with this email. \n\nThank you!`;

		const response = await fetch(data.vcfUrl);
		const arrayBuffer = await response.arrayBuffer();
		const binaryData = new Uint8Array(arrayBuffer);
		const vCardData = btoa(
			binaryData.reduce(
				(data, byte) => data + String.fromCharCode(byte),
				""
			)
		);

		window.Email.send({
			SecureToken: "ef89ab81-3da9-4ba9-9795-c369861d8b3d",
			To: email,
			From: "aaryan2chouksey@gmail.com",
			Subject: `VCard of ${data.firstName} ${data.lastName}`,
			Body: bodyMessage,
			Attachments: [
				{
					name: `${data.firstName}_${data.lastName}.vcf`,
					data: vCardData,
				},
			],
		}).then((message) => {
			if (message === "OK") {
				toast.success("Mail sent successfully!");
			} else {
				toast.error("Could not send mail! Please try again.");
			}
			setLoading(false);
		});
	};

	return (
		<div>
			<Button
				variant="outline"
				onClick={handleClickOpen}
				sx={{
					fontSize: "16px",
				}}
			>
				Send to Email
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle fontSize="26px">Send to Email</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ fontSize: "16px" }}>
						Send the VCard to your email:
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="recipient-email"
						label="Email Address"
						type="email"
						fullWidth
						variant="standard"
						onChange={(e) => setEmail(e.target.value)}
						sx={{
							"& input": { fontSize: "16px" },
							"& input::placeholder": { fontSize: "16px" },
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						sx={{ color: "#fff", fontSize: "14px" }}
					>
						Cancel
					</Button>
					<Button
						onClick={handleSend}
						sx={{ color: "#fff", fontSize: "14px" }}
					>
						Send
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
