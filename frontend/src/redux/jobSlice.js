import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({

    name: "job",

    initialState: {
        allJobs: [], // -> used to store the all jobs
        allAdminJobs: [], // -> used to store the all admin jobs
        singleJob: null, //* -> used to store the single job data
        searchJobByText: "", // -> used to store the searched query
        allAppliedJobs: [], // -> used to store the all applied jobs
        searchedQuery: "", //* -> used to store the searched query
    },

    reducers: {
        // actions
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },

        setSingleJob: (state, action) => { //* -> used to set the single job data. action.payload is the single job data . state is nothing but the initial state of the jobSlice.for 
            state.singleJob = action.payload; //* -> used to set the single job data
        },

        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },

        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },

        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },

        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        }
    }
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery
} = jobSlice.actions;
export default jobSlice.reducer;