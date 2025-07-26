
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Delete, Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import API from '@/lib/api'

const CompaniesTable = () => {
    
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    
    useEffect(()=>{
        
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        
        setFilterCompany(filteredCompany);
        
    },[companies,searchCompanyByText])

    // Delete the company

    const handleDelete = (id) => {
        
        const isConfirm = confirm("Are you sure to delete this company?");
        
        if (isConfirm) {
            
            API.delete(`/company/delete/${id}`)
            
            .then(res => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    setFilterCompany(filterCompany.filter(company => company._id !== id));
                }
            })
            .catch(error => {
                console.log(error);
            })

            // delete all jobs from this company
            API.get(`/company/get/${id}/jobs`)
            .then(res => {
                const jobIds = res.data.jobs.map(job => job._id);
                API.post(`/company/delete/jobs`, {jobIds})
                .then(res => {
                    if (res.data.success) {
                        toast.success('All jobs from this company have been deleted.');
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                
            })
            .catch(error => {
                console.log(error);
            })

            navigate('/admin/companies')

        } else {
            return;
        }
    }
    
    return (
        <div>
            <Table>
                <TableCaption className="text-red-500">  <hr className='w-full h-1 mb-3 bg-gray-400' /> A list of your recent registered companies </TableCaption>
                <TableHeader>
                    <TableRow >
                        <TableHead className="text-orange-600"> Logo  <hr className='w-full h-1 my-2 bg-orange-300' /> </TableHead>
                        <TableHead className="text-orange-600"> Name  <hr className='w-full h-1 my-2 bg-orange-300' /> </TableHead>
                        <TableHead className="text-orange-600"> Date  <hr className='w-full h-1 my-2 bg-orange-300' /> </TableHead>
                        <TableHead className="text-right text-orange-600"> Action <hr className='w-full h-1 my-2 bg-orange-300' /> </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <tr key={company._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo}/>
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 cursor-pointer w-fit'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>

                                            <div onClick={() => handleDelete(company._id)} className='flex items-center gap-2 cursor-pointer w-fit'>
                                                <Delete className='w-4' />
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
        </div>
    )
}

export default CompaniesTable