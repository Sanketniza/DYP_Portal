import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@radix-ui/react-popover";
import { LogOut, User2 } from "lucide-react"; // icon 
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import API from "@/lib/api";
import logo from "@/assets/logo.png";

function Navbar() {
	
	const {user} = useSelector((store) => store.auth); //* --> through the useSelector we can access the user information from the redux store.
	const dispatch = useDispatch();
	const navigate = useNavigate();
	

	const logoutHandler = async () => {

		try{
			//* --> This is used to logout the user.
			const res = await API.get('/user/logout');

				if(res.data.success) {
					dispatch(setUser(null));
					navigate("/login");
					toast.success(res.data.message);
				}
				
		}catch(error){
			console.log(error)
			toast.error(error.response.data.message);
		}
	}
	
return (
		<>
		
			<div className='fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-lg'>
				<div className='flex items-center justify-between h-16 px-5 mx-auto max-w-7xl'>
{/* //&------------------------------------------------------------------------------------------  */}

			<NavLink to="/">
				<div className="flex items-center ">
						<div className="flex ">
								<img  className="w-16 h-16 bg-transparent rounded-md" src={logo} alt="asdf" />
						</div>
					<h1 className="text-3xl font-bold text-zinc-800">
						Student <span className="text-red-500">_Hub</span>{" "}
					</h1>
				</div>
			</NavLink>

{/* //&------------------------------------------------------------------------------------------  */}

				<div className="flex items-center gap-4">
					<ul className="flex items-center space-x-4 font-bold text-zinc-800">
						
						{
							user && user.role === "recruiter" ? 
								(
									<>
										<li className="hover:underline "> <NavLink to="/admin/companies">Companies</NavLink></li>
										<li className="hover:underline "> <NavLink to="/admin/jobs">Job</NavLink></li>
									</>
								) 
							:
								(
									<>
										<li className="hover:underline "> <NavLink to="/">Home</NavLink></li>
										<li className="hover:underline "> <NavLink to="/jobs">Job</NavLink></li>
										<li className="hover:underline "> <NavLink to="/browse">Browser</NavLink></li>
									</>
								)
						}	
					</ul>
							
							{
								!user ? (
									
									<div className="flex items-center gap-4">
										<NavLink to="/login"><Button variant="outline" className="">LogIn</Button></NavLink>
										<NavLink to="/signup"><Button className="bg-red-500">Signup</Button></NavLink>
									</div>
										
								) : (
									<Popover >
									<PopoverTrigger asChild > 
										<Avatar className="mx-5 shadow cursor-pointer ">
											<AvatarImage className="w-10 h-10 rounded-full "
												src={user?.profile?.profilephoto}
												alt="User Profile photo"/>
										</Avatar>
									</PopoverTrigger>
									
									<PopoverContent className="max-w-xs p-4 mt-2 border rounded shadow shadow-2xl border-emerald-500 ">
										
										{/* //&------------------------------------------------------------------------------------------  */}

										<div className="flex items-center gap-4 ml-5 space-y-2">
											<Avatar className="cursor-pointer">
												<AvatarImage className="max-w-[55px] max-h-[] rounded-full "
														src={user?.profile?.profilephoto}
														alt="User Profile photo"/>
											</Avatar>
										
										<div>  
											<h4 className="text-lg font-bold text-amber-700 "> { user?.fullname} </h4>
											<p className="text-sm text-zinc-900"> {user?.profile?.bio} </p>
										</div>
									</div> 
									
								{/* //&------------------------------------------------------------------------------------------  */}
										
										<div className="flex flex-col mx-5 mt-2 text-gray-700">

											{
												user && user.role === "student" && (
													<>
														<div className="flex items-center gap-2 cursor-pointer w-fit">
															< User2/>
															<Button variant="outline_none" className="hover:underline"> <NavLink to="/profile"> View Profile </NavLink></Button>
														</div>
													</>
												)
											}

											<div className="flex items-center gap-2 cursor-pointer w-fit">
												<LogOut/>
												<Button onClick={logoutHandler}  variant="outline_none" className="hover:underline"> Logout </Button> 
											</div>
											
										</div>
										
										{/* //&------------------------------------------------------------------------------------------  */}
									
											
										 </PopoverContent>
								  </Popover> 
								)
								
							}
			
				</div>

				{/* //&------------------------------------------------------------------------------------------  */}
				
			</div>
			</div>
			{/* Add a spacer div to prevent content from going under the navbar */}
			<div className="h-16"></div>
		</>
	);
}

export default Navbar;

/* 
	^ const  {user} = useSelector((store) => store.auth); --> Which information is stored in the user.
	 --> dispatch(setUser(null)); --> This is used to set the user to null.
	 --> navigate("/login"); --> This is used to navigate to the login page.
	 --> toast.success(res.data.message); --> This is used to show the success message.
	 --> toast.error(error.response.data.message); --> This is used to show the error message.


	
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
  

*/
