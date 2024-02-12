import { Routes, Route } from "react-router-dom";
import Login from "../scenes/login";
import Signup from "../scenes/signup";
import Dashboard from "../scenes/dashboard";
import QrCode from "../scenes/qrCode";
import User from "../scenes/user";
import Bar from "../scenes/bar";
import CreateUser from "../scenes/createUser";
import EditUser from "../scenes/editUser";
import Line from "../scenes/line";
import ErrorPage404 from "../scenes/Error404";
import Main from "./main";
import VCard from "../scenes/vcard";

const Routing = () => {
	return (
		<Routes>
			<Route path="*" element={<ErrorPage404 />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/vcard/:company/:empId" element={<VCard />} />
			<Route path="/" element={<Main />}>
				<Route path="/" element={<Dashboard />} />
				<Route path="/user" element={<User />} />
				<Route path="/qrCode" element={<QrCode />} />
				<Route path="/createUser" element={<CreateUser />} />
				<Route path="/edit/:userId" element={<EditUser />} />
				<Route path="/bar" element={<Bar />} />
				<Route path="/line" element={<Line />} />
			</Route>
		</Routes>
	);
};

export default Routing;
