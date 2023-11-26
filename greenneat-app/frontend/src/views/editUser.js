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
import LinkMui from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Title from '../components/Outros/Title';
import SubTitle from '../components/Outros/SubTitle';
import Container from '@mui/material/Container';
import ProfileGreenForm from "../components/Forms/ProfileGreenForm";
import SenhaForm from "../components/Forms/SenhaForm";
import { mainListItems } from '../components/menus/menuGreenneat';
import AvatarImage from "../images/PerfilGreenneat.png";
import ProfileCoopForm from '../components/Forms/ProfileCoopForm';
import ProfileEstabForm from '../components/Forms/ProfileEstabForm';
import EditUserForm from '../components/Forms/EditUserForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

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

export default function EditUser() {
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <strong><h2>GREENNEAT</h2></strong>
            </Box>
            <IconButton color="white" sx={{ marginLeft: 'auto', borderRadius: '0' }}>
              <LinkMui href='#' sx={{
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
                            <Typography textAlign="center"><LinkMui href='/meu-perfil-Greenneat' sx={{ textDecoration: 'none', color: 'inherit' }}>{setting.name}</LinkMui></Typography>
                            <Typography textAlign="center"><LinkMui href='/' sx={{ textDecoration: 'none', color: 'inherit' }}>{setting.sair}</LinkMui></Typography>
                          </MenuItem>
                        )
                      ))}
                    </Menu>
                  </Box>
                </Typography>
              </LinkMui>
            </IconButton>
          </Toolbar>
        </AppBar>
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
                    <Title>Nome do Usuário</Title>
                    <SubTitle>Tipo de Usuário</SubTitle>
                  </Grid>
                </Container>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper sx={{ margin: '0 auto', display: 'flex', flexDirection: 'column' }} elevation={2}>
                <Container maxWidth="lg" sx={{ m: 'auto', marginBottom: '16px', overflow: 'auto' }}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: "20px" }}>
                    <Grid item xs={6}>
                      <Link to="/usuarios-Greenneat">
                        <ArrowBackIcon style={{ color: '#3B8F5C', height: '1rem' }} />
                      </Link>
                      <Title>Editar Usuário</Title>
                      <SubTitle>Edite as informações do usuário</SubTitle>
                    </Grid>
                  </Grid>
                  <EditUserForm />
                </Container>
              </Paper>
            </Grid>
          </Grid>
          <Grid>.</Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
