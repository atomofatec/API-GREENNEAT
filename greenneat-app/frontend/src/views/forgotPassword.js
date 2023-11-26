import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";
import Logo from "../images/logo_greenneat.png";
import ForgotPasswordForm from "../components/Forms/forgotPasswordForm";

const defaultTheme = createTheme();

const backgroundColor = {
  backgroundColor: "white",
};

const fontColor = {
  color: "#0E681D",
};

export default function Register() {
  const getTitleText = () => {
    return "Esqueceu a senha?";
  };

  return (
            <Grid container spacing={3}>
              {/*Formulário*/}
              <Grid item xs={12} md={6} lg={6}>
                <Box
                  sx={{
                    my: 5,
                    mx: 4,
                    ml: 17,
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
                        width: "7vw",
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
                    sx={{ mt: 1, textAlign: 'center' }}
                  >
                    <ForgotPasswordForm />
                  </Box>
                </Box>
              </Grid>

              {/*Retângulo da direita*/}
              <Grid item xs={0} md={6} lg={6}>
                <Box
                  sx={{
                    backgroundColor: "#0E681D",
                    height: "100%",
                    width: "56%",
                    flexDirection: "column",
                    alignItems: "center",
                    mx: 20,
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
                    fontSize={"23px"}
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Para redefinir sua <br /> senha  informe o  <br /> email cadastrado e  <br /> enviaremos um código  <br /> para alteração
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h5"
                    color={"#0E681D"}
                    fontWeight={"bold"}
                    mt={5}
                    fontSize={"7.2vw"}
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    -
                  </Typography>
                  <Typography
                    color={"#C8C8C8"}
                    fontSize={'1vw'}
                    sx={{ textAlign: "center", mt: 2 }}
                  >
                    Se lembra da senha? <br />
                    <Link
                      style={{ textDecoration: "none", color: "#C8C8C8" }}
                      to="/"
                    >
                      <strong>Entrar</strong>
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
  );
}
