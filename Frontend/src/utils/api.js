import axios from "axios";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_BASE_URL;

const AlertError = (text) => {
	return toast.error(
		typeof text === "object"
			? "Something went wrong. Please try again later"
			: text
	);
};

const AlertSuccess = (text) => {
	return toast.success(
		typeof text === "object" ? "Request Successful" : text
	);
};

const MakeProtectedApiCall = async (apiPath, method, bodyData = {}, header) => {
	let headers = {};

	if (header) {
		headers = {
			...header,
			"x-auth-token": sessionStorage.getItem("token"),
		};
	} else {
		headers = {
			"Content-Type": "application/json",
			"x-auth-token": sessionStorage.getItem("token"),
		};
	}

	switch (method.toLowerCase()) {
		case "get":
			try {
				const url = `${baseURL}/${apiPath}`;
				const res = await axios.get(url, { headers });
				return res;
			} catch (error) {
				const msg = error.response?.data?.msg;
				AlertError(msg);
				toast.clearWaitingQueue();
				if (error.response?.status === 401) {
					localStorage.clear();
					window.location.href = "/login";
				}
				return { status: error.response?.status };
			}
		case "post":
			try {
				const url = `${baseURL}/${apiPath}`;
				const res = await axios.post(url, bodyData, { headers });
				AlertSuccess(res.data?.data?.msg || res.data.msg);
				return res;
			} catch (error) {
				const msg = error.response?.data?.msg || "Something went wrong";
				if (error?.response?.status === 500) {
					AlertError(msg?.msg);
					return { status: error.response?.status };
				}
				if (error.response?.status === 401) {
					localStorage.clear();
					window.location.href = "/login";
				}
				AlertError(msg);
				toast.clearWaitingQueue();
				return { status: error.response?.status };
			}
		case "put":
			try {
				const url = `${baseURL}/${apiPath}`;
				const res = await axios.put(url, bodyData, { headers });
				AlertSuccess(res.data?.data?.msg || res.data.msg);
				return res;
			} catch (error) {
				const msg = error.response?.data?.msg;
				AlertError(msg);
				toast.clearWaitingQueue();
				if (error.response?.status === 401) {
					localStorage.clear();
					window.location.href = "/login";
				}
				return { status: error.response?.status };
			}
		case "patch":
			try {
				const url = `${baseURL}/${apiPath}`;
				const res = await axios.patch(url, bodyData, { headers });
				AlertSuccess(res.data?.data?.msg || res.data.msg);
				return res;
			} catch (error) {
				const msg = error.response?.data?.msg;
				AlertError(msg);
				toast.clearWaitingQueue();
				if (error.response?.status === 401) {
					localStorage.clear();
					window.location.href = "/login";
				}
				return { status: error.response?.status };
			}
		case "delete":
			try {
				const url = `${baseURL}/${apiPath}`;
				const res = await axios.delete(url, bodyData, { headers });
				AlertSuccess(res.data?.data?.msg || res.data.msg);
				return res;
			} catch (error) {
				const msg = error.response?.data?.msg;
				AlertError(msg);
				toast.clearWaitingQueue();
				if (error.response?.status === 401) {
					localStorage.clear();
					window.location.href = "/login";
				}
				return { status: error.response?.status };
			}
		default:
			break;
	}
};

export default MakeProtectedApiCall;
