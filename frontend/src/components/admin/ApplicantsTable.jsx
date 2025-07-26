/* 
import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Table,TableBody,TableCaption, TableCell, TableHead, TableHeader, TableRow  } from "../ui/table"
import { MoreHorizontal, OctagonAlertIcon } from "lucide-react";
import axios from "axios";
import { APPLICATION_API_END_POINT } from '@/utils/constant';   
import { toast } from "sonner";

// ^ ----------------------------------------DONE-------------------------------------------------------

const shortlistingStatus = ["Accepted", "Rejected"];

// ^ -----------------------------------------------------------------------------------------------

const ApplicantsTable = () => {

        // this line gives the total number of applicants available in the database
        const { applicants } = useSelector(store => store.application);
    
        const statusHandler = async (status, id) => {  //* this function help to accept or reject the applicant status
            // console.log('called');
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
                console.log(res);
                if (res.data.success) {
                    toast.success(res.data.message);
                }
            } catch (error) {
                toast.error(error.response.data.message);
                toast.error("Error updating applicantTable ")
            }
        }


  return (

         <>
            <div>
            <Table>
                <TableCaption className="font-medium text-red-500"> <hr className='w-full h-1 my-2 bg-gray-400' /> A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow >
                        <TableHead className="text-[16px] font-bold text-orange-500" > FullName <hr className='w-full h-1 my-2 bg-orange-300' /></TableHead>
                        <TableHead className="text-[16px] font-bold text-orange-500" > Email    <hr className='w-full h-1 my-2 bg-orange-300' /></TableHead>
                        <TableHead className="text-[16px] font-bold text-orange-500" > Contact  <hr className='w-full h-1 my-2 bg-orange-300' /></TableHead>
                        <TableHead className="text-[16px] font-bold text-orange-500" > GitHub   <hr className='w-full h-1 my-2 bg-orange-300' /></TableHead>
                        <TableHead className="text-[16px] font-bold text-orange-500" > LinkedIn <hr className='w-full h-1 my-2 bg-orange-300' /></TableHead>
                        <TableHead className="text-[16px] font-bold text-orange-500" > Resume   <hr className='w-full h-1 my-2 bg-orange-300' /></TableHead>
                        <TableHead className="text-[16px] font-bold text-orange-500" > Date     <hr className='w-full h-1 my-2 bg-orange-300' /></TableHead>
                        <TableHead className="text-[16px] font-bold text-orange-500 text-right ">Action <hr className='w-full h-1 my-2 bg-orange-300' /></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="font-medium text-zinc-900">
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell> 
                                    <a className="text-blue-600 cursor-pointer hover:underline" href = {item?.applicant?.github} target="_blank" rel="noopener noreferrer"> 
                                         {item?.applicant?.github}
                                    </a>
                                </TableCell>
                                <TableCell> 
                                    <a className="text-blue-600 cursor-pointer hover:underline" href = {item?.applicant?.linkedin} target="_blank" rel="noopener noreferrer">
                                     {item?.applicant?.linkedin}
                                    </a>
                                </TableCell>
                                <TableCell >
                                    {
                                        item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span className="text-rose-700"> NULL </span>
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant?.createAt?.split("T")[0]}</TableCell>
                                <TableCell className="float-right cursor-pointer ">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 text-amber-700" >
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item?._id)} key={index} className='text-[16px] font-medium flex w-fit items-center my-2 cursor-pointer hover:text-green-500'>
                                                            <OctagonAlertIcon className="w-4 mx-2" />
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </tr>
                        ))
                    }

                </TableBody>

            </Table>
        </div>

         </>
    )
}

export default ApplicantsTable */


import { useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { MoreHorizontal, OctagonAlertIcon } from "lucide-react";
import { toast } from "sonner";
import API from '@/lib/api';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            const res = await API.post(`/application/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating applicant status");
        }
    };

    const filteredApplicants = applicants?.applications?.filter(app => app?.applicant) || [];
    const applicantCount = filteredApplicants.length;

    return (
        <>
            <div>
                {/* <h2>Applicants ({applicantCount})</h2> */}
                <Table>
                    <TableCaption className="font-medium text-red-500">
                        <hr className='w-full h-1 my-2 bg-gray-400' />
                        {applicantCount > 0 ? "A list of your recent applied users" : "No users have applied yet"}
                    </TableCaption>
                    {applicantCount > 0 && (
                        <>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-[16px] font-bold text-orange-500">FullName</TableHead>
                                    <TableHead className="text-[16px] font-bold text-orange-500">Email</TableHead>
                                    <TableHead className="text-[16px] font-bold text-orange-500">Contact</TableHead>
                                    <TableHead className="text-[16px] font-bold text-orange-500">GitHub</TableHead>
                                    <TableHead className="text-[16px] font-bold text-orange-500">LinkedIn</TableHead>
                                    <TableHead className="text-[16px] font-bold text-orange-500">Resume</TableHead>
                                    <TableHead className="text-[16px] font-bold text-orange-500">Date</TableHead>
                                    <TableHead className="text-[16px] font-bold text-orange-500 text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="font-medium text-zinc-900">
                                
                                {
                                    filteredApplicants.map(item => (
                                        <TableRow key={item._id}>
                                            <TableCell>{item.applicant?.fullname}</TableCell>
                                            <TableCell>{item.applicant?.email}</TableCell>
                                            <TableCell>{item.applicant?.phoneNumber}</TableCell>
                                            <TableCell>
                                                <a className="text-blue-600 cursor-pointer hover:underline" href={item.applicant?.github} target="_blank" rel="noopener noreferrer">
                                                    {item.applicant?.github}
                                                </a>
                                            </TableCell>
                                            <TableCell>
                                                <a className="text-blue-600 cursor-pointer hover:underline" href={item.applicant?.linkedin} target="_blank" rel="noopener noreferrer">
                                                    {item.applicant?.linkedin}
                                                </a>
                                            </TableCell>
                                            <TableCell>
                                                {item.applicant?.profile?.resume
                                                    ? <a className="text-blue-600 cursor-pointer" href={item.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item.applicant?.profile?.resumeOriginalName}</a>
                                                    : <span className="text-rose-700">NULL</span>
                                                }
                                            </TableCell>
                                            
                                            {/* <TableCell>
                                              {
                                                item?.applicant?.createdAt
                                                ? item.applicant.createdAt.split("T")[0].split("-").reverse().join("-")
                                                : <span className="text-rose-700">Not Available</span>
                                              }
                                            </TableCell> */}
    
                                            <TableCell>
                                                {item?.applicant?.createdAt
                                                    ? new Date(item.applicant.createdAt).toLocaleDateString("en-IN", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })
                                                    : <span className="text-rose-700">Not Available</span>}
                                            </TableCell>
                                                
                                                
                                            <TableCell className="float-right cursor-pointer">
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <MoreHorizontal />
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-32 text-amber-700">
                                                        {shortlistingStatus.map((status, index) => (
                                                            <div
                                                                onClick={() => statusHandler(status, item._id)}
                                                                key={index}
                                                                className='text-[16px] font-medium flex w-fit items-center my-2 cursor-pointer hover:text-green-500'
                                                            >
                                                                <OctagonAlertIcon className="w-4 mx-2" />
                                                                <span>{status}</span>
                                                            </div>
                                                        ))}
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </>
                    )}
                </Table>
            </div>
        </>
    );
};

export default ApplicantsTable;


