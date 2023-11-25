import { Button, Grid, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../env.js";
import { getLocationCode, getUser, getUserToken } from "../../utils/util.js";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const alertStyle = {
  position: "fixed",
  top: "10px",
  right: "10px",
  zIndex: 9999,
};

export default function ProfileGreenForm(props) {
  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [autoCloseSuccessTimeout, setAutoCloseSuccessTimeout] = useState(null);
  const [autoCloseErrorTimeout, setAutoCloseErrorTimeout] = useState(null);

  const sendRequest = async () => {
    try {
      const body = {
        oldPassword: password,
        newPassword: newPassword,
      };

      axios.defaults.headers.common["Authorization"] = getUserToken();
      const response = await axios.post(API_BASE_URL + "/users/password", body);

      if (response.status === 200) {
        setSuccessMessage("Senha atualizada com sucesso");
        setSuccessAlertOpen(true);
        setAutoCloseSuccessTimeout(
          setTimeout(() => setSuccessAlertOpen(false), 5000)
        );
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Erro ao salvar a senha");
      setErrorAlertOpen(true);
      setAutoCloseErrorTimeout(
        setTimeout(() => setErrorAlertOpen(false), 5000)
      );
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            color="success"
            fullWidth
            name="password"
            label="Nova senha"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            style={{ backgroundColor: "white" }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2, backgroundColor: "#0E681D" }}
            onClick={sendRequest}
          >
            Salvar
          </Button>
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
      {successAlertOpen && (
        <div style={alertStyle}>
          <Alert severity="success">
            <AlertTitle>Sucesso</AlertTitle>
            {successMessage}
          </Alert>
        </div>
      )}
    </>
  );
}