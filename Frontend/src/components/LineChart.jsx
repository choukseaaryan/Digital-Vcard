import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import MakeProtectedApiCall from "../utils/api";
import PageLoader from "./PageLoader";

const MyLineChart = ({ isDashboard = false }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const response = await MakeProtectedApiCall(
				"get-line-chart-data",
				"get"
			);
			if (response.status === 200) {
				setData(response.data.data);
			}
			setLoading(false);
		};

		fetchData();
	}, []);

	return (
		<>
			{loading && <PageLoader />}
			{data.length === 0 ? (
				<Box
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
					height={"100%"}
				>
					No Data Found
				</Box>
			) : (
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
						{
							scaleType: "linear",
							label: isDashboard ? "" : "Clicks",
						},
					]}
					slotProps={{
						legend: {
							direction: "row",
							position: {
								vertical: "bottom",
								horizontal: "middle",
							},
							itemMarkHeight: 10,
							itemMarkWidth: 10,
							itemGap: 20,
							padding: isDashboard ? 0 : 20,
						},
					}}
				/>
			)}
		</>
	);
};

export default MyLineChart;
