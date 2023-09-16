import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Divider } from '@mui/material';
import Logo from "../images/logo_greenneat.png"
import CadEstab from '../components/CamposCad/cadEstab';
import CadCoop from '../components/CamposCad/cadCoop';

const defaultTheme = createTheme();

const backgroundColor = {
  backgroundColor: '#F6F2C7'
};

const fontColor = {
  color: '#0E681D'
};

export default function Cadastro() {
  const [selectedOption, setSelectedOption] = React.useState('estabelecimento'); // estado para controlar opção selecionada

  // função para seleção
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      cnpj: data.get('cnpj'),
      cpf: data.get('cpf'),
      email: data.get('email'),
      password: data.get('password'),
      telefone: data.get('telefone'),
      bairro: data.get('bairro'),
      endereco: data.get('endereco'),
      numero: data.get('numero'),
      rSocial: data.get('rSocial'),
      nFantasia: data.get('nFantasia')
    });
  };

  // Função condicional que decide quais campos serão renderizados de acordo com botão selecionado
  const renderContent = () => {
    if (selectedOption === 'estabelecimento') {
      return <CadEstab />;
    } else if (selectedOption === 'cooperativo') {
      return <CadCoop />;
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
      <Container maxWidth="x" sx={{ backgroundColor: backgroundColor }}>
        <CssBaseline />
        <Grid container spacing={3}>
          {/*Retângulo da esquerda*/}
          <Grid item xs={6} sm={4} md={7}>
            <Box
              sx={{
                backgroundColor: '#136935',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                mx: 10,
                p: 2,
                pt: 5,
                display: { xs: 'none', sm: 'none', md: 'flex' },
              }}
            >
              {/*Logo*/}
              <img src={Logo} alt='Logo' width={'130vh'} height={'130vh'} />
              <Typography
                component="h1"
                variant="h5"
                color={'white'}
                fontWeight={'bold'}
                mt={5}
                fontSize={35}
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
                fontSize={35}
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
                  backgroundColor: selectedOption === 'estabelecimento' ? '#F6F2C7' : '#136935',
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
                  backgroundColor: selectedOption === 'cooperativo' ? '#F6F2C7' : '#136935',
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
          <Grid item xs={6} sm={8} md={5} component={Paper} elevation={0} style={backgroundColor}>
            <Box
              sx={{
                my: 5,
                mx: 4,
                mr: 12,
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
                    width: '20vh',
                    mx: 1
                  }}
                />
                <Typography
                  component="h1"
                  variant="h5"
                  style={fontColor}
                  fontWeight={'bold'}
                  fontSize={35}
                  sx={{ textAlign: 'center' }}
                >
                  {getTitleText()} {/*preenchido com o título da opção selecionada*/}
                </Typography>
                <Divider
                  sx={{
                    backgroundColor: '#136935',
                    my: 1,
                    height: 3,
                    width: '20vh',
                    mx: 1
                  }}
                />
              </Box>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                {/*campos são renderizados de acordo com a opção selecionada*/}
                {renderContent()}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{ mt: 3, mb: 2, backgroundColor: '#136935' }}
                >
                  Cadastrar
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}