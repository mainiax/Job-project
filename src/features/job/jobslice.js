import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { getUserFromLocalStorage } from '../../utils/localStorage';

import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk';

const initialState = {
	isLoading: false,
	position: '',
	company: '',
	jobLocation: '',
	jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
	jobType: 'full-time',
	statusOptions: ['interview', 'declined', 'pending'],
	status: 'pending',
	isEditing: false,
	editJobId: '',
};

export const createJob = createAsyncThunk('job/createJob', createJobThunk);

export const editJob = createAsyncThunk('job/editJob', editJobThunk);

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);

const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
		handleChange: (state, { payload: { name, value } }) => {
			state[name] = value;
		},
		clearValues: () => {
			return {
				...initialState,
				jobLocation: getUserFromLocalStorage()?.location || '',
			};
		},
		setEditJob: (state, { payload }) => {
			return { ...state, isEditing: true, ...payload };
		},
	},
	extraReducers: {
		// create job
		[createJob.pending]: (state) => {
			state.isLoading = true;
		},
		[createJob.fulfilled]: (state, action) => {
			state.isLoading = false;
			toast.success('Job Created');
		},
		[createJob.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		// delete job
		[deleteJob.fulfilled]: (state, { payload }) => {
			toast.success(payload);
		},
		[deleteJob.rejected]: (state, { payload }) => {
			toast.error(payload);
		},
		// update job
		[editJob.pending]: (state) => {
			state.isLoading = true;
		},
		[editJob.fulfilled]: (state) => {
			state.isLoading = false;
			toast.success('job Modified...');
		},
		[editJob.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
	},
});
export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
