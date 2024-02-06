import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	if (localStorage.getItem("token")) {
		const token = localStorage.getItem("token");
		sessionStorage.setItem("token", token);
	}
	
	const isAuth = sessionStorage.getItem("token");

	return isAuth ? (
		<div>
			<Outlet />
		</div>
	) : (
		<Navigate to="/login" />
	);
};

export default ProtectedRoute;
