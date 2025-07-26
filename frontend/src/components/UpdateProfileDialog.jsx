import  { useState } from 'react'
import PropTypes from "prop-types"; 
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import API from '@/lib/api'


const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        github: user?.profile?.github || "",
        linkedin: user?.profile?.linkedin || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("github", input.github);
        formData.append("linkedin", input.linkedin);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await API.post('/user/profile/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
        console.log(input.skills);
    };



    return (
        
        <>
        
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px] border shadow shadow-2xl border-emerald-500 p-7 rounded-2xl sm:px-6 lg:px-8" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler} className=''>
                        <div className='grid gap-4 py-4'>
                            
                            <div className='grid items-center grid-cols-4 gap-4'>
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid items-center grid-cols-4 gap-4'>
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid items-center grid-cols-4 gap-4'>
                                <Label htmlFor="number" className="text-right">Number</Label>
                                <Input
                                    id="number"
                                    name="number"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid items-center grid-cols-4 gap-4'>
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid items-center grid-cols-4 gap-4'>
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid items-center grid-cols-4 gap-10 space-y-3">
                                    <Label htmlFor="github" className="text-right" >GitHub Id</Label>
                                    <Input
                                        id="github"
                                        type="url"
                                        name="github"
                                        value={input.github}
                                        onChange={changeEventHandler}
                                        className="col-span-3 px-3 py-1 border rounded-md outline outline-offset-2 outline-1" 
                                    />
                                </div>
                                
                                <div className="grid items-center grid-cols-4 gap-10 space-y-3">
                                    <Label htmlFor="linkedin" className="text-right" >LinkedIn</Label>
                                    <Input
                                        id="linkedin"
                                        type="url"
                                        name="linkedin"
                                        value={input.linkedin}
                                        onChange={changeEventHandler}
                                        className="col-span-3 px-3 py-1 border rounded-md outline outline-offset-2 outline-1" 
                                    />
                                </div>

                            
                            <div className='grid items-center grid-cols-4 gap-4'>
                                <Label htmlFor="file" className="text-right">Resume</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"> <Loader2 className='w-4 h-4 mr-2 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
};

// Adding PropTypes for prop validation
UpdateProfileDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
  };

export default UpdateProfileDialog