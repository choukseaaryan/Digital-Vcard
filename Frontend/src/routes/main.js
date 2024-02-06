import React, { useState } from 'react';
import Topbar from '../scenes/global/Topbar';
import Sidebar from '../scenes/global/Sidebar';
import ProtectedRoute from './protectedRoutes';


const Main = () => {
  const [isSidebar, setIsSidebar] = useState(true);

	return (
		<div className="app">
			<Sidebar isSidebar={isSidebar} />
			<main className="content">
				<Topbar setIsSidebar={setIsSidebar} />
				<ProtectedRoute />
			</main>
		</div>
	);
};

export default Main;
