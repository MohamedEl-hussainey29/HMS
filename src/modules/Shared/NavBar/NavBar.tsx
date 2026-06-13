import React, { useContext, useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton, Avatar, Menu, Divider, CircularProgress } from '@mui/material';
import { AuthContext } from "../../../context/AuthContext";
import { AuthAPI } from '../../../api';

import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PublicIcon from '@mui/icons-material/Public';

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

export default function NavBar() {
  const auth = useContext(AuthContext);
  const userData = auth?.userData;

  const currentUserId = userData?._id || (userData as any)?.id;

  const [apiUser, setApiUser] = useState<ApiUserData | null>(null);
  const [apiLoading, setApiLoading] = useState<boolean>(false);

  const uniqueId = React.useId();
  const buttonId = `${uniqueId}-profile-button`;
  const menuId = `${uniqueId}-profile-menu`;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!currentUserId) return;

      setApiLoading(true);
      try {
        const response = await AuthAPI.getProfile(currentUserId);

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

  const displayUserName = apiUser?.userName || userData?.userName || "Loading...";
  const displayEmail = apiUser?.email || userData?.email || "No Email";
  const displayPhone = apiUser?.phoneNumber || (userData as any)?.phoneNumber || "No Phone";
  const displayCountry = apiUser?.country || userData?.country || "Global";
  const displayRole = apiUser?.role || userData?.role || "User";
  const displayImage = apiUser?.profileImage || userData?.profileImage || "";

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#f8f9fa',
        color: '#212529',
        borderRadius: '12px',
        my: 2,
        mx: 2,
        width: 'calc(100% - 32px)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

          <Box
            id={buttonId}
            aria-controls={isMenuOpen ? menuId : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
            onClick={handleOpenMenu}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenMenu(e as any); }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              borderRadius: '8px',
              p: 0.5,
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
            }}
          >
            <Avatar
              src={displayImage || undefined}
              alt={displayUserName}
              sx={{ width: 40, height: 40, mx: 1.5, bgcolor: '#0f91dc', color: '#fff' }}
            >
              {displayUserName.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body1" sx={{ fontSize: '1.25rem', fontWeight: 400 }}>
              {displayUserName}
            </Typography>
            <KeyboardArrowDownIcon sx={{ color: '#6c757d', ml: 1 }} />
          </Box>

          <Menu
            id={menuId}
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleCloseMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
              paper: {
                elevation: 4,
                sx: {
                  borderRadius: '16px',
                  mt: 1.5,
                  overflow: 'hidden',
                  p: 0,
                  width: 460,
                  maxWidth: '100%',
                  boxShadow: '0 8px 24px rgba(21, 101, 192, 0.15)',
                }
              }
            }}
          >
            {apiLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5, width: 400 }}>
                <CircularProgress size={30} sx={{ color: '#1565c0' }} />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', width: '100%' }}>

                <Box
                  sx={{
                    width: 150,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 3,
                    px: 1.5,
                    position: 'relative',
                    background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)'
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: '#00e676',
                      boxShadow: '0 0 8px #00e676',
                    }}
                  />

                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: '#ffffff',
                      backgroundColor: 'rgba(255, 255, 255, 0.18)',
                      px: 1.8,
                      py: 0.4,
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      letterSpacing: '0.8px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {displayRole}
                  </Typography>

                  <Box sx={{ p: 0.5, borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.15)', display: 'inline-flex' }}>
                    <Avatar
                      src={displayImage || undefined}
                      alt={displayUserName}
                      sx={{
                        width: 90,
                        height: 90,
                        border: '2px solid #ffffff',
                        bgcolor: '#0f91dc', 
                        color: '#fff',
                        fontSize: '2.5rem' 
                      }}
                    >
                      {displayUserName.charAt(1).toUpperCase()}
                    </Avatar>
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.75)',
                      fontWeight: 600,
                      fontSize: '0.65rem',
                      letterSpacing: '0.5px'
                    }}
                  >
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

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Typography variant="caption" sx={{ color: '#9e9e9e', fontWeight: 500, fontSize: '0.75rem' }}>
                      Joined: {formatDate(apiUser?.createdAt)}
                    </Typography>
                  </Box>
                </Box>

              </Box>
            )}
          </Menu>

          <IconButton sx={{ color: '#212529' }}>
            <NotificationsIcon sx={{ fontSize: '1.25rem' }} />
          </IconButton>

        </Box>
      </Toolbar>
    </AppBar>
  );
}