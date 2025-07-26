import { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import API from '@/lib/api'

// ^ -------------------------------------------DONE----------------------------------------------------
// edit button -> add edit component that edit postJob data

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);
    
    const changeEventHandler = (e) => {
        setInput({ 
            ...input, [e.target.name]: e.target.value 
        });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({
            ...input, companyId:selectedCompany._id
        });
    };

    const submitHandler = async (e) => {
        
        e.preventDefault();
        
        try {
            setLoading(true);
            
            const res = await API.post(`/job/post`, input);
            
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
            
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            
        {/*//&------------------------------------------------------------------------------------------  */}
        
            <div className="flex items-center justify-center w-screen my-5 ">
                <form onSubmit={submitHandler} className="max-w-4xl p-8 border rounded-lg shadow-2xl border-emerald-500 ">
                    
            {/*//?------------------------------------------------------------------------------------------  */}        
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 sm:grid-mx-auto md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
                        
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="my-1 border-2 border-gray-300 rounded focus-visible:ring-offset-0 focus-visible:ring-0"
                            />
                        </div>
                        
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="my-1 border-2 border-gray-300 rounded focus-visible:ring-offset-0 focus-visible:ring-0"
                            />
                        </div>
                        
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="my-1 border-2 border-gray-300 rounded focus-visible:ring-offset-0 focus-visible:ring-0"
                            />
                        </div>
                        
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="my-1 border-2 border-gray-300 rounded focus-visible:ring-offset-0 focus-visible:ring-0"
                            />
                        </div>
                        
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="my-1 border-2 border-gray-300 rounded focus-visible:ring-offset-0 focus-visible:ring-0"
                            />
                        </div>
                        
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="my-1 border-2 border-gray-300 rounded focus-visible:ring-offset-0 focus-visible:ring-0"
                            />
                        </div>
                        
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="my-1 border-2 border-gray-300 rounded focus-visible:ring-offset-0 focus-visible:ring-0"
                            />
                        </div>
                        
                        <div>
                            <Label>No of Position</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="my-1 border-2 border-gray-300 rounded focus-visible:ring-offset-0 focus-visible:ring-0"
                            />
                        </div>
                        
                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem key={company._id} value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                    )
                                                })
                                            }

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                        
                    </div>

            {/*//?------------------------------------------------------------------------------------------  */}        
                     
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='w-4 h-4 mr-2 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Post New Job</Button>
                    }
                    
                    {
                        companies.length === 0 && <p className='my-3 text-xs font-bold text-center text-red-600'>*Please register a company first, before posting a jobs</p>
                    }
                    
                </form>
            </div>
            
        {/*//&------------------------------------------------------------------------------------------  */}  
          
        </>
    )
}

export default PostJob