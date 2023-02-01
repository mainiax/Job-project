import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
	addUserToLocalstorage,
	getUserFromLocalStorage,
	removeUserFromLocalStorage,
} from '../../utils/localStorage';
import {
	clearStoreThunk,
	loginUserThunk,
	registerUserThunk,
	updateUserThunk,
} from './userThunk';

const initialState = {
	isLoading: false,
	isSidebarOpen: false,
	user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (user, thunkApi) => {
		return registerUserThunk(`/auth/register`, user, thunkApi);
	}
);

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (user, thunkApi) => {
		return loginUserThunk(`/auth/login`, user, thunkApi);
	}
);
export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (user, thunkApi) => {
		return updateUserThunk('/auth/updateUser', user, thunkApi);
	}
);
export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunk);
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// toggleSidebar
		toggleSidebar: (state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
		// Logout user
		logoutUser: (state, { payload }) => {
			if (payload) {
				toast.success(payload);
			}
			state.user = null;
			state.isSidebarOpen = false;

			removeUserFromLocalStorage();
		},
	},
	extraReducers: {
		// /register
		[registerUser.pending]: (state) => {
			state.isLoading = true;
		},
		[registerUser.fulfilled]: (state, { payload }) => {
			const { user } = payload;
			state.isLoading = false;
			state.user = user;
			addUserToLocalstorage(user);
			toast.success(`Hello there ${user.name}`);
		},
		[registerUser.rejected]: (state, { payload }) => {
			state.isLoading = true;
			toast.error(payload);
		},
		// login
		[loginUser.pending]: (state) => {
			state.isLoading = true;
		},
		[loginUser.fulfilled]: (state, { payload }) => {
			const { user } = payload;
			state.isLoading = false;
			state.user = user;
			addUserToLocalstorage(user);
			toast.success(`welcome Back ${user.name}`);
		},
		[loginUser.rejected]: (state, { payload }) => {
			state.isLoading = false;

			toast.error(payload);
		},
		// updateUser
		[updateUser.pending]: (state) => {
			state.isLoading = false;
		},
		[updateUser.fulfilled]: (state, { payload }) => {
			const { user } = payload;
			state.isLoading = false;
			state.user = user;
			addUserToLocalstorage(user);
			toast.success('user Updated');
		},
		[updateUser.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		[clearStore.rejected]: () => {
			toast.error('there was an error');
		},
	},
});
export const { toggleSidebar, logoutUser } = userSlice.actions;

export default userSlice.reducer;
