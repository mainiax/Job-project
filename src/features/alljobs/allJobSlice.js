import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import customFetch, {
	checkForUnauthorizedResponse,
} from '../../utils/customAxios';

const initialFiltersState = {
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	sort: 'latest',
	sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
	isLoading: false,
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
	stats: {},
	monthlyApplications: [],
	...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
	'allJobs/getJobs',
	async (_, thunkApi) => {
		const { page, search, searchStatus, searchType, sort } =
			thunkApi.getState().allJobs;

		let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;

		if (search) {
			url = url + `&search=${search}`;
		}
		try {
			const resp = await customFetch.get(url, {
				headers: {
					authorization: `Bearer ${thunkApi.getState().user.user.token}`,
				},
			});

			return resp.data;
		} catch (error) {
			return checkForUnauthorizedResponse(error, thunkApi);
		}
	}
);

export const showStats = createAsyncThunk(
	'allJobs/showStats',
	async (_, thunkApi) => {
		let url = '/jobs/stats';
		try {
			const resp = await customFetch.get(url, {
				headers: {
					authorization: `Bearer ${thunkApi.getState().user.user.token}`,
				},
			});

			return resp.data;
		} catch (error) {
			return checkForUnauthorizedResponse(error, thunkApi);
		}
	}
);
const allJobsSlice = createSlice({
	name: 'allJobs',
	initialState,
	reducers: {
		showLoading: (state) => {
			state.isLoading = true;
		},
		hideLoading: (state) => {
			state.isLoading = false;
		},
		handleChange: (state, { payload: { name, value } }) => {
			state.page = 1;
			state[name] = value;
		},
		clearFilter: (state) => {
			return { ...state, ...initialFiltersState };
		},
		changePage: (state, { payload }) => {
			state.page = payload;
		},
		clearAllJobsState: (state) => {
			return initialState;
		},
	},

	extraReducers: {
		// all jobs
		[getAllJobs.pending]: (state) => {
			state.isLoading = true;
		},
		[getAllJobs.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.jobs = payload.jobs;
			state.numOfPages = payload.numOfPages;
			state.totalJobs = payload.totalJobs;
		},
		[getAllJobs.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		// all stats
		[showStats.pending]: (state) => {
			state.isLoading = true;
		},
		[showStats.fulfilled]: (state, { payload }) => {
			state.isLoading = true;
			state.stats = payload.defaultStats;
			state.monthlyApplications = payload.monthlyApplications;
		},
		[showStats.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
	},
});
export const {
	showLoading,
	hideLoading,
	handleChange,
	clearFilter,
	changePage,
	clearAllJobsState,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
