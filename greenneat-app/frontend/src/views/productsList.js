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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { mainListItems } from '../components/menus/menuPartner';
import ProductCard from '../components/Cards/productCard';

const settings = [
  { name: 'Meu Perfil' },
  { name: 'Ajuda' },
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

//Retangulos
function Media(props) {
  const { loading = false } = props;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} justify="center">
        {(loading ? Array.from(new Array(3)) : []).map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ mx: 3 }}>
            <Box sx={{ width: '100%', my: 2 }}>
              {item ? (
                <img
                  style={{ width: 300, height: 200 }}
                />
              ) : (
                <Skeleton variant="rectangular" width={300} height={200} />
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};
//Fim Retangulos

export default function ListaProdutos() {
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

  //localStorage
  console.log(localStorage.getItem('user'))
  console.log(localStorage.getItem('tipo'))
  console.log(localStorage.getItem('email'))
  console.log(localStorage.getItem('cpf'))
  console.log(localStorage.getItem('cnpj'))

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} sx={{ backgroundColor: '#3B8F5C', height: 72 }} elevation={0}>
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
                        <Avatar sx={{ bgcolor: 'white', color: '#0E681D' }}>PC</Avatar>
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
                      <div style={{ margin: '5px 20px 10px 20px', color: '#0E681D' }}>
                        <strong>
                          Parceiro Cooperativo
                        </strong>
                      </div>
                      <Divider />
                      {settings.map((setting, index) => (
                        setting === 'divider' ? (
                          <Divider key={index} />
                        ) : (
                          <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">{setting.name}</Typography>
                            <Typography textAlign="center"><Link href='/' sx={{ textDecoration: 'none', color: 'inherit' }}>{setting.sair}</Link></Typography>
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
            backgroundColor: '#F6F2C7',
            flexGrow: 1,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'hidden' }}>
            <Grid container spacing={3}> {/* Cria um container de grade */}
              <Grid item xs={4}> {/* Define o tamanho do item na grade */}
                <ProductCard
                  title="Produto à venda"
                  price="30 Moedas Greenneat"
                  image="/caminho/para/a/imagem.jpg"
                  description="Esta é a descrição personalizada do produto."
                  more="Mais descrições para o produto"
                />
              </Grid>
              <Grid item xs={4}> {/* Define o tamanho do segundo item na grade */}
                <ProductCard
                  title="Outro Produto"
                  price="20 Moedas Greenneat"
                  image="/caminho/para/outra/imagem.jpg"
                  description="Descrição do segundo produto."
                  more="Mais descrições para o segundo produto"
                />
              </Grid>
              <Grid item xs={4}> {/* Define o tamanho do terceiro item na grade */}
                <ProductCard
                  title="Outro Produto"
                  price="10 Moedas Greenneat"
                  image="/caminho/para/outra/imagem.jpg"
                  description="Descrição do terceiro produto."
                  more="Mais descrições para o terceiro produto"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}