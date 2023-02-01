import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/JobsContainer';
import { getAllJobs } from '../features/alljobs/allJobSlice';
import Job from './Job';
import Loading from './loading';
import PageBtnContainer from './pageBtnContainer';

export const JobsContainer = () => {
	const {
		jobs,
		isLoading,
		page,
		totalJobs,
		numOfPages,
		searchStatus,
		search,
		sort,
		searchType,
	} = useSelector((store) => store.allJobs);
	console.log(numOfPages);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllJobs());
		// eslint-disable-next-line
	}, [page, search, searchStatus, searchType, sort]);

	if (isLoading) {
		return <Loading center />;
	}
	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>No Jobs to Display</h2>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<h5>
				{totalJobs} Job{jobs.length > 1 && 's'} found
			</h5>
			<div className="jobs">
				{jobs.map((job) => {
					// console.log(job);
					return <Job key={job._id} {...job} />;
				})}
			</div>
			{numOfPages >= 1 && <PageBtnContainer />}
		</Wrapper>
	);
};
