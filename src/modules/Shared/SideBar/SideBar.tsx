import { useContext, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Box, IconButton, Stack, useMediaQuery } from '@mui/material'; // استوردنا الـ Stack هنا
import AuthContext from '../Layouts/AuthLayout/AuthLayout';

// MUI Icons
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import DomainIcon from '@mui/icons-material/Domain';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);

  const isMobileOrTablet = useMediaQuery('(max-width:900px)');

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    authContext?.setUserData(null);
    navigate("/auth");
  };

  const sidebarColor = "rgba(32, 63, 199, 1)";

  return (
    <Box sx={{
      display: 'flex',
      height: '100vh'
    }}>

      {isMobileOrTablet && (
        <IconButton
          onClick={() => setToggled(!toggled)}
          sx={{
            position: 'absolute',
            top: 15,
            left: 15,
            zIndex: 10,
            backgroundColor: "rgba(26, 27, 30, 0.17)",
            color: '#ffffff',
            '&:hover': { backgroundColor: sidebarColor }
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Sidebar
        collapsed={isCollapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        breakPoint="md"
        backgroundColor={sidebarColor}
        rootStyles={{ border: 'none' }}
      >
        <Stack spacing={1} sx={{ height: '100%', py: 2 }}>
          {!isMobileOrTablet && (
            <Box sx={{
              display: "flex",
              justifyContent: isCollapsed ? 'center' : 'flex-end',
              px: isCollapsed ? 0 : 2,
              mb: 2
            }}>
              <IconButton
                onClick={() => setIsCollapsed(!isCollapsed)}
                sx={{
                  color: '#ffffff',
                  backgroundColor: 'rgba(26, 27, 30, 0.17)',
                  '&:hover': {
                    backgroundColor: 'rgba(26, 27, 30, 0.17)',
                  },

                  width: 35,
                  height: 35,
                }}
              >
                {isCollapsed ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
              </IconButton>

            </Box>
          )}

          <Menu
            menuItemStyles={{
              button: ({ active }) => ({
                color: '#ffffff',
                borderLeft: active ? '3px solid #ffffff' : '3px solid transparent',
                backgroundColor: active ? 'rgba(26, 27, 30, 0.17)' : 'transparent',
                transition: 'all 0.3s ease-in-out',

                '&:hover': {
                  backgroundColor: 'rgba(26, 27, 30, 0.17)',
                  // borderLeft: '3px solid #ffffff',
                  color: '#ffffff',
                  transition: 'all 0.3s ease-in-out',
                },
              }),
              icon: {
                color: '#ffffff',
              }
            }}
          >
            <MenuItem
              icon={<HomeIcon />}
              active={location.pathname === "/dashboard"}
              component={<Link to="/dashboard" />}
              onClick={() => isMobileOrTablet && setToggled(false)}
            >
              Home
            </MenuItem>
            <MenuItem
              icon={<PeopleIcon />}
              active={location.pathname === "/dashboard/users"}
              component={<Link to="/dashboard/users" />}
              onClick={() => isMobileOrTablet && setToggled(false)}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<DashboardIcon />}
              active={location.pathname === "/dashboard/rooms"}
              component={<Link to="/dashboard/rooms" />}
              onClick={() => isMobileOrTablet && setToggled(false)}
            >
              Rooms
            </MenuItem>
            <MenuItem
              icon={<CalendarMonthIcon />}
              active={location.pathname === "/dashboard/ads"}
              component={<Link to="/dashboard/ads" />}
              onClick={() => isMobileOrTablet && setToggled(false)}
            >
              Ads
            </MenuItem>
            <MenuItem
              icon={<ImportContactsIcon />}
              active={location.pathname === "/dashboard/bookings"}
              component={<Link to="/dashboard/bookings" />}
              onClick={() => isMobileOrTablet && setToggled(false)}
            >
              Bookings
            </MenuItem>
            <MenuItem
              icon={<DomainIcon />}
              active={location.pathname === "/dashboard/facilities"}
              component={<Link to="/dashboard/facilities" />}
              onClick={() => isMobileOrTablet && setToggled(false)}
            >
              Facilities
            </MenuItem>
            <MenuItem
              icon={<LockResetIcon />}
              active={location.pathname === "/auth/change-pass"}
              component={<Link to="/auth/change-pass" />}
              onClick={() => isMobileOrTablet && setToggled(false)}
            >
              Change Password
            </MenuItem>
            <MenuItem
              onClick={logout}
              icon={<LogoutIcon />}
            >
              Logout
            </MenuItem>
          </Menu>

        </Stack>
      </Sidebar>
    </Box>
  );
}