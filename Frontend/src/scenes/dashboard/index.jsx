import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import MakeProtectedApiCall from "../../utils/api";

const Dashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [clickCounts, setClickCounts] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await MakeProtectedApiCall(
					"get-sum-of-clicks",
					"get"
				);
				if (response.status === 200) {
					setClickCounts(response.data.data);
				}
			} catch (err) {
				console.log("Error fetching click counts: " + err);
			}
		};

		fetchData();
	}, []);

	return (
		<Box m="20px">
			{/* GRID & CHARTS */}
			<Box display="flex">
				<Header
					title="DASHBOARD"
					subtitle="Welcome to your dashboard"
				/>
			</Box>
			<Box
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="140px"
				gap="20px"
			>
				{/* ROW 1 */}
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ borderRadius: "5px" }}
				>
					<StatBox
						title={clickCounts.clicksEmail}
						subtitle="Clicks On Email"
						icon={
							<EmailIcon
								sx={{
									color: colors.greenAccent[600],
									fontSize: "26px",
								}}
							/>
						}
					/>
				</Box>
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ borderRadius: "5px" }}
				>
					<StatBox
						title={clickCounts.clicksPhone}
						subtitle="Clicks On Phone"
						icon={
							<PhoneIcon
								sx={{
									color: colors.greenAccent[600],
									fontSize: "26px",
								}}
							/>
						}
					/>
				</Box>
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ borderRadius: "5px" }}
				>
					<StatBox
						title={clickCounts.clicksWebsite}
						subtitle="Clicks On Website"
						icon={
							<LanguageIcon
								sx={{
									color: colors.greenAccent[600],
									fontSize: "26px",
								}}
							/>
						}
					/>
				</Box>
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ borderRadius: "5px" }}
				>
					<StatBox
						title={clickCounts.totalClicks}
						subtitle="Total Clicks"
						icon={
							<AdsClickIcon
								sx={{
									color: colors.greenAccent[600],
									fontSize: "26px",
								}}
							/>
						}
					/>
				</Box>

				{/* ROW 2 */}
				<Box
					gridColumn="span 6"
					gridRow="span 2"
					backgroundColor={colors.primary[400]}
					sx={{ borderRadius: "5px" }}
				>
					<Box
						mt="25px"
						p="0 30px"
						display="flex "
						justifyContent="space-between"
						alignItems="center"
					>
						<Box>
							<Typography
								variant="h5"
								fontWeight="600"
								color={colors.grey[100]}
							>
								Clicks On Each User
							</Typography>
						</Box>
					</Box>
					<Box height="270px" m="-30px 0 0 0">
						<LineChart isDashboard={true} />
					</Box>
				</Box>

				<Box
					gridColumn="span 6"
					gridRow="span 2"
					backgroundColor={colors.primary[400]}
					sx={{ borderRadius: "5px" }}
				>
					<Typography
						variant="h5"
						fontWeight="600"
						sx={{ padding: "30px 30px 0 30px" }}
					>
						Total Clicks Per User
					</Typography>
					<Box height="250px" mt="-20px">
						<BarChart isDashboard={true} />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Dashboard;
