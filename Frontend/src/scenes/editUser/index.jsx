import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "@mui/icons-material/Delete";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import MakeProtectedApiCall from "../../utils/api";
import PageLoader from "../../components/PageLoader";
import { toast } from "react-toastify";

const Form = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const { userId } = useParams();
	const [user, setUser] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);
			const response = await MakeProtectedApiCall(
				`get-users?userId=${userId}`,
				"get"
			);
			if (response.status === 200) {
				setUser(response.data?.data);
			}
			setLoading(false);
		};

		fetchUser();
	}, [userId]);

	const handleImageUpload = async (event) => {
		const file = event.target.files[0];
		if (file.size > 2 * 1024 * 1024) {
			toast.error("File size should not exceed 2MB");
		} else {
			setSelectedImage(file);
		}
		event.target.value = null;
	};

	const handleFormSubmit = async (values, { resetForm }) => {
		setLoading(true);

		const formData = new FormData();
		formData.append("firstName", values.firstName);
		formData.append("lastName", values.lastName);
		formData.append("email", values.email);
		formData.append("contact", values.contact);
		formData.append("address1", values.address1);
		formData.append("address2", values.address2);
		formData.append("city", values.city);
		formData.append("state", values.state);
		formData.append("zipCode", values.zipCode);
		formData.append("position", values.position);
		formData.append("website", values.website);
		formData.append("company", values.company);
		formData.append("employeeId", values.employeeId);
		formData.append("image", selectedImage);

		const response = await MakeProtectedApiCall(
			"update-user/" + userId,
			"post",
			formData,
			{ "Content-type": "multipart/form-data" }
		);
		if (response.status === 200) {
			resetForm();
			setSelectedImage(null);
		}
		setLoading(false);
	};

	const isNonMobile = useMediaQuery("(min-width:600px)");

	const phoneRegExp =
		/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

	const checkoutSchema = yup.object().shape({
		firstName: yup.string().required("Required"),
		lastName: yup.string().required("Required"),
		email: yup.string().email("Invalid email").required("Required"),
		contact: yup
			.string()
			.matches(phoneRegExp, "Phone number is not valid")
			.required("Required"),
		address1: yup.string().required("Required"),
		address2: yup.string().required("Required"),
		city: yup.string().required("Required"),
		state: yup.string().required("Required"),
		zipCode: yup.string().required("Required"),
		company: yup.string().required("Required"),
		employeeId: yup.string().required("Required"),
		position: yup.string().required("Required"),
		website: yup.string().required("Required"),
	});

	const initialValues = {
		firstName: user?.firstName || "",
		lastName: user?.lastName || "",
		email: user?.email || "",
		contact: user?.contact || "",
		address1: user?.address1 || "",
		address2: user?.address2 || "",
		city: user?.city || "",
		state: user?.state || "",
		zipCode: user?.zipCode || "",
		website: user?.website || "",
		employeeId: user?.employeeId || "",
		company: user?.company || "",
		position: user?.position || "",
	};

	return (
		<>
			{loading && <PageLoader />}
			<Box p="20px">
				<Header title="EDIT USER" subtitle="Edit a User Profile" />

				<Formik
					onSubmit={handleFormSubmit}
					initialValues={initialValues}
					validationSchema={checkoutSchema}
					enableReinitialize
				>
					{({
						values,
						errors,
						touched,
						handleBlur,
						handleChange,
						handleSubmit,
					}) => (
						<form onSubmit={handleSubmit}>
							<Box
								display="grid"
								gap="20px"
								gridTemplateColumns="repeat(12, minmax(0, 1fr))"
								sx={{
									"& > div": {
										gridColumn: isNonMobile
											? undefined
											: "span 12",
									},
								}}
							>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="First Name"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.firstName}
									name="firstName"
									error={
										!!touched.firstName &&
										!!errors.firstName
									}
									helperText={
										touched.firstName && errors.firstName
									}
									sx={{ gridColumn: "span 6" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Last Name"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.lastName}
									name="lastName"
									error={
										!!touched.lastName && !!errors.lastName
									}
									helperText={
										touched.lastName && errors.lastName
									}
									sx={{ gridColumn: "span 6" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Email"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.email}
									name="email"
									error={!!touched.email && !!errors.email}
									helperText={touched.email && errors.email}
									sx={{ gridColumn: "span 6" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Contact Number"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.contact}
									name="contact"
									error={
										!!touched.contact && !!errors.contact
									}
									helperText={
										touched.contact && errors.contact
									}
									sx={{ gridColumn: "span 6" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Address Line 1"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.address1}
									name="address1"
									error={
										!!touched.address1 && !!errors.address1
									}
									helperText={
										touched.address1 && errors.address1
									}
									sx={{ gridColumn: "span 6" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Address Line 2"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.address2}
									name="address2"
									error={
										!!touched.address2 && !!errors.address2
									}
									helperText={
										touched.address2 && errors.address2
									}
									sx={{ gridColumn: "span 6" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="City"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.city}
									name="city"
									error={!!touched.city && !!errors.city}
									helperText={touched.city && errors.city}
									sx={{ gridColumn: "span 4" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="State"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.state}
									name="state"
									error={!!touched.state && !!errors.state}
									helperText={touched.state && errors.state}
									sx={{ gridColumn: "span 4" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Zip Code"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.zipCode}
									name="zipCode"
									error={
										!!touched.zipCode && !!errors.zipCode
									}
									helperText={
										touched.zipCode && errors.zipCode
									}
									sx={{ gridColumn: "span 4" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Website"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.website}
									name="website"
									error={
										!!touched.website && !!errors.website
									}
									helperText={
										touched.website && errors.website
									}
									sx={{ gridColumn: "span 6" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Company"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.company}
									name="company"
									error={
										!!touched.company && !!errors.company
									}
									helperText={
										touched.company && errors.company
									}
									sx={{ gridColumn: "span 6" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Employee ID"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.employeeId}
									name="employeeId"
									error={
										!!touched.employeeId &&
										!!errors.employeeId
									}
									helperText={
										touched.employeeId && errors.employeeId
									}
									sx={{ gridColumn: "span 6" }}
								/>
								<TextField
									fullWidth
									variant="filled"
									type="text"
									label="Position"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.position}
									name="position"
									error={
										!!touched.position && !!errors.position
									}
									helperText={
										touched.position && errors.position
									}
									sx={{ gridColumn: "span 6" }}
								/>
								<Box
									gridColumn="span 6"
									sx={{
										backgroundColor: colors.primary[400],
										borderRadius: "10px",
										p: "5px",
									}}
								>
									<Box display="flex" alignItems={"center"}>
										<Box>
											<input
												type="file"
												accept="image/*"
												onChange={handleImageUpload}
												style={{ display: "none" }}
												id="image-upload-input"
											/>
											<label htmlFor="image-upload-input">
												<Button
													component="span"
													color="secondary"
													variant="contained"
												>
													Upload Profile Image
												</Button>
											</label>
										</Box>
										<Box>
											{selectedImage ? (
												<Box
													width={"100%"}
													pl={2}
													display={"flex"}
													alignItems={"center"}
												>
													<Typography
														variant="body1"
														color="textSecondary"
													>
														Selected Image:{" "}
														{selectedImage.name}
													</Typography>
													<Box
														variant="button"
														ml={2}
														onClick={() =>
															setSelectedImage(
																null
															)
														}
														sx={{
															cursor: "pointer",
															color: colors
																.grey[300],
															"&:hover": {
																color: colors
																	.redAccent[400],
															},
														}}
													>
														<DeleteIcon />
													</Box>
												</Box>
											) : (
												user?.profileUrl && (
													<Box
														gridColumn="span 4"
														display={"flex"}
														alignItems={"center"}
														pl={2}
														component={"a"}
														href={user?.profileUrl}
														target="_blank"
														rel="noreferrer"
														sx={{
															cursor: "pointer",
															color: colors
																.grey[300],
															textDecoration:
																"none",
															"&:hover": {
																textDecoration:
																	"underline",
															},
														}}
													>
														<Typography
															variant="h5"
															color="textSecondary"
														>
															Current Image{" "}
														</Typography>
														<OpenInNewIcon
															sx={{ ml: "5px" }}
														/>
													</Box>
												)
											)}
										</Box>
									</Box>
								</Box>
								<Box gridColumn="span 6" mt={1}>
									<Box display="flex" justifyContent="end">
										<Box>
											<Button
												type="submit"
												color="secondary"
												variant="contained"
											>
												Save User
											</Button>
										</Box>
									</Box>
								</Box>
							</Box>
						</form>
					)}
				</Formik>
			</Box>
		</>
	);
};

export default Form;
