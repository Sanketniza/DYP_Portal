//! done


import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import "./App.css";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import { Toaster } from "./components/ui/sonner";
import Jobs from "./components/Jobs";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Browse from "./components/Browse";

// &-----------------------------------------------------------------------------------------------

const appRouter = createBrowserRouter([

  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/jobs",
    element: <Jobs />,
  },

  {
    path:"/description/:id",
    element:  <JobDescription /> ,
  },

  {
    path: "/browse",
    element:  <Browse /> 
  },

  {
    path: "/profile",
    element:<Profile /> 
  },

  // admin routes

  {
    path: "/admin/companies",
    element: <ProtectedRoute> <Companies /> </ProtectedRoute> ,
  },

  {
    path: "/admin/companies/create",
    element: <ProtectedRoute> <CompanyCreate /> </ProtectedRoute>,
  },

  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute> <CompanySetup /></ProtectedRoute> ,
  },

  {
    path: "/admin/jobs",
    element: <ProtectedRoute> <AdminJobs /> </ProtectedRoute>,
  },

  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute> <PostJob /> </ProtectedRoute>,
  },

  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute> <Applicants /> </ProtectedRoute>,
  },
  

]);

// &-----------------------------------------------------------------------------------------------

function App() {
    return (
        <>
          <RouterProvider router={appRouter} />
          <Toaster />

            {/* 

                //* Instead of doing this we can do above like this by creating one array function and passing multiple objects to it of
                but to use react-router-dom we need to cover <App/> in main.jsx with <BrowserRouter> and other in RouterProvider

                    <Routes>
                     //^  <Route path="/" element={"Home"} />
                     //^  <Route path="/login" element={<Login />} />
                     //^  <Route path="/signup" element={<Signup />} />
                     //^  <Route path="/jobs" element={<Jobs />} />
                     //^  <Route path="/description/:id" element={<JobDescription />} />
                     //^  <Route path="/browse" element={<Browse />} />
                     //^  <Route path="/profile" element={<Profile />} />
                     //^  <Route path="/admin/companies" element={<Companies />} />
                     //^  <Route path="/admin/companies/create" element={<CompanyCreate />} />
                     //^  <Route path="/admin/companies/:id" element={<CompanySetup />} />
                     //^  <Route path="/admin/jobs" element={<AdminJobs />} />
                     //^  <Route path="/admin/jobs/create" element={<PostJob />} />
                     //^  <Route path="/admin/jobs/:id/applicants" element={<Applicants />} />
                    </Routes> 
                    
            */}
        </>
    );
}

export default App;