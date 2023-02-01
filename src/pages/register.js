import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/registerPage';
import { FormRow } from '../components';
import Logo from '../components/Logo';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const initialState = {
	name: '',
	email: '',
	password: '',
	IsMember: true,
};

function Register() {
	const [values, setValues] = useState(initialState);
	const { user, isLoading } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setValues({ ...values, [name]: value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, IsMember } = values;
		if (!email || !password || (!IsMember && !name)) {
			toast.error('please fill out all values');
			return;
		}
		if (IsMember) {
			dispatch(loginUser({ email: email, password: password }));
			return;
		}
		dispatch(registerUser({ name, email, password }));
	};
	const toggleMember = () => {
		setValues({ ...values, IsMember: !values.IsMember });
	};

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate('/');
			}, 2000);
		}
		// eslint-disable-next-line
	}, [user]);
	return (
		<Wrapper className="full-page">
			<form className="form" onSubmit={onSubmit}>
				<Logo />
				<h3>{values.IsMember ? 'Login' : 'Register'}</h3>
				{/* {name} */}
				{!values.IsMember && (
					<FormRow
						type="text"
						name="name"
						value={values.name}
						handleChange={handleChange}
					/>
				)}

				{/* {email} */}
				<FormRow
					type="email"
					name="email"
					value={values.email}
					handleChange={handleChange}
				/>
				{/* {password} */}
				<FormRow
					type="password"
					name="password"
					value={values.password}
					handleChange={handleChange}
				/>

				<button type="submit" className="btn btn-block" disabled={isLoading}>
					{isLoading ? 'loading...' : 'submit'}
				</button>
				<p>
					{values.IsMember ? 'not a member yet?' : 'Already a member?'}

					<button type="button" onClick={toggleMember} className="member-btn">
						{values.IsMember ? 'Register' : 'Login'}
					</button>
				</p>
			</form>
		</Wrapper>
	);
}
export default Register;
