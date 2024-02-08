import { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { BarChart } from "@mui/x-charts/BarChart";
import MakeProtectedApiCall from "../utils/api";

const MyBarChart = ({ isDashboard = false }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await MakeProtectedApiCall(
				"get-total-clicks-per-user",
				"get"
			);
			if (response.status === 200) {
				setData(() =>
					response.data.data == [] ? null : response.data.data
				);
			}
		};

		fetchData();
	}, []);

	return !data ? (
		<Box
			display={"flex"}
			justifyContent={"center"}
			alignItems={"center"}
			height={"100%"}
		>
				No Data Found
		</Box>
	) : (
		<BarChart
			dataset={data}
			series={[{ dataKey: "totalClicks", label: "Total Clicks" }]}
			yAxis={[
				{
					scaleType: "linear",
					label: isDashboard ? "" : "Total Clicks",
				},
			]}
			xAxis={[
				{
					scaleType: "band",
					dataKey: "employeeId",
					label: isDashboard ? "" : "Employee ID",
				},
			]}
			slotProps={{
				legend: { hidden: "false" },
			}}
		/>
	);
};

export default MyBarChart;
