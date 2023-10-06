import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Triangle from '../components/visualElements/triangle';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const defaultTheme = createTheme();

const backgroundColor = {
    backgroundColor: 'white'
};

const fontColor = {
    color: '#0E681D'
};

export default function Login() {
  React.useEffect(() => {
    localStorage.clear()
  })

  const [values, setValues] = React.useState();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeValues = (value) => {
    setValues(prevValue => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }))
  };

  const checkEmpty = () => {
    let isVazio = false
    if (document.getElementById('email').value === '') {
      isVazio = true
      return isVazio
    }
    if (document.getElementById('password').value === '') {
      isVazio = true
      return isVazio
    }
  }

  const handleClickButton = () => {
    if (!checkEmpty()) {
      axios.post("http://localhost:3001/", {
        email: values.email,
        password: values.password,
      }).then((response) => {
        console.log(response.data)
        if (response.data.msg === "Usuário logado") {
          localStorage.setItem('user', response.data.id)
          localStorage.setItem('tipo', response.data.type_user)
          localStorage.setItem('email', response.data.email)
          localStorage.setItem('cpf', response.data.cpf)
          localStorage.setItem('cnpj', response.data.cnpj)
          localStorage.setItem('balance', response.data.balance)
          if (response.data.type_user === "supplier") {
            navigate('/carteira-estabelecimento')
          }
          else if (response.data.type_user === "partner") {
            navigate('/dashboard-cooperativo')
          }
          else if (response.data.type_user === "admin") {
            navigate('/dashboard-greenneat')
          }
        } else {
          alert('Não foi possível logar')
        }
      })
    } else {
      alert('Preencha todos os campos')
    }
  }

  /*  const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    };*/

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }} style={backgroundColor}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{

          }}
        />
        <Triangle />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} style={backgroundColor}>
          <Box
            sx={{
              my: 20,
              mx: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
          >
            <Typography style={fontColor} fontSize={'2vw'}>
                <strong>
                  Seja Bem-Vindo(a)!
                </strong>
            </Typography>
            {/* onSubmit={handleSubmit} */}
            <Box component="form" noValidate sx={{ mt: 1 }}>
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
                style={{ backgroundColor: 'white' }}
                onChange={handleChangeValues}
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
                style={{ backgroundColor: 'white' }}
                onChange={handleChangeValues}>
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
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={handleClickButton}
                sx={{ mt: 3, mb: 2, backgroundColor: '#0E681D'}}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" style={{ textDecoration: 'none', ...fontColor }} fontSize={'1vw'}>
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/cadastro" variant="body2" style={{ textDecoration: 'none', ...fontColor }} fontSize={'1vw'}>
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