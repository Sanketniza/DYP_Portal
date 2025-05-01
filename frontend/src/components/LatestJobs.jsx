
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { motion } from 'framer-motion';

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {

    const {allJobs} = useSelector(store=>store.job);
    console.log("all jobs are : " , allJobs);
    // todo:- from above statement we can access the allJobs from the redux store or we can say that we can access the allJobs from the job slice or the job is created in database.That all jobs are stored in the redux store. and we can access the allJobs from the redux store using the useSelector hook in this component.
   
    return (

        <div className='p-10 mx-auto my-20 border rounded-lg shadow shadow-2xl border-emerald-500 max-w-7xl'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top </span> Job Openings</h1>
            <motion.div
                 initial={{ opacity: 0, x: 100 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -100 }}
                 transition={{ duration: 0.3 }}
                 className='grid grid-cols-3 gap-4 my-5 '
             >
                {
                    allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,allJobs.length).map((job) => <LatestJobCards key={job._id} job={job}/>)
                }
            </motion.div>
        </div>

    )
}

export default LatestJobs;


/* 
   ^ <LatestJobCards key={job._id} job={job}/> --> this is the LatestJobCards component which is used to display the latest jobs.
      key={job._id} --> this is the key of the job. How it works ?
         --> when we use the key in the component then it is used to identify the component. means when we use the key in the component then it is used to identify the component.
      job={job} --> this is the job information. It's a prop. and it's used to pass the job information to the LatestJobCards component.

*/