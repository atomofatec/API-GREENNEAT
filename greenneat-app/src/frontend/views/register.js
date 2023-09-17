import * as React from 'react';
import Button from '@mui/material/Button';
//import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
//import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Divider } from '@mui/material';
import Logo from "../images/logo_greenneat.png"
import RegisterSupplierForm from '../components/registerForms/registerSupplierForm';
import RegisterPartnerForm from '../components/registerForms/registerPartnerForm';

const defaultTheme = createTheme();

const backgroundColor = {
  backgroundColor: '#F6F2C7'
};

const fontColor = {
  color: '#0E681D'
};

export default function Register() {
  const [selectedOption, setSelectedOption] = React.useState('estabelecimento'); // estado para controlar opção selecionada

  // função para seleção
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  // Função condicional que decide quais campos serão renderizados de acordo com botão selecionado
  const renderContent = () => {
    if (selectedOption === 'estabelecimento') {
      return <RegisterSupplierForm />;
    } else if (selectedOption === 'cooperativo') {
      return <RegisterPartnerForm />;
    }
  };

  // Função condicional que armazena texto de acordo com botão selecionado
  const getTitleText = () => {
    if (selectedOption === 'estabelecimento') {
      return 'Cadastro Estabelecimento';
    } else if (selectedOption === 'cooperativo') {
      return 'Cadastro Cooperativo';
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            backgroundColor: backgroundColor,
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ m: 0, backgroundColor: { backgroundColor } }}>
            <Grid container spacing={3}>
              {/*Retângulo da esquerda*/}
              <Grid item xs={0} md={6} lg={6}>
                <Box
                  sx={{
                    backgroundColor: '#136935',
                    height: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mx: 10,
                    p: 2,
                    pt: 5,
                    display: { xs: 'none', md: 'flex', lg: 'flex' },
                  }}
                >
                  {/*Logo*/}
                  <img src={Logo} alt='Logo' width={'130vw'} height={'130vw'} />
                  <Typography
                    component="h1"
                    variant="h5"
                    color={'white'}
                    fontWeight={'bold'}
                    mt={5}
                    fontSize={'3vw'}
                    sx={{
                      textAlign: 'center'
                    }}
                  >
                    Seja Bem-Vindo(a)!
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h5"
                    color={'white'}
                    fontWeight={'bold'}
                    fontSize={'3vw'}
                    sx={{
                      textAlign: 'center'
                    }}
                  >
                    Como deseja se <br /> cadastrar?
                  </Typography>
                  <Divider
                    sx={{
                      my: 5,
                      backgroundColor: 'white',
                      width: '85%',
                      height: '5px'
                    }}
                  />
                  {/*Botões*/}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{
                      mt: 1,
                      mb: 2,
                      backgroundColor: selectedOption === 'estabelecimento' ? 'white' : '#136935',
                      border: `3px solid ${selectedOption === 'estabelecimento' ? '#3B8F5C' : '#F3EEBF'}`,
                      color: selectedOption === 'estabelecimento' ? '#3B8F5C' : 'white',
                      width: 250,
                    }}
                    onClick={() => handleOptionChange('estabelecimento')}
                  >
                    Estabelecimento
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: selectedOption === 'cooperativo' ? 'white' : '#136935',
                      border: `3px solid ${selectedOption === 'cooperativo' ? '#3B8F5C' : '#F3EEBF'}`,
                      color: selectedOption === 'cooperativo' ? '#3B8F5C' : 'white',
                      width: 250,
                    }}
                    onClick={() => handleOptionChange('cooperativo')}
                  >
                    Cooperativo
                  </Button>
                  <Typography
                    color={'#C8C8C8'}
                    fontSize={20}
                    sx={{ textAlign: 'center', mt: 2 }}
                  >
                    Já possui uma conta? <br />
                    <Link style={{ textDecoration: 'none', color: '#C8C8C8' }} to='/'>
                      <strong>Entrar</strong>
                    </Link>
                  </Typography>
                </Box>
              </Grid>
              {/*Formulário*/}
              <Grid item xs={12} md={6} lg={6} >
                <Box
                  sx={{
                    my: 5,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#F6F2C7',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#F6F2C7',
                    }}
                  >
                    <Divider
                      sx={{
                        backgroundColor: '#136935',
                        my: 1,
                        height: 3,
                        width: '10vw',
                      }}
                    />
                    <Typography
                      component="h1"
                      variant="h5"
                      style={fontColor}
                      fontWeight={'bold'}
                      fontSize={35}
                      sx={{ textAlign: 'center' }}
                      mx={1}
                    >
                      {getTitleText()} {/*preenchido com o título da opção selecionada*/}
                    </Typography>
                    <Divider
                      sx={{
                        backgroundColor: '#136935',
                        my: 1,
                        height: 3,
                        width: '10vw',
                      }}
                    />
                  </Box>
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {/*campos são renderizados de acordo com a opção selecionada*/}
                    {renderContent()}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}