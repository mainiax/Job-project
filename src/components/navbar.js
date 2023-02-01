import React from 'react';
import Wrapper from '../assets/wrappers/navbar';

import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, clearStore } from '../features/user/userSlice';

const Navbar = () => {
	const [showLogout, setShowLogout] = useState(false);
	const { user } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	// toggle sidebar function
	const toggle = () => {
		dispatch(toggleSidebar());
	};
	// logout user function
	const logout = () => {
		dispatch(clearStore('logging out'));
		setShowLogout(false);
	};
	return (
		<Wrapper>
			<div className="nav-center">
				<button type="button" className="toggle-btn" onClick={toggle}>
					<FaAlignLeft />
				</button>
				<div>
					<Logo />
					<h3 className="logo-text">dashboard</h3>
				</div>
				<div className="btn-container">
					<button
						type="button"
						className="btn"
						onClick={() => setShowLogout(!showLogout)}
					>
						<FaUserCircle />
						{user?.name}
						<FaCaretDown />
					</button>
					<div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
						<button type="button" className="dropdown-btn" onClick={logout}>
							Logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Navbar;
