import { Box, Typography } from "@mui/material";
import Phone from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";
import Work from "@mui/icons-material/Work";
import LocationOn from "@mui/icons-material/LocationOn";
import Language from "@mui/icons-material/Language";
import MainModal from "../Modals/MainModal";

function Body({ data, handleLinkClick }) {
	return data ? (
		<Box
			m={0}
			alignItems={"center"}
			p={"0 25% 0 25%"}
			height={"100vh"}
			color={"#000"}
		>
			<Box
				p={"0 45px 40px"}
				boxShadow={"0 0 40px 7px rgba(0, 0, 0, 0.08)"}
			>
				<Box
					display={"flex"}
					alignItems={"center"}
					borderBottom={"1px solid rgba(0, 0, 0, 0.15)"}
				>
					<Box
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
						p={5}
					>
						<Phone />
					</Box>
					<Box
						variant="button"
						onClick={() => handleLinkClick("clicksPhone")}
						sx={{
							cursor: "pointer",
						}}
					>
						<Typography variant="h6" color={"#b3b4bb"}>
							Phone
						</Typography>
						<Typography variant="h5">{data.contact}</Typography>
					</Box>
				</Box>

				<Box
					display={"flex"}
					alignItems={"center"}
					borderBottom={"1px solid rgba(0, 0, 0, 0.15)"}
				>
					<Box
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
						p={5}
					>
						<Email />
					</Box>
					<Box
						variant="button"
						onClick={() => handleLinkClick("clicksEmail")}
						sx={{
							cursor: "pointer",
						}}
					>
						<Typography variant="h6" color={"#b3b4bb"}>
							Email
						</Typography>
						<Typography variant="h5">{data.email}</Typography>
					</Box>
				</Box>

				<Box
					display={"flex"}
					alignItems={"center"}
					borderBottom={"1px solid rgba(0, 0, 0, 0.15)"}
				>
					<Box
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
						p={5}
					>
						<Work />
					</Box>
					<Box>
						<Typography variant="h6" color={"#b3b4bb"}>
							{data.position}
						</Typography>
						<Typography variant="h5">{data.company}</Typography>
					</Box>
				</Box>

				<Box
					display={"flex"}
					alignItems={"center"}
					borderBottom={"1px solid rgba(0, 0, 0, 0.15)"}
				>
					<Box
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
						p={5}
					>
						<LocationOn />
					</Box>
					<Box>
						<Typography variant="h6" color={"#b3b4bb"}>
							Address
						</Typography>
						<Typography variant="h5">
							{data.address}
							<br />
							{data.city}, {data.state} {data.zipCode}
						</Typography>
					</Box>
				</Box>

				<Box display={"flex"} alignItems={"center"}>
					<Box
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
						p={5}
					>
						<Language />
					</Box>
					<Box
						variant="button"
						onClick={() => handleLinkClick("clicksWebsite")}
						sx={{
							cursor: "pointer",
						}}
					>
						<Typography variant="h6" color={"#b3b4bb"}>
							Website
						</Typography>
						<Typography variant="h5">{data.website}</Typography>
					</Box>
				</Box>

				<MainModal data={data} />
			</Box>
		</Box>
	) : (
		<></>
	);
}

export default Body;
