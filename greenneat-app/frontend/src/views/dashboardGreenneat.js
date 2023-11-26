import React, { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Title from "../components/Outros/Title";
import SubTitle from "../components/Outros/SubTitle";
import Container from "@mui/material/Container";
import AvatarImage from "../images/PerfilGreenneat.png";
import { mainListItems } from "../components/menus/menuGreenneat";
import PartnerSupplierRegionChart from "../components/Charts/PartnerSupplierRegionChart";
import SupplierSizeChart from "../components/Charts/SupplierSizeChart";
import RegionChart from "../components/Charts/RegionChart";
import PartnerCredit from "../components/Charts/PartnerCredit";
import { GREENNEAT_TYPE_USER } from "../../env";
import { getUser, getUserToken } from "../utils/util";
import axios from "axios";
import { API_BASE_URL } from '../../env';

const settings = [
  { name: "Meu Perfil" },
  "divider",
  { sair: "Sair" },
];

const drawerWidth = 240;

const defaultTheme = createTheme();

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(0),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(0),
      },
    }),
  },
}));

//Retangulos
function Media(props) {
  const { loading = false } = props;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} justify="center">
        {(loading ? Array.from(new Array(3)) : []).map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ mx: 3 }}>
            <Box sx={{ width: "100%", my: 2 }}>
              {item ? (
                <img style={{ width: 300, height: 200 }} />
              ) : (
                <Skeleton variant="rectangular" width={300} height={200} />
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};
//Fim Retangulos

export default function DashboardGreenneat() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const [partnerSupplierRegionChartData, setPartnerSupplierRegionChartData] =
    React.useState([]);
  const [supplierSizeChartData, setSupplierSizeChartData] = React.useState([]);
  const [regionChartData, setRegionChartData] = React.useState([]);
  const [partnerCreditChartData, setPartnerCreditChartData] = React.useState(
    []
  );

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    const request = async () => {
      try {
        const token = getUserToken();
        axios.defaults.headers.common["Authorization"] = token;

        const topRegionsResponse = await axios.get(API_BASE_URL +"/metrics/topregions");
        setRegionChartData(topRegionsResponse.data);

        console.log(setRegionChartData)

        const topSuppliersResponse = await axios.get(API_BASE_URL + "/metrics/topsuppliers");
        setSupplierSizeChartData(topSuppliersResponse.data)

        const usersByRegionResponse = await axios.get(API_BASE_URL + "/metrics/usersbyregion");
        setPartnerSupplierRegionChartData(usersByRegionResponse.data)

        const topTransactionsResponse = await axios.get(API_BASE_URL + 
          "/metrics/toptransactions/partners"
        );
        setPartnerCreditChartData(topTransactionsResponse.data);
      } catch (error) {
        alert("Erro ao obter dados");
      }
    };
    request();
  }, []);

  const user = getUser()

  if (user.idusertype != GREENNEAT_TYPE_USER)
    return <span> Acesso negado </span>;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex", marginBottom: "40px" }}>
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
                        <img
                          src={AvatarImage}
                          alt="Avatar"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                          }}
                        />
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
                          margin: "5px 20px 0px 20px",
                          color: "#0E681D",
                        }}
                      >
                        <strong>Greenneat</strong>
                      </div>
                      <div
                        style={{ margin: "0px 20px 10px 20px", color: "grey" }}
                      >
                        greenneat@email.com
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
                              <Link
                                href="/meu-perfil-Greenneat"
                                sx={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                {setting.name}
                              </Link>
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
            backgroundColor: "white",
            flexGrow: 1,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Toolbar />
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ marginBottom: "5px", marginTop: "40px" }}
          >
            <Paper
              sx={{
                width: "80%",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                marginBottom: "40px",
              }}
              elevation={2}
            >
              <Container maxWidth="lg" sx={{ m: "auto", overflow: "auto" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <Grid item xs={6}>
                    <Title>Dashboards</Title>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={7}>
                    <Paper
                      sx={{
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                      elevation={2}
                    >
                      <Container
                        maxWidth="lg"
                        sx={{ m: "auto", overflow: "auto" }}
                      >
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "15px",
                            marginBottom: "10px",
                            marginLeft: "10px",
                          }}
                        >
                          <center>
                            <SubTitle>
                              Parceiros e estabelecimentos por região
                            </SubTitle>
                          </center>
                          <PartnerSupplierRegionChart
                            chartData={partnerSupplierRegionChartData}
                          />
                        </Grid>
                      </Container>
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper
                      sx={{
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        overflow: "auto",
                      }}
                      elevation={2}
                    >
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "15px",
                          marginBottom: "10px",
                        }}
                      >
                        <center>
                          <SubTitle>
                            Volumes de óleo descartados corretamente
                          </SubTitle>
                        </center>
                        <center>
                          <SubTitle>por estabelecimentos</SubTitle>
                        </center>
                        <SupplierSizeChart chartData={supplierSizeChartData} />
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  sx={{ marginBottom: "5px", marginTop: "20px" }}
                >
                  <Grid item xs={7} sx={{ marginBottom: "40px" }}>
                    <Paper
                      sx={{
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                      elevation={2}
                    >
                      <Container
                        maxWidth="lg"
                        sx={{ m: "auto", overflow: "auto" }}
                      >
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "15px",
                            marginBottom: "10px",
                            marginLeft: "10px",
                          }}
                        >
                          <center>
                            <SubTitle>
                              Regiões com melhor performance de descarte
                            </SubTitle>
                          </center>
                          <RegionChart chartData={regionChartData} />
                        </Grid>
                      </Container>
                    </Paper>
                  </Grid>
                  <Grid item xs={5} sx={{ marginBottom: "40px" }}>
                    <Paper
                      sx={{
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        overflow: "auto",
                      }}
                      elevation={2}
                    >
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "15px",
                          marginBottom: "10px",
                        }}
                      >
                        <center>
                          <SubTitle>
                            Parceiros que mais participam da economia circular
                          </SubTitle>
                        </center>
                        <PartnerCredit chartData={partnerCreditChartData} />
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Paper>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
