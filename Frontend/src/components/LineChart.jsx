import { useTheme } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { tokens } from "../theme";
import { useEffect, useState } from "react";
import MakeProtectedApiCall from "../utils/api";

const MyLineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await MakeProtectedApiCall(
				"get-line-chart-data",
				"get"
			);
			if (response.status === 200) {
				setData(response.data.data);
			}
		};

		fetchData();
	}, []);

	return (
		data && (
			<LineChart
				margin={isDashboard ? { bottom: 70 } : { bottom: 120 }}
				dataset={data}
				series={[
					{ dataKey: "yEmail", label: "Email" },
					{ dataKey: "yPhone", label: "Phone" },
					{ dataKey: "yWebsite", label: "Website" },
				]}
				xAxis={[
					{
						scaleType: "point",
						dataKey: "x",
						label: isDashboard ? "" : "Employee ID",
					},
				]}
				yAxis={[
					{ scaleType: "linear", label: isDashboard ? "" : "Clicks" },
				]}
				slotProps={{
					legend: {
						direction: "row",
						position: { vertical: "bottom", horizontal: "middle" },
						itemMarkHeight: 10,
						itemMarkWidth: 10,
						itemGap: 20,
						padding: isDashboard ? 0 : 20,
					},
				}}
			/>
		)
	);
};

export default MyLineChart;
