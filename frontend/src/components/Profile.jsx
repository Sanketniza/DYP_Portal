import  { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, GitBranchIcon, Linkedin, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "React.js"]

//*---------------------------------------------------DONE----------------------------------------

const isResume = true;

const Profile = () => {
    
    useGetAppliedJobs();

    const [open, setOpen] = useState(false);
    
    const {user} = useSelector(store=>store.auth);

    return (
        <>
            <Navbar />
            
            <div className="max-w-4xl mx-auto mt-5 bg-white border shadow shadow-2xl border-emerald-500 p-7 rounded-2xl sm:px-6 lg:px-8">        
               <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={user?.profile?.profilephoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='text-[24px] font-bold text-amber-700 '>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>

                    <div>
                         <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>    
                    </div>
                    
                </div>

                <hr className='w-full h-1 my-2 bg-stone-600 ' />
                
               {/* //?------------------------------------------------------------------------------------------ */}

               <div className="my-5">
                    <div className="flex items-center gap-2 mt-5 cursor-pointer">
                        <Mail/>
                        <span>{ user?.email }</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-5 cursor-pointer">
                        <Contact/>
                        <span> { user?.phoneNumber }</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-5 cursor-pointer">
                        <Linkedin/>
                        <a href={user?.linkedin}>Linkedin Id</a>
                        {/* <span> {user?.linkedin } </span> */}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-5 cursor-pointer">
                        <GitBranchIcon/>
                        <a href={user?.github}>GitHub Id</a>
                        {/* <span> { user?.github } </span> */}
                    </div>
                    
                </div>

                <hr className='w-full h-1 my-2 bg-gray-400' />

        {/* //?------------------------------------------------------------------------------------------ */}

                
                <div className='my-5'>
                    <h1 className='mb-2 text-lg font-medium'>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>

                        
                
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="font-bold text-md">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='w-full text-blue-500 cursor-pointer hover:underline'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
        {/* //?------------------------------------------------------------------------------------------ */}
 
            </div>
            
            {/* //~------------------------------------------------------------------------------------------ */}
           
           
                       <div className="max-w-4xl mx-auto my-20 bg-white border border-orange-500 shadow shadow-2xl p-7 rounded-2xl">
                               <h1 className="px-4 text-xl font-medium text-zinc-800">Applied Jobs</h1>
                               
                               <AppliedJobTable />
                       </div>
                           
            {/* //~------------------------------------------------------------------------------------------ */}
                               
                    <UpdateProfileDialog open={open} setOpen={setOpen} />
        </>
    )
};

export default Profile;