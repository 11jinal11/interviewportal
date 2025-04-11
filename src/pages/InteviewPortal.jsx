
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const InteviewPortal = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const location = useLocation(); // ✅ Add this

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const list = [
    { name: 'Dashboard', path: '/dashboard', icon: <SpaceDashboardIcon /> },
    { name: 'Category', path: '/categary', icon: <CategoryIcon /> },
    { name: 'SubCategory', path: '/subcategory', icon: <ControlPointDuplicateIcon /> },
    { name: 'Q&A', path: '/qa', icon: <HelpOutlineIcon /> },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ color: 'white', background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 200%)', padding: '5px' }}>
        <Typography variant="h6" noWrap component="div">
          𝐈𝐧𝐭𝐞𝐫𝐯𝐢𝐞𝐰 𝐏𝐨𝐫𝐭𝐚𝐥
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {list.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.name} to={item.path} style={{ textDecoration: 'none' }}>
              <ListItem disablePadding>
                <ListItemButton
                  selected={isActive}
                  sx={{
                    backgroundColor: isActive ? '' : 'inherit',
                    '&.Mui-selected': {
                      backgroundColor: '#1899DC  ',
                      color: 'white',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: '#1899DC',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? 'white' : '#0288d1' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} 
                  sx={{
                    color: isActive ? "white" : "#0D90D6",
                  }}/>
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ fontSize: '16px' }} variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          <MeetingRoomIcon />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

InteviewPortal.propTypes = {
  window: PropTypes.func,
};

export default InteviewPortal;


  