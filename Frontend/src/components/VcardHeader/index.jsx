import { Typography, Box } from "@mui/material";
import Phone from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";
import Language from "@mui/icons-material/Language";

const fileUrl = process.env.REACT_APP_FILE_URL;

function Header({ data, handleLinkClick}) {

	return (
		<Box
			m={0}
			p={"60px 25% 0 25%"}
			textAlign={"center"}
			alignItems={"center"}
			color={"#fee2c5"}
			bgcolor={"#001d6e"}
		>
			{data ? (
				<Box
					textAlign={"center"}
					alignItems={"center"}
					boxShadow={"0px 0px 20px 5px rgba(0, 0, 0, 0.2)"}
				>
					<Box pt={5} pb={3}>
						<Box
							component={"img"}
							src={`${fileUrl}/profiles/${data.adminId}/${data.employeeId}.png`}
							alt="Profile"
							borderRadius={"50%"}
							border={"1px solid #fff"}
							boxShadow={"0 0 20px 5px rgba(0, 0, 0, 0.5)"}
							width={"100px"}
							height={"100px"}
						/>
					</Box>
					<Box>
						<Typography variant="h2">
							{data.firstName} {data.lastName}
						</Typography>
						<Typography variant="h4" mt={1} mb={2}>
							{data.position} - {data.company}
						</Typography>
					</Box>
					<Box
						display={"flex"}
						width={"100%"}
						borderTop={"1px solid rgba(255, 255, 255, 0.15)"}
						mt={1}
					>
						<Box
							variant="button"
							width={"33.33%"}
							onClick={() => handleLinkClick("clicksPhone")}
							p={3}
							display={"flex"}
							justifyContent={"center"}
							alignItems={"center"}
							borderRight={"1px solid rgba(255, 255, 255, 0.15)"}
							sx={{
								cursor: "pointer",
								transition: "background-color 0.3s ease",
								"&:hover": {
									backgroundColor: "rgba(0, 0, 0, 0.3)",
								},
							}}
						>
							<Phone />
							<Typography variant="span" ml={2}>
								Phone
							</Typography>
						</Box>
						<Box
							variant="button"
							width={"33.33%"}
							onClick={() => handleLinkClick("clicksEmail")}
							p={3}
							display={"flex"}
							justifyContent={"center"}
							alignItems={"center"}
							borderRight={"1px solid rgba(255, 255, 255, 0.15)"}
							sx={{
								cursor: "pointer",
								transition: "background-color 0.3s ease",
								"&:hover": {
									backgroundColor: "rgba(0, 0, 0, 0.3)",
								},
							}}
						>
							<Email />
							<Typography variant="span" ml={2}>
								Email
							</Typography>
						</Box>
						<Box
							variant="button"
							width={"33.33%"}
							onClick={() => handleLinkClick("clicksWebsite")}
							p={3}
							display={"flex"}
							justifyContent={"center"}
							alignItems={"center"}
							sx={{
								cursor: "pointer",
								transition: "background-color 0.3s ease",
								"&:hover": {
									backgroundColor: "rgba(0, 0, 0, 0.3)",
								},
							}}
						>
							<Language />
							<Typography variant="span" ml={2}>
								Website
							</Typography>
						</Box>
					</Box>
				</Box>
			) : (
				<Typography variant="h1">Please check the employee id!</Typography>
			)}
		</Box>
	);
}

export default Header;
