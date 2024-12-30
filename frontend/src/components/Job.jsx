
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import { toast } from 'sonner'

// &--------------------------------------------------done---------------------------------------------

const Job = ({job}) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => { //* --> it's used to calculate the days ago from the mongodb time.
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

    const BookmarkFunction = () => {
        // alert("You have bookmarked this job");
        toast.info("🚀 You have bookmarked this job", { duration: 3000 });
    }

    const SaveForLaterFunction = () => {
        toast.info("🚀 You have saved this job for later🤯🤯🤯 ", { duration: 3000 });
    }


    
    return (

        <>
            <div className="p-4 mt-10 border border-orange-500 rounded-lg shadow shadow-2xl">

            <div className="flex items-center justify-between">
                <p> { daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago `}  </p>
                <Button onClick={BookmarkFunction} variant="outline" className="bg-gray-300 rounded-full" size="icon"> <Bookmark/> </Button>
            </div>

                <div className='flex items-center gap-2 my-2'>
                    <Button className="p-6" variant="outline" size="icon">
                        <Avatar>
                            <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                    </Button>
                    <div>
                        <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
                        <p className='text-sm text-gray-500'>{job?.company?.location}</p>
                    </div>
                </div>

                <div>
                    <h1 className='my-2 text-lg font-bold'>{job?.title}</h1>
                    <p className='text-sm text-gray-600'>{job?.description}</p>
                </div>

                <div className='flex items-center gap-2 mt-4'>
                        <Badge className={"mr-2  bg-blue-100"} variant="ghost"> {job?.position} Position</Badge>
                        <Badge className={"mr-2 text-red-800 bg-[#F83002]/10"} variant="solid"> {job?.jobType}</Badge>
                        <Badge className={"mr-2  bg-[#7209b7]/10"} variant="ghost"> {job?.salary} LPA</Badge>
                </div>

                <div className="flex items-center gap-4 ">
                        <Button onClick={() => navigate(`/description/${job?._id} `)} variant="outline" className="mt-5 bg-red-500 hover:bg-white hover:text-red-500">Details</Button>
                        <Button onClick={SaveForLaterFunction} className="mt-5 bg-blue-500 ">Save for Later</Button>
                </div>

            </div>
         
        </>
    )
};

Job.propTypes = {
    job: PropTypes.object.isRequired, // Specify the type and make it required
  };

export default Job;

/* 
    ^ Q:-<p> { daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago `}  </p>
       --> `${daysAgoFunction(job?.createdAt)} days ago -->-- here why we use `${}` ?
       * A:- here we use template string to insert the value of daysAgoFunction(job?.createdAt) into the string.if we not use template string then we have to use concatenation operator to insert the value of daysAgoFunction(job?.createdAt) into the string.for example we can write like this: --> " " + daysAgoFunction(job?.createdAt) + " days ago " . but it's not a good way to do it. so we use template string to do it.We use ` ` to write the string. AND $ TO INSERT THE VALUE OF VARIABLE INTO THE STRING.

    ^Q: give me reason why and where we use `${}` ?



*/