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
import Avatar from '@mui/material/Avatar';
import AvatarImage from "../images/PerfilEstabelecimento.png";
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Title from '../components/Outros/Title';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import SubTitle from '../components/Outros/SubTitle';
import ProfileEstabForm from "../components/Forms/ProfileEstabForm";
import SenhaForm from "../components/Forms/SenhaForm";
import { mainListItems } from '../components/menus/menuSupplier';

const settings = [
  { name: 'Meu Perfil' },
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

export default function MyProfileSupplier() {
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
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
                        <Avatar sx={{ bgcolor: 'white', color: '#0E681D' }}>E</Avatar>
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
                    <div style={{ margin: '5px 20px 0px 20px', color:'#0E681D' }}>
                      <strong>
                        Estabelecimento
                      </strong>
                    </div>
                    <div style={{ margin: '0px 20px 10px 20px', color: 'grey' }}>
											@email.com
										</div>
                    <Divider />
                    {settings.map((setting, index) => (
                    setting === 'divider' ? (
                        <Divider key={index} />
                    ) : (
                        <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center"><Link href='/meu-perfil-estabelecimento' sx={{textDecoration: 'none', color: 'inherit'}}>{setting.name}</Link></Typography>
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
          <Grid container spacing={2} sx={{ marginBottom: '5px', marginTop: '40px', width: '80%' }}>
            <Grid item xs={4}>
              <Paper sx={{ margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100%' }} elevation={2}>
                <Container maxWidth="lg" sx={{ m: 'auto', overflow: 'auto' }}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={AvatarImage} alt="Perfil" height="122px" />
                    <Title>Estabelecimento</Title>
                    <SubTitle>@email.com</SubTitle>
                  </Grid>
                </Container>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper sx={{ margin: '0 auto', display: 'flex', flexDirection: 'column' }} elevation={2}>
                <Container maxWidth="lg" sx={{ m: 'auto', marginBottom: '16px', overflow: 'auto' }}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px" }}>
                    <Grid item xs={6}>
                      <Title>Meu Perfil</Title>
                      <SubTitle>As informações podem ser editadas</SubTitle>
                    </Grid>
                  </Grid>
                  <ProfileEstabForm />
                </Container>
              </Paper>
            </Grid>
          </Grid>
          <Paper sx={{ width: '80%', display: 'flex', flexDirection: 'column', marginTop: '40px', marginBottom: '40px' }} elevation={2}>
            <Container maxWidth="lg" sx={{ m: 'auto', backgroundColor: 'white', borderRadius: 1, marginBottom: '16px', overflow: 'auto' }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px" }}>
                <Grid item xs={6}>
                  <Title>Senha</Title>
                  <SubTitle>A senha pode ser editada</SubTitle>
                </Grid>
              </Grid>
              <SenhaForm />
            </Container>
          </Paper>
          <Grid>.</Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
