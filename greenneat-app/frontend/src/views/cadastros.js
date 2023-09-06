import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Retangulo from '../components/Retangulo/retangulo';
import { Divider } from '@mui/material';

const defaultTheme = createTheme();

const backgroundColor = {
    backgroundColor: '#F6F2C7'
};

const fontColor = {
    color: '#0E681D'
};

export default function Cadastro() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100%' }} style={backgroundColor}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{

          }}
        />
        <Retangulo />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} style={backgroundColor}>
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
            <Typography component="h1" variant="h5" style={fontColor}>
                <strong>
                    Cadastro Estabelecimento
                </strong>
            <Divider sx={{backgroundColor: '#136935', my: 1, height: 3}}/>
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                color="success"
                fullWidth
                id="cnpj"
                label="CNPJ"
                name="cnpj"
                autoComplete="cnpj"
                required
                autoFocus
                style={{ backgroundColor: 'white' }}
              />
                <TextField
                margin="normal"
                color="success"
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                required
                style={{ backgroundColor: 'white' }}
              />
              <TextField
                margin="normal"
                color="success"
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                style={{ backgroundColor: 'white' }}
              />
              <TextField
                margin="normal"
                color="success"
                fullWidth
                name="telefone"
                label="Telefone"
                id="telefone"
                required
                style={{ backgroundColor: 'white' }}
              />
              <TextField
                margin="normal"
                color="success"
                fullWidth
                name="bairro"
                label="Bairro"
                id="bairro"
                required
                style={{ backgroundColor: 'white' }}
              />
              <TextField
                margin="normal"
                color="success"
                fullWidth
                name="endereco"
                label="Endereço"
                id="endereco"
                required
                style={{ backgroundColor: 'white' }}
              />
              <TextField
                margin="normal"
                color="success"
                fullWidth
                name="rSocial"
                label="Razão Social"
                id="rSocial"
                required
                style={{ backgroundColor: 'white' }}
              />
              <TextField
                margin="normal"
                color="success"
                fullWidth
                name="nFantasia"
                label="Nome Fantasia"
                id="nFantasia"
                required
                style={{ backgroundColor: 'white' }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2, backgroundColor: '#136935'}}
              >
                Cadastrar
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}