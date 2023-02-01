import Links from '../utils/links';
import { NavLink } from 'react-router-dom';

import React from 'react';

export const NavLinks = ({ toggleSidebar }) => {
	return (
		<div className="nav-links">
			{Links.map((link) => {
				const { text, path, id, icon } = link;
				return (
					<NavLink
						to={path}
						className={({ isActive }) => {
							return isActive ? 'nav-link active' : 'nav-link';
						}}
						key={id}
						onClick={toggleSidebar}
					>
						<span className="icon">{icon}</span>
						{text}
					</NavLink>
				);
			})}
		</div>
	);
};
