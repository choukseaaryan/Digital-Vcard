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
	Checkbox,
	FormControlLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as Yup from "yup";
import MakeProtectedApiCall from "../../utils/api";

const Login = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

	const initialValues = {
		email: "",
		password: "",
	};

	const checkoutSchema = Yup.object().shape({
		email: Yup.string().email("Invalid email").required("Required"),
		password: Yup.string().required("Required"),
	});

	const handleFormSubmit = async (values, { resetForm }) => {
    const payload = {
      email: values.email,
      password: values.password,
    };

    const response = await MakeProtectedApiCall("login", "post", payload);
    if (response.status === 200) {
      resetForm();
      if (rememberMe) {
        localStorage.setItem("token", response.data.data.token);
      } else {
        sessionStorage.setItem("token", response.data.data.token);
      }
      window.location.href = "/";
    }
  };

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	const handleRememberMe = (event) => {
		setRememberMe(event.target.checked);
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
					Login
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
								display="flex"
								flexDirection="column"
								alignItems="center"
								justifyContent="center"
								gap={3}
							>
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
								/>
								<TextField
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
													onClick={
														handleTogglePassword
													}
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
							</Box>
							<Box display="flex" flexDirection="column" mt={1}>
								<FormControlLabel
									control={
										<Checkbox
											checked={rememberMe}
											onChange={handleRememberMe}
											style={{
												color: rememberMe
													? colors.greenAccent[500]
													: "",
											}}
										/>
									}
									label="Remember me"
								/>
								<Box
									display="flex"
									alignItems="center"
									justifyContent="center"
									mt={3}
								>
									<Button
										type="submit"
										color="secondary"
										variant="contained"
										size="large"
									>
										Login
									</Button>
								</Box>
							</Box>
						</form>
					)}
				</Formik>
				<Typography variant="h5" mt={5} color={colors.grey[100]}>
					Don't have an account?{" "}
					<Link
						to="/signup"
						style={{ textDecoration: "none", color: colors.greenAccent[500] }}
					>
						Signup
					</Link>
				</Typography>
			</Box>
		</Box>
	);
};

export default Login;
