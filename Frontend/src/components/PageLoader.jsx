import { Box, alpha } from "@mui/material";
import { Grid } from "react-loader-spinner";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../theme";

const PageLoader = () => {
  const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				position: "fixed",
				zIndex: "9999",
				left: "0",
				top: "0",
				width: "100%",
				height: "100%",
				backgroundColor: alpha(colors.primary[400], 0.6)
			}}
		>
			<Grid
				visible={true}
				height="80"
				width="80"
				color={colors.greenAccent[400]}
				ariaLabel="grid-loading"
				radius="12.5"
				wrapperStyle={{}}
				wrapperClass="grid-wrapper"
			/>
		</Box>
	);
};

export default PageLoader;
