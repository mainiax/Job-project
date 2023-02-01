export const addUserToLocalstorage = (user) => {
	localStorage.setItem('user', JSON.stringify(user));
};
export const removeUserFromLocalStorage = () => {
	localStorage.removeItem('user');
};

export const getUserFromLocalStorage = () => {
	const result = localStorage.getItem('user');
	const user = result ? JSON.parse(result) : null;
	return user;
};
export const getValueFromLocalStorage = (index) => {
	const result = localStorage.key(index);
	const user = result ? JSON.parse(result) : null;
	return user;
};
