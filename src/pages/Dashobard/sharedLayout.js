import React from 'react';
import { Outlet } from 'react-router-dom';
import { SmallSidebar, Navbar, BigSidebar } from '../../components';
import Wrapper from '../../assets/wrappers/sharedLayout';

const SharedLayout = () => {
	return (
		<Wrapper>
			<main className="dashboard">
				<SmallSidebar />
				<BigSidebar />
				<div>
					<Navbar />
					<div className="dashboard-page">
						<Outlet />
					</div>
				</div>
			</main>
		</Wrapper>
	);
};

export default SharedLayout;
