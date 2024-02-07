import { useState } from "react";
import { Link } from "react-router-dom";
import {
	Box,
	Typography,
	useTheme,
	TextField,
	Button,
	IconButton,
	InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as Yup from "yup";
import MakeProtectedApiCall from "../../utils/api";

const Signup = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const initialValues = {
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
		phoneNumber: "",
		company: "",
	};

	const isNonMobile = useMediaQuery("(min-width:600px)");
	const phoneRegExp =
		/^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

	const checkoutSchema = Yup.object().shape({
		fullName: Yup.string().required("Required"),
		email: Yup.string().email("Invalid email").required("Required"),
		password: Yup.string().required("Required"),
		confirmPassword: Yup.string()
			.required("Required")
			.oneOf([Yup.ref("password"), null], "Passwords must match"),
		phoneNumber: Yup.string()
			.matches(phoneRegExp, "Phone number is not valid")
			.required("Required"),
		company: Yup.string().required("Required"),
	});

	const handleFormSubmit = async (values, { resetForm }) => {
		const payload = {
			fullName: values.fullName,
			email: values.email,
			password: values.password,
			phoneNumber: values.phoneNumber,
			company: values.company,
		};

		const response = await MakeProtectedApiCall(
			"signup-admin",
			"post",
			payload
		);
    
		if (response.status === 200) {
      resetForm();
			window.location.href = "/login";
		}
	};

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPassword = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	return (
		<Box display="flex" alignItems="center" justifyContent="center">
			<Box
				backgroundColor={colors.primary[400]}
				mt="10%"
				p={5}
				width={"fit-content"}
				display="flex"
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
				sx={{
					borderRadius: "10px",
					boxShadow: `0px 0px 15px 1px ${colors.greenAccent[600]}`,
				}}
			>
				<Typography
					variant="h1"
					fontWeight="bold"
					sx={{ color: colors.grey[100] }}
				>
					Signup
				</Typography>
				<Formik
					onSubmit={handleFormSubmit}
					initialValues={initialValues}
					validationSchema={checkoutSchema}
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
								mt={5}
								display="grid"
								gridTemplateColumns="repeat(12, minmax(0, 1fr))"
								gap={3}
								sx={{
									"& > div": {
										gridColumn: isNonMobile
											? undefined
											: "span 12",
									},
								}}
							>
								<TextField
									sx={{ gridColumn: "span 6" }}
									fullWidth
									variant="filled"
									type="text"
									label="Full Name"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.fullName}
									name="fullName"
									error={
										!!touched.fullName && !!errors.fullName
									}
									helperText={
										touched.fullName && errors.fullName
									}
								/>
								<TextField
									sx={{ gridColumn: "span 6" }}
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
								/>
								<TextField
									sx={{ gridColumn: "span 6" }}
									fullWidth
									variant="filled"
									type={showPassword ? "text" : "password"}
									label="Password"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.password}
									name="password"
									error={
										!!touched.password && !!errors.password
									}
									helperText={
										touched.password && errors.password
									}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={togglePassword}
												>
													{showPassword ? (
														<Visibility />
													) : (
														<VisibilityOff />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
								<TextField
									sx={{ gridColumn: "span 6" }}
									fullWidth
									variant="filled"
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									label="Confirm Password"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.confirmPassword}
									name="confirmPassword"
									error={
										!!touched.confirmPassword &&
										!!errors.confirmPassword
									}
									helperText={
										touched.confirmPassword &&
										errors.confirmPassword
									}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={
														toggleConfirmPassword
													}
												>
													{showConfirmPassword ? (
														<Visibility />
													) : (
														<VisibilityOff />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
								<TextField
									sx={{ gridColumn: "span 6" }}
									fullWidth
									variant="filled"
									type="text"
									label="Phone Number"
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.phoneNumber}
									name="phoneNumber"
									error={
										!!touched.phoneNumber &&
										!!errors.phoneNumber
									}
									helperText={
										touched.phoneNumber &&
										errors.phoneNumber
									}
								/>
								<TextField
									sx={{ gridColumn: "span 6" }}
									fullWidth
									variant="filled"
									type="text"
									label="Company Name"
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
								/>
							</Box>
							<Box
								display="flex"
								alignItems="center"
								justifyContent="start"
								mt={3}
							>
								<Button
									type="submit"
									color="secondary"
									variant="contained"
									size="large"
								>
									Signup
								</Button>
							</Box>
						</form>
					)}
				</Formik>
				<Typography variant="h5" mt={5} color={colors.grey[100]}>
					Already a member?{" "}
					<Link
						to="/login"
						style={{
							textDecoration: "none",
							color: colors.greenAccent[500],
						}}
					>
						Login
					</Link>
				</Typography>
			</Box>
		</Box>
	);
};

export default Signup;
