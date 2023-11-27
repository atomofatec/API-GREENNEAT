import React, { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Triangle from "../components/visualElements/triangle";
import axios from "axios";
import {API_BASE_URL, GREENNEAT_TYPE_USER, SUPPLIER_TYPE_USER, PARTNER_TYPE_USER} from "../../env.js";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const backgroundColor = {
  backgroundColor: "white",
};

const fontColor = {
  color: "#0E681D",
};

const alertStyle = {
  position: 'fixed',
  top: '10px',
  right: '10px',
  zIndex: 9999,
};

export default function Login() {

  document.cookie = "token="
  document.cookie = "user="

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const response = await axios.post(API_BASE_URL + "/login", formData);
      const decodedToken = jwt_decode(response.data);
      const user = decodedToken.user;
      
      
      document.cookie = `token=${response.data};`
      document.cookie = `user=${JSON.stringify(user)};`

      if (user.idusertype === GREENNEAT_TYPE_USER) {
        navigate("/dashboard-greenneat");
      } else if (user.idusertype === SUPPLIER_TYPE_USER) {
        navigate("/solicitar-estabelecimento");
      } else if (user.idusertype === PARTNER_TYPE_USER)
        navigate("/carteira-cooperativo");

    } catch (error) {
      setErrorMessage(error.response.data);
      setErrorAlertOpen(true);
    }
  };

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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh" }}
        style={backgroundColor}
      >
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} />
        <Triangle />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={0}
          style={backgroundColor}
        >
          <Box
            sx={{
              my: 20,
              mx: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <Typography style={fontColor} fontSize={'25px'}>
              <strong>Seja bem-vindo!</strong>
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
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
                style={{ backgroundColor: "white" }}
                value={formData.email}
                onChange={handleChange}
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
                style={{ backgroundColor: "white" }}
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2, backgroundColor: "#136935" }}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="/esqueci-senha"
                    variant="body2"
                    style={{ textDecoration: "none", ...fontColor }}
                  >
                    Esqueceu a senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="/cadastro"
                    variant="body2"
                    style={{ textDecoration: "none", ...fontColor }}
                  >
                    Crie a sua conta aqui
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {errorAlertOpen && (
        <div style={alertStyle}>
          <Alert severity="error">
            <AlertTitle>Erro</AlertTitle>
            {errorMessage}
          </Alert>
        </div>
      )}
    </ThemeProvider>
  );
}
