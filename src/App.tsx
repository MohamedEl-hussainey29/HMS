import './App.css'
import { lazy, Suspense, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoutes from './modules/Shared/ProtectedRoutes/ProtectedRoutes';

const ToastContainer = lazy(() =>
  import('react-toastify').then(({ ToastContainer }) => ({ default: ToastContainer })),
);

const AuthLayout = lazy(() => import('./modules/Shared/Layouts/AuthLayout/AuthLayout'));
const NotFound = lazy(() => import('./modules/Shared/NotFound/NotFound'));
const Login = lazy(() => import('./modules/Authentication/Login/Login'));
const Register = lazy(() => import('./modules/Authentication/Register/Register'));
const VerifyAccount = lazy(() => import('./modules/Authentication/VerifyAccount/VerifyAccount'));
const ForgetPassword = lazy(() => import('./modules/Authentication/ForgetPassword/ForgetPassword'));
const ResetPassword = lazy(() => import('./modules/Authentication/ResetPassword/ResetPassword'));
const ChangePassword = lazy(() => import('./modules/Authentication/ChangePassword/ChangePassword'));
const AdminLayout = lazy(() => import('./modules/Shared/Layouts/AdminLayout/AdminLayout'));
const Dashboard = lazy(() => import('./modules/Admin/Dashboard/components/Dashboard'));
const RoomsList = lazy(() => import('./modules/Admin/Rooms/components/RoomsList'));
const RoomData = lazy(() => import('./modules/Admin/Rooms/components/RoomData'));
const FacilitiesList = lazy(() => import('./modules/Admin/Facilities/components/FacilitiesList'));
const AdsList = lazy(() => import('./modules/Admin/Ads/components/AdsList'));
const BookingsList = lazy(() => import('./modules/Admin/Bookings/components/BookingsList'));
const UsersList = lazy(() => import('./modules/Admin/Users/components/UsersList'));
const MainLayout = lazy(() => import('./modules/Shared/Layouts/MainLayout/MainLayout'));
const Home = lazy(() => import('./modules/User/LandingPage/components/Home'));
const ExploreRooms = lazy(() => import('./modules/User/Rooms/components/ExploreRooms/ExploreRooms'));
const RoomDetails = lazy(() => import('./modules/User/Rooms/components/RoomDetails/RoomDetails'));
const FavList = lazy(() => import('./modules/User/Favourites/components/FavList'));
const PaymentLayout = lazy(() => import('./modules/Shared/Layouts/PaymentLayout/PaymentLayout'));
const PaymentForm = lazy(() => import('./modules/User/Payment/components/PaymentForm'));

function App() {
  const [showToastContainer, setShowToastContainer] = useState(false);

  useEffect(() => {
    // Toasts are queued by react-toastify until its container mounts.
    const timeoutId = window.setTimeout(() => setShowToastContainer(true), 1200);
    return () => window.clearTimeout(timeoutId);
  }, []);

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
        {path: 'room-data/:id' , element: <RoomData/>},
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
      path: '/payment/:bookingId',
      element: <ProtectedRoutes role='user'><PaymentLayout/></ProtectedRoutes>,
      errorElement: <NotFound/>,
      children:[
        {index: true , element: <PaymentForm/>},
      ]
    }
  ])
  return (
      <>
      
      {showToastContainer && (
        <Suspense fallback={null}>
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
        </Suspense>
      )}
      <Suspense fallback={<div aria-busy="true" />}>
        <RouterProvider router={routes} />
      </Suspense>
      </>
  )
}

export default App
