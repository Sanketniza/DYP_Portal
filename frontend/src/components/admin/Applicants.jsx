import { useEffect, useCallback } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { toast } from 'sonner';
import API from '@/lib/api';

const Applicants = () => {
    
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    const fetchAllApplicants = useCallback(async () => {
        
        try {
            
            const res = await API.get(`/application/${params.id}/applicants`);
            
            dispatch(setAllApplicants(res.data.job)); // Updates the Redux state with the current applicants
        } catch (error) {
            
            toast.error(error.response?.data?.message || "Failed to fetch applicants");
            console.error(error);
        }
        
    }, [params.id, dispatch]);

    useEffect(() => {
        
        fetchAllApplicants(); // Fetch applicants on component load
        
    }, [fetchAllApplicants]); // Adding fetchAllApplicants as a dependency

    const handleDeleteApplicant = async (applicantId) => {
        
        try {
            const res = await API.delete(`/application/${params.id}/applicants/${applicantId}`);

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
            <div className="mx-auto my-[50px] max-w-7xl p-4 border border-teal-400 rounded-lg shadow-2xl">
                <h1 className="my-5 text-xl font-bold">
                    Applicants ({applicants?.applications?.filter(app => app?.applicant).length || 0})
                </h1>
                <ApplicantsTable onDeleteApplicant={handleDeleteApplicant} />
            </div>
        </>
    );
};

export default Applicants;
