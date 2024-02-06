import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const ErrorPage404 = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box mt="10%" textAlign="center">
			<Typography variant="h1" sx={{ color: colors.grey[100] }}>
				Oops!
			</Typography>
			<Typography variant="h1" sx={{ margin: "20px 0", color: colors.grey[400] }}>
				<Typography
					variant="span"
					sx={{ color: colors.greenAccent[500] }}
				>
					404
				</Typography>{" "}
				- Page Not Found
			</Typography>
			<Typography variant="h3">
				Looks like you are at the wrong address. Please check the web
				address or try again later!
			</Typography>
		</Box>
	);
};

export default ErrorPage404;
