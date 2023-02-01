import axios from 'axios';
import { clearStore } from '../features/user/userSlice';
import { getUserFromLocalStorage } from './localStorage';

const customFetch = axios.create({
	baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});
export const checkForUnauthorizedResponse = (error, thunkApi) => {
	if (error.response.status === 401) {
		thunkApi.dispatch(clearStore());
		return thunkApi.rejectWithValue('Unauthorized! Logging Out...');
	}
	return thunkApi.rejectWithValue(error.response.data.msg);
};
export default customFetch;
