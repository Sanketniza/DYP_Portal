
import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

//^ -------------------------------------------DONE--------------------------------------------------

const Companies = () => {
    
    useGetAllCompanies();
    
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        
        dispatch(setSearchCompanyByText(input));
        
    },[input]);  // [input] means it will run only when the input value is changed , if you want to run the useEffect again you can pass the dependency array in the useEffect hook

    return (
        <div className='mx-5'>
             <Navbar />

            <div className="max-w-4xl p-10 mx-auto my-10 border rounded-lg shadow shadow-2xl border-emerald-500 sm:px-6 lg:px-8">
 
        {/* //?&------------------------------------------------------------------------------------------ */}
 
            <div className="flex items-center justify-between gap-4 mx-5">
                <Input
                    className="border-2 border-[#1982c4] rounded shadow shadow-xl outline-none w-fit"
                    placeholder="filter by name"
                    onChange={(e)=>setInput(e.target.value)}
                />
                <Button onClick={() => navigate("/admin/companies/create")} > New Company </Button>
            </div>
            
        {/* //?------------------------------------------------------------------------------------------ */}
        
            <div className="mx-5 my-5">
                <CompaniesTable/>
            </div>
            
        {/* //?------------------------------------------------------------------------------------------ */}
        
        {/* //?&------------------------------------------------------------------------------------------ */}          
  
              </div>
        
        </div>
    )
};

export default Companies;