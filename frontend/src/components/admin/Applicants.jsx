import { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { toast } from 'sonner';

const Applicants = () => {
    
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    const fetchAllApplicants = async () => {
        
        try {
            
            const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
                withCredentials: true,
            });
            
            dispatch(setAllApplicants(res.data.job)); // Updates the Redux state with the current applicants
        } catch (error) {
            
            toast.error(error.response?.data?.message || "Failed to fetch applicants");
            console.error(error);
        }
        
    };

    useEffect(() => {
        
        fetchAllApplicants(); // Fetch applicants on component load
        
    }, []); // Empty dependency array ensures this runs only on mount

    const handleDeleteApplicant = async (applicantId) => {
        
        try {
            const res = await axios.delete(`${APPLICATION_API_END_POINT}/${params.id}/applicants/${applicantId}`, {
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                fetchAllApplicants(); // Re-fetch the applicants after deletion
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete applicant");
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="mx-auto my-[50px] max-w-7xl p-4 border border-teal-400 rounded-lg shadow shadow-2xl">
                <h1 className="my-5 text-xl font-bold">
                    Applicants ({applicants?.applications?.filter(app => app?.applicant).length || 0})
                </h1>
                <ApplicantsTable onDeleteApplicant={handleDeleteApplicant} />
            </div>
        </>
    );
};

export default Applicants;
