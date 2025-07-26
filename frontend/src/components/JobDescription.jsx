import { Badge } from "./ui/badge"
import Navbar from './shared/Navbar'
import { Button } from "./ui/button"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import API from "@/lib/api";

//* -------------------------------------------DONE--------------------------------------------

function JobDescription() {
    
    const params = useParams(); //* -> used to get the id of the job from the url
    //* useParams() is a hook that is used to get the id of the job from the url . for example : http://localhost:5173/job-description/666666666666666666666666 . here 666666666666666666666666 is the id of the job.params.id works like -> params.id = 666666666666666666666666

    const jobId = params.id; //* -> used to get the id of the job from the url
    
    const {singleJob} = useSelector((store) => store.job); //* -> used to get the single job from the redux store
    const {user} = useSelector((store) => store.auth); //* -> used to get the user from the redux store because we need the user id to check if the user has applied for the job or not
    
    const isIntialApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false; //* -> used to check if the user has applied for the job
    
    const [isApplied , setIsApplid] = useState(isIntialApplied); //* -> used to store the state of the job application
    const dispatch = useDispatch(); //* -> used to dispatch the action to the redux store. here the action which is dispatch is setSingleJob.

    const applyJobHandler = async () => {

        try {

            const res = await API.get(`/application/apply/${jobId}`);

            console.log("res.data", res.data); // it's give the response of the job application . for example : {success: true, message: 'Application submitted successfully'}

            if(res.data.success) {
                setIsApplid(true); // update the local state
                const updateSinglejob = {...singleJob , applications:[...singleJob.applications , {applicant:user?._id}]}
                dispatch(setSingleJob(updateSinglejob));  // help us to real time UI update
                toast.success(res.data.message)
            }
            
        }catch (err) {
            console.log(err);
            toast.error(err.response.data.message);
        }
    }



    useEffect(() => {

        const fetchSingleJob = async () => {

            try{
                const res = await API.get(`/job/get/${jobId}`);

                     // console.log("res.data", res.data); 
               //* --> it's give the response of the job data. for example : {success: true, job: {_id: '666666666666666666666666', title: 'Software Engineer', position: 'Full Stack Developer', jobType: 'Full Time', salary: 100000, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', experience: 2, createdAt: '2024-05-01T12:00:00.000Z', applications: []}}

                if(res.data.success) {
                    dispatch(setSingleJob(res.data.job)); 

                    //* --> it's used to set the single job data in the redux store.
                     // console.log("res.data.job", res.data.job); 
                    //* --> it's give the single job data. for example : {_id: '666666666666666666666666', title: 'Software Engineer', position: 'Full Stack Developer', jobType: 'Full Time', salary: 100000, description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.', experience: 2, createdAt: '2024-05-01T12:00:00.000Z', applications: []}

                    setIsApplid(res.data.job.applications.some(application => application.applicant === user?._id) ); // ensure the state is in sync with fetched data
                }
            }catch(error){
                console.log(error)
            }
            
        }
        
        fetchSingleJob();

    }, [jobId , dispatch , user?._id]);

    // console.log(singleJob?.experienceLevel    );

    
   return (
       <>
            <Navbar />
            
        <div className="mx-5">
            
        {/* //~`--------------------------- ---------------------------------------------------- */}
        
            <div className="mx-auto mt-5 bg-white border border-gray-300 shadow shadow-2xl max-w-7xl p-7 rounded-2xl sm:px-6 lg:px-8">
                
        {/* //&`--------------------------- ---------------------------------------------------- */}
        
                <div className='flex items-center justify-between'> 
                    <div>
                        <h1 className="text-2xl font-bold "> {singleJob?.title} </h1>
                        <div className="flex items-center gap-2 mt-5 shadow shadow-2xl cursor-pointer">
                            <Badge className={"mr-2 text-blue-800 shadow shadow-2xl bg-gray-300"} variant="ghost"> {singleJob?.position} Position</Badge>
                            <Badge className={"mr-2 text-red-800 shadow shadow-lg bg-gray-300"} variant="solid"> {singleJob?.jobType} </Badge>
                            <Badge className={"mr-2 text-yellow-800 shadow shadow-lg bg-gray-300"} variant="ghost">{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    
                    <div className="">
                        <Button 
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied} className={`rounded-bg ${isApplied ? `bg-blue-800 text-white cursor-not-allowed hover:bg-blue-900` : 
                                ` bg-violet-600 text-white	hover:bg-violet-700`}` } variant="outline-none"> 
                                    {
                                        isApplied ? "All ready Applied" : "Apply Now"
                                    } 
                        </Button>
                    </div>
                </div>
                
        {/* //&`--------------------------- ---------------------------------------------------- */}

                <div className="mt-5">
                    <h1 className="my-5 text-xl font-bold border-b-2 border-gray-300 text-zinc-800">Job Description</h1>
                    <div>
                        <h1 className="my-1 font-bold">Role: <span className="pl-1 font-normal text-gray-800"> { singleJob?.title } </span></h1>
                        <h1 className="my-1 font-bold">Location: <span className="pl-1 font-normal text-gray-800"> { singleJob?.location } </span></h1>
                        <h1 className="my-1 font-bold">Description: <span className="pl-1 font-normal text-gray-800"> { singleJob?.description }</span></h1>
                        <h1 className="my-1 font-bold">
                          Experience: 
                          <span className="pl-1 font-normal text-gray-800">
                            {singleJob?.experienceLevel} 
                            {Number.isInteger(Number(singleJob?.experienceLevel)) && ' Years'} 
                          </span>
                        </h1>
                        <h1 className="my-1 font-bold">Salary: <span className="pl-1 font-normal text-gray-800"> {singleJob?.salary} LPA </span></h1>
                        <h1 className="my-1 font-bold">Total Application: <span className="pl-1 font-normal text-gray-800"> {singleJob?.applications?.length} </span></h1>
                        <h1 className="my-1 font-bold">Posted Date: <span className="pl-1 font-normal text-gray-800"> {singleJob?.createdAt.split("T")[0]} </span></h1>
                    </div>
                </div>       
                
        {/* //&`--------------------------- ---------------------------------------------------- */}
        
            </div>

        {/* //~`--------------------------- ---------------------------------------------------- */}

        </div>
       </>
    )
}

export default JobDescription;


/* 
  ^ How to use useParams() hook ?
    -> useParams() is a hook that is used to get the id of the any route from the url . for example : http://localhost:5173/job-description/666666666666666666666666 . here 666666666666666666666666 is the id of the job.params.id works like -> params.id = 666666666666666666666666 . 
    -> we can use this hook in any component where we want to get the id of the any route from the url.



    ^ tell me work flow of useParams hook ?

      !..  React JS useParams Hook helps to access the parameters of the current route to manage the dynamic routes in the URL. The react-router-dom package has useParams hooks that let you access and use the parameters of the current route as required.
      --> params work like a object which store the id of the any route from the url.
      --> for example : http://localhost:5173/job-description/666666666666666666666666 . here 666666666666666666666666 is the id of the job.
      --> if we do console.log(params) it give the  {id : "666666666666666666666666"} and this id is used to get the data of the job from the database.
      --> so we can say that params = {id : "666666666666666666666666"}
      --> now we want to get the id of the job from the url.
      --> for that we have to use useParams() hook in that component where we want to get the id of the job from the url.
      --> and we have to store the id of the job in a variable.
      --> we can get the id of the job from the url by using params.id.
      --> now we want to get the id of the job from the url in that component where we stored the id of the job in a variable.
      --> for that we have to use useParams() hook in that component.

      & take one example this code to understand this flow :
        const params = useParams(); //* -> used to get the id of the job from the url
        const jobId = params.id; //* -> used to get the id of the job from the url

      --> here we are using useParams() hook in the JobDescription component to get the id of the job from the url.
      --> and we are storing the id of the job in a variable called jobId.
      --> now we can use this jobId to get the data of the job from the database.


        Question :
           #) const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId} ` , {
                withCredentials: true 
            });

          *  --> Making an API Call: This line uses the axios library to make a GET request to the application API endpoint. The URL is constructed using a template literal that includes the jobId variable.
          *  --> Dynamic URL: The URL ${APPLICATION_API_END_POINT}/apply/${jobId} dynamically includes the job ID, allowing the application to target the specific job application endpoint for the job identified by jobId.
          *  --> withCredentials: true: This option is included in the request configuration to indicate that credentials (like cookies) should be sent along with the request. This is important for authentication and session management, especially when dealing with protected routes or APIs that require user authentication.

           ? --> here we are using axios to get the data of the job from the database.
           ? --> we are using the jobId to get the data of the job from the database.
           ? --> withCredentials: true is used to send the cookies to the server.
           ? --> if the data is fetched successfully then we will get the response in the res variable.
           ? --> res.data.success is used to check if the data is fetched successfully or not.
           ? --> if res.data.success is true then we will get the data of the job from the database.
           ? --> if res.data.success is false then we will get the error message.

           ^ why we use template literal in the url like this : `${APPLICATION_API_END_POINT}/apply/${jobId} ` ?
            --> we use template literal in the url to make the url dynamic.
            --> and we are using the jobId variable to make the url dynamic.
            --> so we can say that the url is dynamic and it will change according to the jobId.
            --> Dynamic URL Construction: Template literals (enclosed in backticks `) allow for the creation of strings that can include embedded expressions. In this case, `${APPLICATION_API_END_POINT}/apply/${jobId}` constructs a URL where APPLICATION_API_END_POINT is a base URL, and ${jobId} is a placeholder for the actual job ID. This approach is useful when the URL depends on a variable value, making it more flexible and reusable.

      
*/