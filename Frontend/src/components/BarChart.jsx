import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import MakeProtectedApiCall from "../utils/api";
import PageLoader from "./PageLoader";

const MyBarChart = ({ isDashboard = false }) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const response = await MakeProtectedApiCall(
				"get-total-clicks-per-user",
				"get"
			);
			if (response.status === 200) {
				console.log(response.data.data);
				setData(() => {
					// eslint-disable-next-line
					return response.data.data == [] ? null : response.data.data;
				});
			}
			setLoading(false);
		};

		fetchData();
	}, []);

	console.log(data);

	return (
		<>
			{loading && <PageLoader />}
			{!data ? (
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
