import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';



const LatestJobCards = ({job}) => {

    const navigate = useNavigate(); //* --> this is used to navigate to the job description page on the basis of job id.this hook is from react-router-dom.
    // todo:- when we click on the job card then we navigate to the job description page on the basis of job id. means when user click on the job card then we navigate to the job description of that particular job.by using that unique job id.

    return (
        
        <div onClick={()=> navigate(`/description/${job?._id}`)} className='p-5 border border-orange-500 rounded shadow-xl cursor-pointer md'>
            
            <div>
                <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.location}</p>
            </div>
            
            <div>
                <h1 className='my-2 text-lg font-bold'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold bg-blue-100'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold bg-[#F83002]/10'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold bg-[#7209b7]/10'} variant="ghost">{job?.salary}LPA</Badge>
            </div>

        </div>
    )
}

LatestJobCards.propTypes = {
    job: PropTypes.object.isRequired, //* --> this is the prop type of the job. it is used to check the job is object and it is required.
};

export default LatestJobCards;

/* 
   ^ Q: - why we not use anchor tag or Link from react-router-dom to navigate to the job description page ?
   * A: - because we want to navigate to the job description page on the basis of job id. means when user click on the job card then we navigate to the job description of that particular job.by using that unique job id.


  ^ When to Use Link
   --> Simple Navigation:
   Use Link when you want to create a straightforward navigation link to another route in your application. It is ideal for navigation menus, buttons, or any clickable text that should lead to a different page.

   --> Preserving SPA Behavior:
   Link automatically prevents the default browser behavior of reloading the page, ensuring that navigation remains within the single-page application (SPA) context. This provides a smoother user experience.

   --> Accessibility:
   Link is inherently accessible, as it behaves like a standard anchor tag. It is focusable and can be navigated using the keyboard, making it a good choice for links.

   --> Styling:
   You can style Link components just like any other React component, allowing for consistent design across your application.

   ^ When to Use Navigate
    --> Programmatic Navigation:
   Use Navigate when you need to redirect users programmatically, such as after a form submission, authentication, or when certain conditions are met.

   --> Conditional Rendering:
   Navigate is useful for conditionally rendering a redirect based on application state. For example, if a user tries to access a protected route without being authenticated, you can redirect them to the login page.

   --> Replacing History:
   Navigate can replace the current entry in the history stack, which is useful when you don’t want users to navigate back to the previous page after a redirect (e.g., after logging in).

   ^ Q:- job?.company?.name --> here why we use ?. operator ?
   * A: - because we are using the *optional chaining* operator to access the company name from the job object. means if the job object has a company property then we access the name property of the company object. if the company property is not present then we will not get an error. we will get undefined. If we not use ?. operator then we will get an error.for example if we not use ?. operator then we will get an error like this: --> TypeError: Cannot read properties of null (reading 'name')

*/