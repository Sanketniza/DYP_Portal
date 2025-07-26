import { setAllAppliedJobs } from "@/redux/jobSlice";
import API from '@/lib/api'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner";

const useGetAppliedJobs = () => {

    const dispatch = useDispatch(); // -> useDispatch is used to dispatch the data to the redux store. dispatch means to send the data to the redux store.

    useEffect(()=>{ // -> useEffect is used to run the code when the component is mounted or rendered. it is a hook that generates a side effect in the component.side effect means to do something that is not related to the component.example: fetching the data from the database.
        
        const fetchAppliedJobs = async () => {

            try {

                // axios is used to make the request to the database. and withCredentials is used to send the cookies to the database.
                // axios.get is used to get the data from the database which is created by the admin.
                // APPLICATION_API_END_POINT is used to get the data from the database which is created by the admin.
                // withCredentials is used to send the cookies to the database.

                const res = await API.get('/application/get');

              //  console.log(res.data); // -> gives the data of the all jobs in the database which is created by the admin.

                if(res.data.success){
                    dispatch(setAllAppliedJobs(res.data.application));
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message); // -> shows the error message
            }
        }

        fetchAppliedJobs(); // -> fetches the data of the all jobs in the database which is created by the admin.

    },[]) // [] means it will run only once when the component is mounted or rendered , once the component is unmounted or destroyed the useEffect will not run again, if you want to run the useEffect again you can pass the dependency array in the useEffect hook
};
export default useGetAppliedJobs;