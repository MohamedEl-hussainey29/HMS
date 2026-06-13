import './App.css'
import { ToastContainer } from 'react-toastify';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './modules/Shared/Layouts/AuthLayout/AuthLayout';
import NotFound from './modules/Shared/NotFound/NotFound';
import Login from './modules/Authentication/Login/Login';
import Register from './modules/Authentication/Register/Register';
import VerifyAccount from './modules/Authentication/VerifyAccount/VerifyAccount';
import ForgetPassword from './modules/Authentication/ForgetPassword/ForgetPassword';
import ResetPassword from './modules/Authentication/ResetPassword/ResetPassword';
import ChangePassword from './modules/Authentication/ChangePassword/ChangePassword';
import AdminLayout from './modules/Shared/Layouts/AdminLayout/AdminLayout';
import Dashboard from './modules/Admin/Dashboard/components/Dashboard';
import RoomsList from './modules/Admin/Rooms/components/RoomsList';
import RoomData from './modules/Admin/Rooms/components/RoomData';
import FacilitiesList from './modules/Admin/Facilities/components/FacilitiesList';
import AdsList from './modules/Admin/Ads/components/AdsList';
import BookingsList from './modules/Admin/Bookings/components/BookingsList';
import UsersList from './modules/Admin/Users/components/UsersList';
import MainLayout from './modules/Shared/Layouts/MainLayout/MainLayout';
import Home from './modules/User/LandingPage/components/Home';
import ExploreRooms from './modules/User/Rooms/components/ExploreRooms/ExploreRooms';
import RoomDetails from './modules/User/Rooms/components/RoomDetails/RoomDetails';
import FavList from './modules/User/Favourites/components/FavList';
import PaymentLayout from './modules/Shared/Layouts/PaymentLayout/PaymentLayout';
import PaymentForm from './modules/User/Payment/components/PaymentForm';
import ProtectedRoutes from './modules/Shared/ProtectedRoutes/ProtectedRoutes';

function App() {
  const routes = createBrowserRouter([
    {
      path: '/auth',
      element: <AuthLayout/>,
      errorElement: <NotFound/>,
      children:[
        {index: true , element: <Login/>},
        {path: 'login' , element: <Login/>},
        {path: 'register' , element: <Register/>},
        {path: 'verify-account' , element: <VerifyAccount/>},
        {path: 'forget-pass' , element: <ForgetPassword/>},
        {path: 'reset-pass' , element: <ResetPassword/>},
        {path: 'change-pass' , element: <ProtectedRoutes><ChangePassword/></ProtectedRoutes>},
      ]
    },{
      path: '/dashboard',
      element: <ProtectedRoutes role='admin'><AdminLayout/></ProtectedRoutes>,
      errorElement: <NotFound/>,
      children:[
        {index: true , element: <Dashboard/>},
        {path: 'rooms' , element: <RoomsList/>},
        {path: 'room-data' , element: <RoomData/>},
        {path: 'facilities' , element: <FacilitiesList/>},
        {path: 'ads' , element: <AdsList/>},
        {path: 'bookings' , element: <BookingsList/>},
        {path: 'users' , element: <UsersList/>},
      ]
    },{
      path: '/',
      element: <MainLayout/>,
      errorElement: <NotFound/>,
      children:[
        {index: true , element: <Home/>},
        {path: 'home' , element: <Home/>},
        {path: 'explore-rooms' , element: <ExploreRooms/>},
        {path: 'room-details/:id' , element: <RoomDetails/>},
        {path: 'favourites' , element: <ProtectedRoutes role='user'><FavList/></ProtectedRoutes>},
      ]
    },{
      path: '/payment',
      element: <ProtectedRoutes role='user'><PaymentLayout/></ProtectedRoutes>,
      errorElement: <NotFound/>,
      children:[
        {index: true , element: <PaymentForm/>},
      ]
    }
  ])
  return (
      <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
      <RouterProvider router={routes}></RouterProvider>
      </>
  )
}

export default App
