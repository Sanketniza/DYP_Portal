import { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

// const randomJobs = [1, 2,45];

const Browse = () => {
    
    useGetAllJobs();

    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    
    useEffect(() => {
        return ()=>{  // clean up function , when component unmounts this will be called
            dispatch(setSearchedQuery(""));
        }
    },[])  //[] means it will run only once
    
    return (
        <div>
            <Navbar />
            <div className='mx-auto my-10 max-w-7xl'>
                <h1 className='my-10 text-xl font-bold'>Search Results ({allJobs.length})</h1>
                <motion.div 
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className='grid grid-cols-3 gap-4'
                >
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </motion.div>

            </div>
        </div>
    )
}

export default Browse