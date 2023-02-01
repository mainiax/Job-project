import React from 'react';
import { Link } from 'react-router-dom';

import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/landingPage';
import { Logo } from '../components/index';
const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className="container page">
				{/* {info} */}
				<div className="info">
					<h1>
						job <span>tracking</span> app
					</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas,
						explicabo dicta libero ipsa animi placeat accusantium asperiores nam
						sint facilis, saepe eius, numquam odit corrupti eaque quaerat ex
						cumque fuga.
					</p>
					<Link to="/register" className="btn btn-hero">
						login/register
					</Link>
				</div>
				<img src={main} alt="job hunt" className="img main-img"></img>
			</div>
		</Wrapper>
	);
};

export default Landing;
