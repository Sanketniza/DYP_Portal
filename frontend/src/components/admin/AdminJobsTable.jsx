import { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Delete, Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import API from '@/lib/api';

// ^ ---------------------------------------------DONE--------------------------------------------------

const AdminJobsTable = () => {
   const {allAdminJobs , searchJobByText} = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

       useEffect(()=>{
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job)=>{
            
            if(!searchJobByText){
                return true
            }
                
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());

        }); 
        setFilterJobs(filteredJobs);
        
    },[allAdminJobs,searchJobByText])

const handleDelete = (id) => {
    const isConfirm = confirm("Are you sure to delete this job?");
    
    if (isConfirm) {
        API.delete(`/job/delete/${id}`)
        .then(res => {
            if (res.data.success) {
                toast.success(res.data.message);
                setFilterJobs(prevJobs => prevJobs.filter(job => job._id !== id));
            }
        })
        .catch(error => {
            console.error("Error deleting job:", error.response?.data?.message || error.message);
            toast.error("Failed to delete job. Please try again.");
        });
    } else {
        return;
    }
}




    return (
        <>
            <Table>
                <TableCaption className="text-red-500">  <hr className='w-full h-1 my-2 bg-gray-300' /> A list of your recent posted jobs  </TableCaption>
               
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg text-amber-800 ">  Company Name  <hr className='w-full h-1 my-2 bg-orange-300' /> </TableHead>
                        <TableHead className="text-lg text-amber-800 ">  Role          <hr className='w-full h-1 my-2 bg-orange-300' /> </TableHead>
                        <TableHead className="text-lg text-amber-800 ">  Date          <hr className='w-full h-1 my-2 bg-orange-300' /> </TableHead>
                        <TableHead className="text-lg text-right text-amber-800 ">Action  <hr className='w-full h-1 my-2 bg-orange-300' /> </TableHead>
                    </TableRow>
                </TableHeader>
                
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <tr key={job._id}>
                              
                                <TableCell>  {job?.company?.name}</TableCell>
                                <TableCell>  {job?.title}</TableCell>
                                <TableCell>  {job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            
                                            <div onClick={()=> navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 cursor-pointer w-fit'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 mt-2 cursor-pointer w-fit'> 
                                                <Eye/>
                                                <span>Applicants</span>
                                            </div>

                                            <div onClick={() => handleDelete(job._id)} className='flex items-center gap-2 mt-2 cursor-pointer w-fit'>
                                                <Delete/>
                                                <span>Delete</span>
                                            </div>

                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    );
};

export default AdminJobsTable;