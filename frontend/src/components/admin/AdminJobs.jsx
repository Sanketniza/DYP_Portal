
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

//*-------------------------------------------DONE----------------------------------------------- */

function AdminJobs() {

    useGetAllAdminJobs();
   
    const [input , setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchJobByText(input));
    },[dispatch,input]); // take input, [dispatch, input]
    
  return (
    
       <>
            <Navbar />

            <div className="max-w-4xl p-10 mx-auto my-10 border rounded-lg shadow shadow-2xl border-emerald-500 sm:px-6 lg:px-8">
     
     {/* //&------------------------------------------------------------------------------------------ */}
     
                <div className="flex items-center justify-between gap-4 mx-5">
                    <Input
                        className="border-2 border-blue-400 rounded shadow shadow-xl outline-none w-fit"
                        placeholder="filter by name or role"
                        onChange={(e)=>setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/jobs/create")} > New Jobs </Button>
                </div>
                
            {/* //?------------------------------------------------------------------------------------------ */}
            
                <div className="mx-5 my-5">
                   <AdminJobsTable />
                </div>
                
            {/* //?------------------------------------------------------------------------------------------ */}
            
      {/* //&------------------------------------------------------------------------------------------ */}          
      
            </div>
            
       </>
    )
}


export default AdminJobs;