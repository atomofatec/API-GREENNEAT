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
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CarteiraEstabForm from '../components/Forms/CarteiraEstabForm';
import EnviarButton from '../components/Buttons/EnviarButton';
import Title from '../components/Outros/Title';
import Paper from '@mui/material/Paper';
import SubTitle from '../components/Outros/SubTitle';
import { mainListItems } from '../components/menus/menuSupplier';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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

export default function CarteiraEstabelecimento() {
  const [open, setOpen] = React.useState(false);
  const [valor, setValor] = useState("");
  const [cnpj, setCnpj] = useState("");

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

  const handleValorChange = (event) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, "").replace(/^0+/, "");
    setValor(numericValue || "0");
  };

  //localStorage
  console.log(localStorage.getItem('user'))
  console.log(localStorage.getItem('tipo'))
  console.log(localStorage.getItem('email'))
  console.log(localStorage.getItem('cpf'))
  console.log(localStorage.getItem('cnpj'))

  const handleSubmit = async () => {
    console.log("teste")
    try {
      // Recupere os valores do localStorage
      //const valor = localStorage.getItem("valor");
  
      const cnpjValue = '1';
      const valorValue = valor;

      const requestData = {
        senderType: localStorage.getItem('tipo'),
        senderId: localStorage.getItem('user'),
        uniqueKey: cnpjValue,
        transferValue: valorValue,
      };
  
      const response = await axios.post(
        "http://localhost:3001/transfer",
        requestData
      );
 
      //localStorage.removeItem("valor");
  
      //setValor("");
  
      if (response.status === 200) {
        alert("Transferência concluída com sucesso.");
        setValor("");
        setCnpj("");
      } else {
        if (response.status === 400) {
          alert(
            "Erro de solicitação: O servidor não conseguiu processar a solicitação."
          );
        } else if (response.status === 404) {
          alert("Recurso não encontrado: A página solicitada não existe.");
        } else {
          alert("Ocorreu um erro desconhecido no servidor.");
        }
      }
    } catch (error) {
      console.error("Erro ao realizar a transferência:", error.message);
      alert("Ocorreu um erro ao realizar a transferência.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="absolute"
          open={open}
          sx={{ backgroundColor: "#3B8F5C", height: 72 }}
          elevation={2}
        >
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "15px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <strong>
                <h2>GREENNEAT</h2>
              </strong>
            </Box>
            <IconButton
              color="white"
              sx={{ marginLeft: "auto", borderRadius: "0" }}
            >
              <Link
                href="#"
                sx={{
                  textDecoration: "none",
                  "&:visited": {
                    color: "inherit",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  color="white"
                  fontFamily="'Century Gothic', Futura, sans-serif"
                >
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Abrir configurações">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar sx={{ bgcolor: "white", color: "#0E681D" }}>
                          E
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <div
                        style={{
                          margin: "5px 20px 10px 20px",
                          color: "#0E681D",
                        }}
                      >
                        <strong>Estabelecimento</strong>
                      </div>
                      <Divider />
                      {settings.map((setting, index) =>
                        setting === "divider" ? (
                          <Divider key={index} />
                        ) : (
                          <MenuItem
                            key={setting.name}
                            onClick={handleCloseUserMenu}
                          >
                            <Typography textAlign="center">
                              {setting.name}
                            </Typography>
                            <Typography textAlign="center">
                              <Link
                                href="/"
                                sx={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                {setting.sair}
                              </Link>
                            </Typography>
                          </MenuItem>
                        )
                      )}
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
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
              backgroundColor: "#0E681D",
              border: "none",
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon sx={{ color: "white" }} />
            </IconButton>
          </Toolbar>
          <Box
            sx={{
              width: drawerWidth,
              height: "91vh",
              overflowY: "auto",
              backgroundColor: "#0E681D",
              display: open ? "block" : "none",
            }}
          >
            <List component="nav" sx={{ display: open ? "block" : "none" }}>
              {mainListItems}
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: 'white',
            flexGrow: 1,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Toolbar />
          <Paper sx={{ width: '84%',  display: 'flex', flexDirection: 'column', marginTop: '40px', }} elevation={2}>
           <Container maxWidth="lg" sx={{ m: 'auto', backgroundColor: 'white', borderRadius: 1,  marginBottom: '16px', overflow: 'auto'}}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{marginBottom: '20px', marginTop: '20px' }}>
              <Grid item xs={6}>
                <Title>Enviar Crédito</Title>
                <SubTitle>Greeneat</SubTitle>
              </Grid>
              <Grid item xs={6}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Title>${localStorage.getItem('balance')}</Title>
                </Box>
                <Box textAlign="right">
                  <SubTitle>Moedas Greenneat</SubTitle>
                </Box>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ marginBottom: "20px", marginTop: "10px" }}
            >
              <Grid item xs={6}>
                <CarteiraEstabForm onChange={handleValorChange} value={valor} />
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ marginBottom: "20px", marginTop: "10px" }}
            >
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <EnviarButton onClick={handleSubmit} />
              </Grid>
            </Grid>
          </Container>
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}