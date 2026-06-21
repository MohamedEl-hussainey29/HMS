import { Avatar, Box, Button, CircularProgress, Divider, Grid, IconButton, Menu, Typography, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { AuthAPI } from "../../../api";

import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PublicIcon from '@mui/icons-material/Public';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface ApiUserData {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: number | string;
  country: string;
  role: string;
  profileImage: string;
  verified: boolean;
  createdAt: string;
}

export default function UserNavbar() {
  const auth = useContext(AuthContext);
  const userData = auth?.userData;
  const currentUserId = userData?._id || (userData as any)?.id;

  const isLoggedIn = Boolean(currentUserId);

  const [apiUser, setApiUser] = useState<ApiUserData | null>(null);
  const [apiLoading, setApiLoading] = useState<boolean>(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const uniqueId = React.useId();
  const buttonId = `${uniqueId}-profile-button`;
  const menuId = `${uniqueId}-profile-menu`;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    auth?.setUserData(null);
    handleCloseMenu();
    setMobileOpen(false);
    navigate("/auth");
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!currentUserId) return;
      setApiLoading(true);
      try {
        const response = await AuthAPI.getUserProfile(currentUserId);
        const userDataFromApi = response.data?.data?.user;
        setApiUser(userDataFromApi);
      } catch (error) {
        console.error("Failed to fetch admin data from the API.", error);
      } finally {
        setApiLoading(false);
      }
    };

    fetchAdminData();
  }, [currentUserId]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not Available";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Not Available"
      : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const displayUserName = apiUser?.userName || userData?.userName || "...";
  const displayImage = apiUser?.profileImage || userData?.profileImage || "";
  const displayEmail = apiUser?.email || userData?.email || "No Email";
  const displayPhone = apiUser?.phoneNumber || (userData as any)?.phoneNumber || "No Phone";
  const displayCountry = apiUser?.country || userData?.country || "Global";
  const displayRole = apiUser?.role || userData?.role || "User";

  const userFirstLetter = displayUserName.trim().charAt(0).toUpperCase();

  const blueButtonStyle = {
    backgroundColor: "#365CF5",
    color: "#fff",
    textTransform: "none",
    fontWeight: 500,
    fontSize: "1rem",
    px: 4,
    py: 1,
    borderRadius: "6px",
    boxShadow: "0px 4px 10px rgba(54, 92, 245, 0.25)",
    '&:hover': {
      backgroundColor: "#244ad3",
    }
  };

  const navLinkStyle = (path: string) => {
    const isActive = currentPath === path;
    return {
      color: isActive ? "#365CF5" : "#333",
      textTransform: "none",
      fontWeight: isActive ? 600 : 400,
      fontSize: "1rem",
      mx: 1,
      '&:hover': {
        color: "#365CF5",
        backgroundColor: "transparent"
      }
    };
  };

  const renderProfileCardContent = (isMobileView = false) => {
    if (apiLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5, width: '100%' }}>
          <CircularProgress size={30} sx={{ color: '#1565c0' }} />
        </Box>
      );
    }

    return (
      <Box sx={{ display: 'flex', flexDirection: isMobileView ? 'column' : 'row', width: '100%' }}>
        <Box
          sx={{
            width: isMobileView ? '100%' : 150,
            display: 'flex',
            flexDirection: isMobileView ? 'row' : 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: isMobileView ? 2 : 3,
            px: 2,
            position: 'relative',
            background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)'
          }}
        >
          <Box sx={{ position: 'absolute', top: 12, left: 12, width: 10, height: 10, borderRadius: '50%', backgroundColor: '#00e676', boxShadow: '0 0 8px #00e676' }} />
          <Typography variant="subtitle2" sx={{ color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.18)', px: 1.8, py: 0.4, borderRadius: '12px', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            {displayRole}
          </Typography>
          <Box sx={{ p: 0.5, borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.15)', display: 'inline-flex', my: isMobileView ? 0 : 2 }}>
            <Avatar src={displayImage || undefined} alt={displayUserName} sx={{ width: isMobileView ? 60 : 90, height: isMobileView ? 60 : 90, border: '2px solid #ffffff', bgcolor: '#0f91dc', color: '#fff', fontSize: isMobileView ? '1.5rem' : '2.5rem' }}>
              {userFirstLetter}
            </Avatar>
          </Box>
          <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.75)', fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.5px' }}>
            VERIFIED
          </Typography>
        </Box>

        <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#ffffff' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0d47a1', mb: 0.5, fontSize: '1.2rem' }}>
              {displayUserName}
            </Typography>
            <Typography variant="caption" sx={{ color: '#888888', display: 'block', mb: 1.5 }}>
              Management Account
            </Typography>
            <Divider sx={{ mb: 2, backgroundColor: '#f0f2f5' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <EmailIcon sx={{ color: '#1565c0', fontSize: '1.15rem' }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#9e9e9e', display: 'block', lineHeight: 1 }}>Email Address</Typography>
                  <Typography variant="body2" sx={{ color: '#2c3e50', fontWeight: 600, fontSize: '0.85rem' }}>{displayEmail}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PhoneAndroidIcon sx={{ color: '#1565c0', fontSize: '1.15rem' }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#9e9e9e', display: 'block', lineHeight: 1 }}>Phone Number</Typography>
                  <Typography variant="body2" sx={{ color: '#2c3e50', fontWeight: 600, fontSize: '0.85rem' }}>{displayPhone}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PublicIcon sx={{ color: '#1565c0', fontSize: '1.15rem' }} />
                <Box>
                  <Typography variant="caption" sx={{ color: '#9e9e9e', display: 'block', lineHeight: 1 }}>Country</Typography>
                  <Typography variant="body2" sx={{ color: '#2c3e50', fontWeight: 600, fontSize: '0.85rem', textTransform: 'capitalize' }}>{displayCountry}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {!isMobileView && (
            <Button fullWidth color="error" onClick={logout} sx={{ textTransform: 'none', justifyContent: 'left', py: 1, mt: 2 }}>
              Logout
            </Button>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Typography variant="caption" sx={{ color: '#9e9e9e', fontWeight: 500, fontSize: '0.75rem' }}>
              Joined: {formatDate(apiUser?.createdAt)}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2, px: { xs: 2, md: 6 }, backgroundColor: '#fff' }}>

        <Typography variant="h5" sx={{ fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate("/")}>
          <Box component="span" sx={{ color: "#365CF5" }}>Stay</Box>
          <Box component="span" sx={{ color: "#000" }}>cation.</Box>
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2, ml: 'auto', mr: 3 }}>
          <Button sx={navLinkStyle("/")} onClick={() => navigate("/")}>Home</Button>
          <Button sx={navLinkStyle("/explore-rooms")} onClick={() => navigate("/explore-rooms")}>Explore</Button>
          {isLoggedIn && (
            <>
              <Button sx={navLinkStyle("/#")} onClick={() => navigate("/#")}>Reviews</Button>
              <Button sx={navLinkStyle("/favourites")} onClick={() => navigate("/favourites")}>Favorites</Button>
            </>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {!isLoggedIn ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" sx={blueButtonStyle} onClick={() => navigate("/auth/register")}>Register</Button>
                <Button variant="contained" sx={blueButtonStyle} onClick={() => navigate("/auth/login")}>Login Now</Button>
              </Box>
            ) : (
              <Box id={buttonId} onClick={handleOpenMenu} role="button" tabIndex={0} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', borderRadius: '8px', p: 0.5 }}>
                <Avatar src={displayImage || undefined} alt={displayUserName} sx={{ width: 40, height: 40, mr: 1, bgcolor: '#365CF5', color: '#fff' }}>
                  {userFirstLetter}
                </Avatar>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#333' }}>{displayUserName}</Typography>
                <KeyboardArrowDownIcon sx={{ color: '#6c757d', ml: 0.5 }} />
              </Box>
            )}
          </Box>

          <Menu
            id={menuId}
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleCloseMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{ paper: { elevation: 4, sx: { borderRadius: '16px', mt: 1.5, overflow: 'hidden', p: 0, width: 460 } } }}
          >
            {renderProfileCardContent(false)}
          </Menu>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' }, color: '#333' }}
          >
            {isLoggedIn ? (
              <Avatar src={displayImage || undefined} sx={{ width: 32, height: 32, border: '1px solid #365CF5' }}>{userFirstLetter}</Avatar>
            ) : (
              <MenuIcon sx={{ fontSize: '1.5rem' }} />
            )}
          </IconButton>

          {isLoggedIn && (
            <IconButton sx={{ color: '#212529' }}>
              <NotificationsIcon sx={{ fontSize: '1.25rem' }} />
            </IconButton>
          )}

        </Box>
      </Grid>
      <Divider />

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        slotProps={{ paper: { sx: { width: { xs: 300, sm: 360 }, backgroundColor: '#fff', p: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } } }}
      >
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              <Box component="span" sx={{ color: "#365CF5" }}>Stay</Box>cation.
            </Typography>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />

          {isLoggedIn && (
            <Box sx={{ borderBottom: '1px solid #f0f2f5', overflow: 'hidden' }}>
              {renderProfileCardContent(true)}
            </Box>
          )}

          <List sx={{ p: 2 }}>
            {[
              { label: "Home", path: "/" },
              { label: "Explore Rooms", path: "/explore-rooms" },
              ...(isLoggedIn ? [
                { label: "My Reviews", path: "/reviews" },
                { label: "Favorites", path: "/favourites" }
              ] : [])
            ].map((item) => {
              const isActive = currentPath === item.path;
              return (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    onClick={() => { navigate(item.path); handleDrawerToggle(); }}
                    sx={{
                      borderRadius: '8px',
                      mb: 0.5,
                      backgroundColor: isActive ? 'rgba(54, 92, 245, 0.08)' : 'transparent',
                      color: isActive ? '#365CF5' : '#333'
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontWeight: isActive ? 600 : 500 }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Box sx={{ p: 2 }}>
          {isLoggedIn ? (
            <Button variant="contained" color="error" fullWidth onClick={logout} sx={{ textTransform: 'none', py: 1.2, fontWeight: 600, borderRadius: '8px' }}>
              Logout From Account
            </Button>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Button variant="contained" sx={blueButtonStyle} fullWidth onClick={() => { navigate("/auth/register"); handleDrawerToggle(); }}>Register</Button>
              <Button variant="outlined" sx={{ color: '#365CF5', borderColor: '#365CF5', textTransform: 'none', py: 1 }} fullWidth onClick={() => { navigate("/auth/login"); handleDrawerToggle(); }}>Login Now</Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
}