import { showLoading, hideLoading, getAllJobs } from '../alljobs/allJobSlice';
import customFetch, {
	checkForUnauthorizedResponse,
} from '../../utils/customAxios';
import { clearValues } from './jobslice';

export const createJobThunk = async (job, thunkApi) => {
	try {
		const resp = customFetch.post('/jobs', job, {
			headers: {
				authorization: `Bearer ${thunkApi.getState().user.user.token}`,
			},
		});
		thunkApi.dispatch(clearValues());
		return resp.data;
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkApi);
	}
};
export const editJobThunk = async ({ jobId, job }, thunkApi) => {
	try {
		const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
			headers: {
				authorization: `Bearer ${thunkApi.getState().user.user.token}`,
			},
		});
		thunkApi.dispatch(clearValues());
		return resp.data;
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkApi);
	}
};
export const deleteJobThunk = async (jobId, thunkApi) => {
	thunkApi.dispatch(showLoading());

	try {
		const resp = await customFetch.delete(`/jobs/${jobId}`, {
			headers: {
				authorization: `Bearer ${thunkApi.getState().user.user.token}`,
			},
		});
		thunkApi.dispatch(getAllJobs());
		return resp.data.msg;
	} catch (error) {
		thunkApi.dispatch(hideLoading());
		return checkForUnauthorizedResponse(error, thunkApi);
	}
};
