import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import MakeProtectedApiCall from "../utils/api";
import PageLoader from "./PageLoader";

const MyBarChart = ({ isDashboard = false }) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const response = await MakeProtectedApiCall(
				"get-total-clicks-per-user",
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
			)}
		</>
	);
};

export default MyBarChart;
