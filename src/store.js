import { configureStore } from '@reduxjs/toolkit';
import allJobsSlice from './features/alljobs/allJobSlice';
import jobSlice from './features/job/jobslice';

import userSlice from './features/user/userSlice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		job: jobSlice,
		allJobs: allJobsSlice,
	},
});
