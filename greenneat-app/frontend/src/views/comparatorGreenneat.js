import React, { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import AvatarImage from "../images/PerfilGreenneat.png";
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TableCompGreenneat from '../components/Tables/TableCompGreenneat';
import ComparatorBarChart from '../components/Charts/ComparatorBarChart';
import { mainListItems } from '../components/menus/menuGreenneat';
import { GREENNEAT_TYPE_USER } from '../../env';

const settings = [
  { name: 'Meu Perfil' },
  { ajuda: 'Ajuda #' },
  'divider',
  { sair: 'Sair' },
];  

const drawerWidth = 240;

const defaultTheme = createTheme();

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(0),
        },
      }),
    },
  }),
);

export default function ComparatorGreenneat() {
  
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //obter o usuario dos cookies e verifica o type user 
  let user = document.cookie.split("=")
  user = JSON.parse(user[2])

  if (user.idusertype != GREENNEAT_TYPE_USER)
    return <span> Acesso negado </span>

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', marginBottom: '40px' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{ backgroundColor: '#3B8F5C', height: 72 }} elevation={2}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '15px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <strong><h2>GREENNEAT</h2></strong>
            </Box>
            <IconButton color="white" sx={{ marginLeft: 'auto', borderRadius: '0' }}>
              <Link href='#' sx={{
                textDecoration: 'none',
                '&:visited': {
                  color: 'inherit',
                },
              }}>
                <Typography variant="body2" color="white" fontFamily="'Century Gothic', Futura, sans-serif">
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Abrir configurações">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <img src={AvatarImage} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                      <div style={{ margin: '5px 20px 0px 20px', color: '#0E681D' }}>
                        <strong>
                          Greenneat
                        </strong>
                      </div>
                      <div style={{ margin: '0px 20px 10px 20px', color: 'grey' }}>
                        greenneat@email.com
                      </div>
                    <Divider />
                    {settings.map((setting, index) => (
                    setting === 'divider' ? (
                        <Divider key={index} />
                    ) : (
                      <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center"><Link href='/meu-perfil-Greenneat' sx={{textDecoration: 'none', color: 'inherit'}}>{setting.name}</Link></Typography>
                      <Typography textAlign="center"><Link href='#' sx={{textDecoration: 'none', color: 'inherit'}}>{setting.ajuda}</Link></Typography>
                      <Typography textAlign="center"><Link href='/' sx={{textDecoration: 'none', color: 'inherit'}}>{setting.sair}</Link></Typography>
                      </MenuItem>
                    )
                    ))}
                    </Menu>
                  </Box>
                </Typography>
              </Link>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
              backgroundColor: '#0E681D',
              border: 'none',
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon sx={{ color: 'white' }} />
            </IconButton>
          </Toolbar>
          <Box
            sx={{
              width: drawerWidth,
              height: '91vh',
              overflowY: 'auto',
              backgroundColor: '#0E681D',
              display: open ? 'block' : 'none',
            }}
          >
            <List component="nav" sx={{ display: open ? 'block' : 'none' }}>
              {mainListItems}
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: 'white',
            flexGrow: 1,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
          <Toolbar />
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginBottom: '5px', marginTop: '40px' }}>
            <TableCompGreenneat />
            {/* <ComparatorBarChart /> */}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
