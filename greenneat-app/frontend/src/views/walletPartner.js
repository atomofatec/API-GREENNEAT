import React, { useState, useEffect } from 'react';
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
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import SolicitarCredButton from '../components/Buttons/SolicitarCredButton';
import EnviarCredButton from '../components/Buttons/EnviarCredButton';
import EnviarButton from '../components/Buttons/EnviarButton';
import Title from '../components/Outros/Title';
import SubTitle from '../components/Outros/SubTitle';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CarteiraCoopSolForm from '../components/Forms/CarteiraCoopSolForm';
import CarteiraCoopEnvForm from '../components/Forms/CarteiraCoopEnvForm';
import { mainListItems } from '../components/menus/menuPartner';
import axios from 'axios';
import { API_BASE_URL, PARTNER_TYPE_USER } from '../../env';
import { getUser, getUserToken } from '../utils/util';

const settings = [
  { name: 'Meu Perfil' },
  'divider',
  { sair: 'Sair' },
];  

const alertStyle = {
  position: 'fixed',
  top: '10px',
  right: '10px',
  zIndex: 9999,
};

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

export default function CarteiraCooperativo() {

  const [open, setOpen] = React.useState(false);
  const [showSolicitarCredito, setShowSolicitarCredito] = useState(true);
  const [showEnviarCredito, setShowEnviarCredito] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [valor, setValor] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    getData()
  }, [balance])

  const getData = async () => {

    try{
        const user = getUser()
        const token = getUserToken()

        axios.defaults.headers.common['Authorization'] = token

        const response = await axios.get(API_BASE_URL + "/users/" + user.id);
        setBalance(response.data[0].balance)

    }catch(error){
        console.log(error)
        alert("Erro ao buscar os dados")
    }
    
}

  const handleValorChange = (event) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, "").replace(/^0+/, "");
    setValor(numericValue || "0");
  };
  
  const handleCnpjChange = (event) => {
    let input = event.target.value;
    
    input = input.replace(/[^0-9]/g, "");
    
    if (input.length > 14) {
      input = input.slice(0, 14);
    }

    setCnpj(input);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleShowSolicitarCredito = () => {
    setShowSolicitarCredito(true);
    setShowEnviarCredito(false);
  };

  const handleShowEnviarCredito = () => {
    setShowSolicitarCredito(false);
    setShowEnviarCredito(true);
  };

  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');  
  
  const sendRequest = async () => {
    
    try{

    const tokenCookie = document.cookie.split(" ")
    let token = tokenCookie[0].split("=")[1]
    token = token.substring(0, token.length - 1)

    axios.defaults.headers.common['Authorization'] = token

    if (showSolicitarCredito){
      const data = {
        amount: valor,
      };

      await axios.post(API_BASE_URL + "/transactions/request", data);
    
      setSuccessMessage("Solicitação realizada!")
      setSuccessAlertOpen(true);
    }
    else{
      const data = {
        document: cnpj,
        amount: valor
      };
      await axios.post(API_BASE_URL + "/transactions/transfer", data);
      setSuccessMessage("Transferencia realizada!")
      setSuccessAlertOpen(true);
      setBalance(balance - valor)
    }

    setValor("")
    setCnpj("")

    } catch(error){
      setErrorMessage(error.response.data);
      setErrorAlertOpen(true);
    }
  }

  const [autoCloseTimeout, setAutoCloseTimeout] = useState(null);

  useEffect(() => {
    if (errorAlertOpen) {
      const timeout = setTimeout(() => {
        setErrorAlertOpen(false);
      }, 5000);
      setAutoCloseTimeout(timeout);
    } else {
      if (autoCloseTimeout) {
        clearTimeout(autoCloseTimeout);
        setAutoCloseTimeout(null);
      }
    }
  }, [errorAlertOpen]);

  const [autoCloseSuccessTimeout, setAutoCloseSuccessTimeout] = useState(null);

  useEffect(() => {
    if (successAlertOpen) {
      const timeout = setTimeout(() => {
        setSuccessAlertOpen(false);
      }, 5000);
      setAutoCloseSuccessTimeout(timeout);
    } else {
      if (autoCloseSuccessTimeout) {
        clearTimeout(autoCloseSuccessTimeout);
        setAutoCloseSuccessTimeout(null);
      }
    }
  }, [successAlertOpen]);

  //obter o usuario dos cookies e verifica o type user 
  const user = getUser()

  if (user.idusertype != PARTNER_TYPE_USER)
    return <span> Acesso negado </span>

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
                    <div style={{ margin: '5px 20px 0px 20px', color:'#0E681D' }}>
                        <strong>
                            Parceiro Cooperativo
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
                        <Typography textAlign="center"><Link href='/meu-perfil-cooperativo' sx={{textDecoration: 'none', color: 'inherit'}}>{setting.name}</Link></Typography>
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
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginBottom: '5px', marginTop: '40px', marginRight: '15%' }}>
            <Grid item xs={6}>
              {}
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <div style={{ marginRight: '10px' }}>
                  <SolicitarCredButton onClick={handleShowSolicitarCredito} />
                </div>
                <div style={{ marginRight: '10px' }}>
                  <EnviarCredButton onClick={handleShowEnviarCredito} />
                </div>
              </Box>
            </Grid>
          </Grid>


          {showSolicitarCredito && (
          <Paper sx={{ width: '84%',  display: 'flex', flexDirection: 'column', marginTop: '40px', }} elevation={2}>
            <Container maxWidth="lg" sx={{ m: 'auto', backgroundColor: 'white', borderRadius: 1,  marginBottom: '16px', overflow: 'auto'}}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{marginBottom: '20px', marginTop: '20px' }}>
                <Grid item xs={6}>
                  <Title>Solicitar Crédito</Title>
                  <SubTitle>Greeneat</SubTitle>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" justifyContent="flex-end" alignItems="center">
                    <Title>{balance}</Title>
                  </Box>
                  <Box textAlign="right">
                    <SubTitle>Moedas Greenneat</SubTitle>
                  </Box>
                </Grid>
              </Grid>
              <Divider />
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{marginBottom: '20px', marginTop: '10px' }}>
                <Grid item xs={6}>
                  <CarteiraCoopSolForm valor={valor} onChange={handleValorChange}/>
                </Grid>
                <Grid item xs={6}>
                </Grid>
              </Grid>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{marginBottom: '20px', marginTop: '10px' }}>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                  <EnviarButton onClick={sendRequest}/>
                </Grid>
              </Grid>
            </Container>
          </Paper>
          )}

          {showEnviarCredito && (
          <Paper sx={{ width: '84%',  display: 'flex', flexDirection: 'column', marginTop: '40px', }} elevation={2}>
            <Container maxWidth="lg" sx={{ m: 'auto', backgroundColor: 'white', borderRadius: 1,  marginBottom: '16px', overflow: 'auto'}}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{marginBottom: '20px', marginTop: '20px' }}>
                <Grid item xs={6}>
                  <Title>Enviar Crédito</Title>
                  <SubTitle>Estabelecimento</SubTitle>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" justifyContent="flex-end" alignItems="center">
                    <Title>{balance}</Title>
                  </Box>
                  <Box textAlign="right">
                    <SubTitle>Moedas Greenneat</SubTitle>
                  </Box>
                </Grid>
              </Grid>
              <Divider />
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{marginBottom: '20px', marginTop: '10px' }}>
                <Grid item xs={6}>
                  <CarteiraCoopEnvForm cnpj={cnpj} valor={valor} onChangeCnpj={handleCnpjChange} onChangeValor={handleValorChange}/>
                </Grid>
                <Grid item xs={6}>
                </Grid>
              </Grid>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{marginBottom: '20px', marginTop: '10px' }}>
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                  <EnviarButton onClick={sendRequest} />
                </Grid>
              </Grid>
            </Container>
          </Paper>
          )}
        </Box>
      </Box>
      {errorAlertOpen && (
        <div style={alertStyle}>
          <Alert severity="error">
            <AlertTitle>Erro</AlertTitle>
            {errorMessage}
          </Alert>
        </div>
      )}
      {successAlertOpen && (
        <div style={alertStyle}>
          <Alert severity="success">
            <AlertTitle>Sucesso</AlertTitle>
            {successMessage}
          </Alert>
        </div>
      )}
    </ThemeProvider>
  );
}