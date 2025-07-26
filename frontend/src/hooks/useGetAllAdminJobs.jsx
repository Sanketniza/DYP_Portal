import { setAllAdminJobs } from '@/redux/jobSlice'
import API from '@/lib/api'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {

    const dispatch = useDispatch(); //todo: -> useDispatch is used to dispatch the data to the redux store. dispatch means to send the data to the redux store.

    useEffect(()=>{ //* -> useEffect is used to run the code when the component is mounted or rendered. it is a hook that generates a side effect in the component.side effect means to do something that is not related to the component.example: fetching the data from the database.

        const fetchAllAdminJobs = async () => {

            try {
                //? axios is used to make the request to the database. and withCredentials is used to send the cookies to the database.
                //? axios.get is used to get the data from the database which is created by the admin.
                //? JOB_API_END_POINT is used to get the data from the database which is created by the admin.
                //? withCredentials is used to send the cookies to the database.

                const res = await API.get('/job/getadminjobs');

                //* console.log("res.data", res.data); // -> gives the data of the all jobs in the database which is created by the admin.

                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs)); // -> sets the data of the all jobs in the redux store to be used in the AdminJobs component or other components. for example: if you want to show the data of the all jobs in the AdminJobs component then you can use the data from the redux store.
                    // example of res.data.jobs: [
                    //     {
                    //         _id: '666666666666666666666666',
                    //         title: 'Software Engineer',
                    //         description: 'Software Engineer is a professional who designs, develops, and maintains software applications.',
                    //         location: 'San Francisco, California, USA',
                    //         salary: '$100,000 - $120,000',
                    //         companyId: '666666666666666666666666',
                    //         __v: 0
                    //     }
                    // ]
                }

            } catch (error) {
                console.log(error);
            }
        }

        fetchAllAdminJobs(); // -> fetches the data of the all jobs in the database which is created by the admin.

    },[]) // [] means it will run only once when the component is mounted or rendered , once the component is unmounted or destroyed the useEffect will not run again, if you want to run the useEffect again you can pass the dependency array in the useEffect hook

};

export default useGetAllAdminJobs; 

/* 
    ? way of data passing :
       - Backend :  data is passed to the frontend using props, context api, local storage, cookies, session storage, query params, path params, state lifting, useRef, useContext, useReducer, useEffect, useMemo, useCallback, useSelector, useDispatch, useParams, useSearchParams

       - Frontend : data is passed to the backend using axios, fetch, async/await, try/catch, withCredentials, cookies, session storage, query params, path params, state lifting, useRef, useContext, useReducer, useEffect, useMemo, useCallback, useSelector, useDispatch, useParams, useSearchParams

       =state lefting is nothing but lifting the state to the parent component so that the child component can use the state of the parent component.

      ^ Flow of data :
          first data come from backend to frontend -> its handled by redux store ( first come at custom hook -> then dispatch in redux store -> then set in redux store -> then use in the component )

       ^ How to pass data from frontend to backend :
          - data from frontend is passed through axios in the backend by using http request like get, post, put, delete, patch, etc.
       
        ^ How http request works :
          flow of data : frontend -> http request -> backend
         
          * How data is stored in database:
            - data is stored in database in the form of json format.
             working is like this: 
             - first data is sent from frontend to backend by using axios in the frontend.
             - then data is stored in the database in the form of json format.
             - then data is fetched from the database to the frontend by using axios in the backend.
             - then data is sent to the frontend by using props, context api, local storage, cookies, session storage, query params, path params, state lifting, useRef, useContext, useReducer, useEffect, useMemo, useCallback, useSelector, useDispatch, useParams, useSearchParams

*/