import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemButton,
  useMediaQuery, 
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import BillboardIcon from '@mui/icons-material/ViewQuilt';
import ContactIcon from '@mui/icons-material/ContactSupport';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon fontSize="small" /> },
    { text: 'Billboards', path: '/billboards', icon: <BillboardIcon fontSize="small" /> },
    { text: 'Contact', path: '/contact', icon: <ContactIcon fontSize="small" /> },
  ];

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
          <Box component="span" sx={{ color: 'primary.main' }}>Bill A</Box>
          <Box component="span" sx={{ color: 'secondary.main' }}>Board</Box>
          <Box component="span" sx={{ color: 'success.main', ml: 0.5 }}>$</Box>
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={isActive(item.path)}
              sx={{ 
                borderRadius: 1,
                mx: 1,
                mb: 1,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(45, 55, 72, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(45, 55, 72, 0.12)',
                  },
                },
              }}
            >
              <Box sx={{ mr: 2, color: isActive(item.path) ? 'primary.main' : 'text.secondary' }}>
                {item.icon}
              </Box>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: isActive(item.path) ? 600 : 400,
                  color: isActive(item.path) ? 'primary.main' : 'text.primary',
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'rgba(0,0,0,0.06)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 1 }}>
          {isMobile && (
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box component="span" sx={{ color: 'primary.main' }}>Bill A</Box>
            <Box component="span" sx={{ color: 'secondary.main' }}>Board</Box>
            <Box component="span" sx={{ color: 'success.main', ml: 0.5 }}>$</Box>
          </Typography>
          
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    mx: 1,
                    color: isActive(item.path) ? 'primary.main' : 'text.secondary',
                    fontWeight: isActive(item.path) ? 600 : 400,
                    position: 'relative',
                    '&:after': isActive(item.path) ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '10%',
                      width: '80%',
                      height: '3px',
                      backgroundColor: 'primary.main',
                      borderRadius: '1.5px',
                    } : {},
                    '&:hover': {
                      backgroundColor: 'rgba(45, 55, 72, 0.04)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <IconButton 
              color="primary" 
              sx={{ mr: 1 }}
              aria-label="notifications"
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="primary"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 200,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          },
        }}
      >
        <MenuItem component={RouterLink} to="/dashboard" onClick={handleMenuClose}>
          <DashboardIcon fontSize="small" sx={{ mr: 2, color: 'text.secondary' }} />
          Dashboard
        </MenuItem>
        <MenuItem component={RouterLink} to="/profile" onClick={handleMenuClose}>
          <AccountCircleIcon fontSize="small" sx={{ mr: 2, color: 'text.secondary' }} />
          Profile
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleMenuClose}>
          <LogoutIcon fontSize="small" sx={{ mr: 2, color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
      
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            borderRadius: '0 8px 8px 0',
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 