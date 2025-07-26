import { setSingleCompany } from '@/redux/companySlice'
import API from '@/lib/api'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {

    const dispatch = useDispatch();

    useEffect(()=>{

        const fetchSingleCompany = async () => {

            try {

                const res = await API.get(`/company/get/${companyId}`);

                // console.log(res.data.company);

                if(res.data.success){
                    
                    dispatch(setSingleCompany(res.data.company)); // -> sets the data of the single company in the redux store to be used in the SingleCompany component or other components. for example: if you want to show the data of the single company in the SingleCompany component then you can use the data from the redux store.
                    // console.log(res.data.company); // -> gives the data of the single company in the database which is created by the admin.
                    // example of res.data.company: {
                    //     _id: '666666666666666666666666',
                    //     name: 'Google',
                    //     description: 'Google is a multinational technology company that specializes in internet-related services and products.',
                    //     location: 'Mountain View, California, USA',
                    //     website: 'https://www.google.com',
                    //     logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
                    //     jobs: [],
                    //     __v: 0
                    // }
                }

            } catch (error) {
                console.log(error);
            }
        }

        fetchSingleCompany();

    },[companyId, dispatch]) // [companyId, dispatch] means it will run only when the companyId or dispatch is changed , if you want to run the useEffect again you can pass the dependency array in the useEffect hook
}

export default useGetCompanyById;