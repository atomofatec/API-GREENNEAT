import React, { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Divider } from "@mui/material";
import Logo from "../images/logo_greenneat.png";
import RegisterSupplierForm from "../components/registerForms/registerSupplierForm";
import RegisterPartnerForm from "../components/registerForms/registerPartnerForm";
import axios from "axios";
import {API_BASE_URL, SUPPLIER_TYPE_USER, PARTNER_TYPE_USER} from "../../env.js";

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

export default function Register() {
  const [selectedOption, setSelectedOption] = React.useState("estabelecimento"); // estado para controlar opção selecionada
  const [location, setLocation] = React.useState("")

  const handleChangeLocation = (event) => {
      const loc = event.target.outerText
      setLocation(loc)
  } 

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const getLocationCode = () => {
    switch(location){
      case 'Norte':
        return 1
      case 'Sul':
        return 2
      case 'Leste':
        return 3
      case 'Oeste':
        return 4
    }
  }

  const navigate = useNavigate();

  const handleSubmit = async (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const body = {
      email: data.get("email"),
      password: data.get("password"),
      idUserType: selectedOption === "estabelecimento" ? SUPPLIER_TYPE_USER : PARTNER_TYPE_USER, //if ternario
      name: data.get("rSocial"),
      telephone: data.get("telefone"),
      document: data.get("document"),
      address:
        data.get("endereco") +
        "," +
        data.get("numero") +
        " " +
        data.get("bairro"),
      businessName: data.get("nFantasia"),
      location: getLocationCode()
    };

    try {
      await axios.post(API_BASE_URL + "/users", body);
      setSuccessMessage("Cadastro realizado com sucesso");
      setSuccessAlertOpen(true);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data);
      setErrorAlertOpen(true);
    }
  };

  // Função condicional que decide quais campos serão renderizados de acordo com botão selecionado
  const renderContent = () => {
    if (selectedOption === "estabelecimento") {
      return <RegisterSupplierForm location={location} onChange={handleChangeLocation}/>;
    } else if (selectedOption === "cooperativo") {
      return <RegisterPartnerForm />;
    }
  };

  // Função condicional que armazena texto de acordo com botão selecionado
  const getTitleText = () => {
    if (selectedOption === "estabelecimento") {
      return "Cadastro Estabelecimento";
    } else if (selectedOption === "cooperativo") {
      return "Cadastro Cooperativo";
    }
  };

  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');  

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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{
            backgroundColor: backgroundColor,
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container
            maxWidth="lg"
            sx={{ m: 0, backgroundColor: { backgroundColor } }}
          >
            <Grid container spacing={3}>
              {/*Retângulo da esquerda*/}
              <Grid item xs={0} md={6} lg={6}>
                <Box
                  sx={{
                    backgroundColor: "#0E681D",
                    height: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    mx: 10,
                    p: 2,
                    pt: 5,
                    display: { xs: "none", md: "flex", lg: "flex" },
                  }}
                >
                  {/*Logo*/}
                  <img src={Logo} alt="Logo" width={"130vw"} height={"130vw"} />
                  <Typography
                    component="h1"
                    variant="h5"
                    color={"white"}
                    fontWeight={"bold"}
                    mt={5}
                    fontSize={"25px"}
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Seja Bem-Vindo(a)!
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h5"
                    color={"white"}
                    fontWeight={"bold"}
                    fontSize={"25px"}
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Como deseja se <br /> cadastrar?
                  </Typography>
                  <Divider
                    sx={{
                      my: 5,
                      backgroundColor: "white",
                      width: "85%",
                      height: "3px",
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
                      backgroundColor:
                        selectedOption === "estabelecimento"
                          ? "white"
                          : "#0E681D",
                      border: `3px solid ${
                        selectedOption === "estabelecimento"
                          ? "#3B8F5C"
                          : "#F3EEBF"
                      }`,
                      color:
                        selectedOption === "estabelecimento"
                          ? "#3B8F5C"
                          : "white",
                      width: 250,
                    }}
                    onClick={() => handleOptionChange("estabelecimento")}
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
                      backgroundColor:
                        selectedOption === "cooperativo" ? "white" : "#0E681D",
                      border: `3px solid ${
                        selectedOption === "cooperativo" ? "#3B8F5C" : "#F3EEBF"
                      }`,
                      color:
                        selectedOption === "cooperativo" ? "#3B8F5C" : "white",
                      width: 250,
                    }}
                    onClick={() => handleOptionChange("cooperativo")}
                  >
                    Cooperativo
                  </Button>
                  <Typography
                    color={"#C8C8C8"}
                    fontSize={'1vw'}
                    sx={{ textAlign: "center", mt: 2 }}
                  >
                    Já possui uma conta? <br />
                    <Link
                      style={{ textDecoration: "none", color: "#C8C8C8" }}
                      to="/"
                    >
                      <strong>Entrar</strong>
                    </Link>
                  </Typography>
                </Box>
              </Grid>
              {/*Formulário*/}
              <Grid item xs={12} md={6} lg={6}>
                <Box
                  sx={{
                    my: 5,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "white",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "white",
                    }}
                  >
                    <Divider
                      sx={{
                        backgroundColor: "#0E681D",
                        my: 1,
                        height: 3,
                        width: "10vw",
                      }}
                    />
                    <Typography
                      component="h1"
                      variant="h5"
                      style={fontColor}
                      fontWeight={"bold"}
                      fontSize={30}
                      sx={{ textAlign: "center" }}
                      mx={1}
                    >
                      {getTitleText()}{" "}
                      {/*preenchido com o título da opção selecionada*/}
                    </Typography>
                    <Divider
                      sx={{
                        backgroundColor: "#0E681D",
                        my: 1,
                        height: 3,
                        width: "10vw",
                      }}
                    />
                  </Box>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    {/*campos são renderizados de acordo com a opção selecionada*/}
                    {renderContent()}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
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
