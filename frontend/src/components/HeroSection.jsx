
import  { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

// ^ -------------------------------------------DONE----------------------------------------------------

const HeroSection = () => {
    
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium border border-red-600 bg-red-100'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs...</span></h1>
                <p> Find your dream job with us and get your dream job.</p>
                
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto border border-gray-500 hover:border-orange-500'>

                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='w-full border-none outline-none bg-transparent '

                    />
                    
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='w-5 h-5' />
                    </Button>
                    
                </div>
                
            </div>
        </div>
    )
};

export default HeroSection;