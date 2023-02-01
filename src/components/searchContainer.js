import React from 'react';
import { FormRow } from './index';
import FormRowSelect from './formRowSelect';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { clearFilter, handleChange } from '../features/alljobs/allJobSlice';

const SearchContainer = () => {
	const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
		useSelector((store) => store.allJobs);

	const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
	const dispatch = useDispatch();

	const handleSearch = (e) => {
		if (isLoading) return;

		dispatch(handleChange({ name: e.target.name, value: e.target.value }));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(clearFilter());
	};
	return (
		<Wrapper>
			<form className="form">
				<h4>Search form</h4>
				<div className="form-center">
					{/* search position */}
					<FormRow
						type="text"
						name="search"
						value={search}
						handleChange={handleSearch}
					/>
					{/* search by status */}
					<FormRowSelect
						labelText="status"
						name="searchStatus"
						value={searchStatus}
						list={['all', ...statusOptions]}
						handleChange={handleSearch}
					/>
					{/* search by type */}
					<FormRowSelect
						labelText="type"
						name="searchType"
						value={searchType}
						list={['all', ...jobTypeOptions]}
						handleChange={handleSearch}
					/>
					{/* sort */}
					<FormRowSelect
						name="sort"
						value={sort}
						list={sortOptions}
						handleChange={handleSearch}
					/>
					<button
						className="btn btn-block btn-dagger"
						onClick={handleSubmit}
						disabled={isLoading}
					>
						Clear filters
					</button>
				</div>
			</form>
		</Wrapper>
	);
};

export default SearchContainer;
