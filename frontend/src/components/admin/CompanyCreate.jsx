
import  { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

//*------------------------------------------DONE------------------------------------------------ */

const CompanyCreate = () => {
    
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {

        try {

            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
            
        } catch (error) {
            console.log(error);
        }
    };
    
    return (

        <>
            <Navbar />
            
            <div className='max-w-4xl mx-auto border shadow shadow-2xl border-emerald-500 p-7 rounded-2xl sm:px-6 lg:px-8'>
                
                <div className='my-10'>
                    <h1 className='text-4xl font-bold'>Your Company Name</h1>
                    <p className='text-xl gray-500 text-'>What would you like to give your company name? you can change this later.</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2 border-2 border-orange-400 rounded shadow shadow-xl outline-none"
                    placeholder="Student_Hub, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
                
            </div>
            
        </>
    )
};

export default CompanyCreate;