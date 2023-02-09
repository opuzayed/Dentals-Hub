import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path:'/',
          element:<Home></Home>,
        },
        {
          path:'/appointment',
          element:<Appointment></Appointment>
        },
        {
          path:'/login',
          element:<Login></Login>,
        },
        {
          path:'/signup',
          element:<SignUp></SignUp>,
        },
      ],
    },
    {
      path:'/dashboard',
      element :<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
      children: [
        {
          path:'/dashboard/myappointment',
          element:<MyAppointment></MyAppointment>
        },
        {
          path: "/dashboard/allusers",
          element:<AllUsers></AllUsers> 
        },
        {
          path: "/dashboard/adddoctor",
          element:<AddDoctor></AddDoctor>
        }
      ]
     
    }
  ]);