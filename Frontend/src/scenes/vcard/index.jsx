import { useState, useEffect } from "react";
import Header from "../../components/VcardHeader";
import Body from "../../components/VcardBody";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import MakeProtectedApiCall from "../../utils/api";
import PageLoader from "../../components/PageLoader";

const VCard = () => {
	const { company, empId } = useParams();

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [pageLoading, setPageLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const url = `get-user/${company}/${empId}`;
			const response = await MakeProtectedApiCall(url, "get");
			if (response.status === 200) {
				setData(response.data.data);
			}
			setLoading(false);
		};
		fetchData();
	}, [empId, company]);

	const handleLinkClick = async (key) => {
		const response = await MakeProtectedApiCall("update-qr-code", "post", {
			userId: data._id,
			key,
		});
		if (response.status >= 200 && response.status < 300) {
			switch (key) {
				case "clicksPhone":
					window.location.href = `tel:${data.contact}`;
					break;
				case "clicksEmail":
					window.location.href = `mailto:${data.email}`;
					break;
				case "clicksWebsite":
					window.open(`https://${data.website}`, "_blank");
					break;
				default:
					break;
			}
		}
	};

	return loading ? (
		<Box
			display={"flex"}
			textAlign={"center"}
			justifyContent={"center"}
		>
      <Typography variant="h2" mt={20} >Loading, Please Wait..</Typography>
    </Box>
	) : (
		<Box bgcolor={"#fff"}>
			{pageLoading && <PageLoader />}
			<Header data={data} handleLinkClick={handleLinkClick} />
			<Body data={data} handleLinkClick={handleLinkClick} setLoading={setPageLoading} />
		</Box>
	);
};

export default VCard;
