import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Triangulo from '../components/Triangulo/triangulo';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';

const defaultTheme = createTheme();

const backgroundColor = {
  backgroundColor: '#F6F2C7'
};

const fontColor = {
  color: '#0E681D'
};

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setShowAlert(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setShowAlert(true);
    } else {
      navigate('#');
    }
  };  
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }} style={backgroundColor}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} sx={{ }}/>
          <Triangulo />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} style={backgroundColor}>
          <Box
            sx={{
              my: 20,
              mx: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#F6F2C7',
            }}
          >
            <Typography component="h1" variant="h5" style={fontColor}>
                <strong>
                    Seja bem-vindo!
                </strong>
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                color="success"
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                required
                autoFocus
                onChange={handleInputChange}
                style={{ backgroundColor: 'white' }}
              />
              <FormControl
                variant="outlined"
                margin="normal"
                color="success"
                fullWidth
                name="password"
                label="password"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                onChange={handleInputChange}
                style={{ backgroundColor: 'white' }}>
                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="password"
                />
              </FormControl>
              {showAlert && (
                <Alert variant="filled" severity="error" sx={{ mt: 2 }}>
                  Preencha todos os campos!
                </Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2, backgroundColor: '#136935'}}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" style={{ textDecoration: 'none', ...fontColor }}>
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" style={{ textDecoration: 'none', ...fontColor }}>
                    Crie a sua conta aqui
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
