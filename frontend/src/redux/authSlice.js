import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({ //* createSlice is a function that is used to create a slice of the redux store.

    name: "auth", //* name is the name of the slice.

    initialState: { //* initialState is the initial state of the slice. it is an object that contains the initial state of the slice.work like useState. means it is used to store the initial state of the slice.
        loading: false,
        user: null
    },

    reducers: { //* reducers is an object that contains the reducers of the slice. it is used to update the state of the slice. 
        //^ actions

        setLoading: (state, action) => { //* setLoading is a function that is used to update the loading state of the slice. action.payload is the payload of the action. it is used to store the loading state of the slice.
            state.loading = action.payload;
        },

        setUser: (state, action) => { //* setUser is a function that is used to update the user state of the slice. action.payload is the payload of the action. it is used to store the user state of the slice.payload means the data that is sent to the redux store.
            state.user = action.payload;
        }
    }

});

export const { setLoading, setUser } = authSlice.actions; //* setLoading and setUser are the actions that are used to update the loading and user state of the slice. 

export default authSlice.reducer; //* authSlice.reducer is the reducer of the slice. it is used to update the state of the slice.



/* 
   ^ what is initial value in use and what is value use and setUser in user login and signup.
     --> initial value in use is null and value use is user information and setUser is used to set the user information in the redux store.
     --> when we login or signup the user information is stored in the redux store and when we logout the user information is deleted from the redux store.
     --> when user login the value in setUser is user info like name, email, role, etc.
     --> when user logout the value in setUser is null.
     --> more than one user are login in from different devices the value in setUser is user information of that perticular user.means if user A is login in from device 1 and user B is login in from device 2 then the value in setUser is user information of user A.then what about user B ?
     --> the answer is when user B is login then the value in setUser is user information of user B and user A is logout from the device 1.
     --> both user A and B are login then the value in setUser are user information of user A and user B.
*/