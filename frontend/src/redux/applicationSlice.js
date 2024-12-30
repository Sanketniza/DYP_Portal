import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({ //* createSlice is a function that is used to create a slice of the redux store.

    name: 'application', //* name is the name of the slice.

    initialState: { //* initialState is the initial state of the slice. it is an object that contains the initial state of the slice.work like useState. means it is used to store the initial state of the slice.
        applicants: null,
    },

    reducers: { //* reducers is an object that contains the reducers of the slice. it is used to update the state of the slice. 
        setAllApplicants: (state, action) => {
            state.applicants = action.payload;
        }
    }

});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;


/* 
    ^ How to use the redux toolkit
      -> 1. import { createSlice } from "@reduxjs/toolkit";
      -> 2. create a slice using createSlice function.
      -> 3. export the actions and reducer.
      -> 4. import the reducer in the store.js file.
      -> 5. use the useSelector hook to access the state.
      -> 6. use the useDispatch hook to dispatch the actions.
      -> 7. create a slice using createSlice function.
      -> 8. export the actions and reducer.

      ^In Redux Toolkit, dispatch is a function used to send actions to the Redux store, which then updates the state based on the action type and the current state. Let's break down how dispatch works in Redux Toolkit within a React application.

        -> Key Concepts

        -> Store: The centralized state container for your application.
        -> Actions: Plain JavaScript objects that describe "what happened" and typically include a type property and any additional data.
        -> Reducers: Functions that take the current state and an action as arguments and return a new state.

      ^ Terms used in the redux toolkit
      -> 1. slice -> It is function which is used to create a slice of the redux store. 
      -> 2. state -> it is used to store the state of the slice.state initial data which is store in the initialState in the slice.
      -> 3. reducer ->It is object which is used to update the state of the slice.
      -> 4. action ->action is an event . which wrap the event + any information like payload. it is used to dispatch the reducer.
      -> 4.1 payload -> it is used to store the data in the redux store.

      ^ How the data is stored and retrived from the redux toolkit
      -> 1. The data is stored in the redux toolkit in the form of an object.
      -> 2. The data is retrived from the redux toolkit in the form of an object.
      -> 3. The data is updated in the redux toolkit in the form of an object.

      ^ How to use the useSelector hook
      -> 1. import { useSelector } from "react-redux";
      -> 2. use the useSelector hook to access the state.It means to get the data from the redux store. example: const applicants = useSelector((state) => state.application.applicants);

      ^ How to use the useDispatch hook
      -> 1. import { useDispatch } from "react-redux";
      -> 2. use the useDispatch hook to dispatch the actions.It means to send the data to the redux store. . example: const dispatch = useDispatch(); dispatch(setAllApplicants(data));

      ^ Flow of data send and recieve in the redux toolkit
      -> 1. The data is sent to the redux store using the useDispatch hook.
      -> 2. The data is recieved from the redux store using the useSelector hook.

      ^ Flow of working of the redux toolkit
      -> 1. The data is sent to the redux store using the useDispatch hook.
      -> 2. The data is recieved from the redux store using the useSelector hook.
      -> 3. The data is updated in the redux store using the useDispatch hook.

      
    setAllApplicants is a function that is used to update the applicants state of the slice. action.payload is the payload of the action. it is used to store the applicants state of the slice.
*/