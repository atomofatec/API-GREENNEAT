import { Button, Grid, TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material/styles';
import axios from "axios";
import {API_BASE_URL} from "../../../env.js";
import { useState ,useEffect } from "react";
import { getLocationCode, getUser, getUserToken } from "../../utils/util.js";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const alertStyle = {
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 9999,
  };

export default function ProfileEstabForm(props) {

    const [data, setData] = useState("");
    const [telephone, setTelephone] = useState("");
    const [address, setAdress] = useState("");
    const [name, setName] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [location, setLocation] = useState("");

    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [autoCloseSuccessTimeout, setAutoCloseSuccessTimeout] = useState(null);
    const [autoCloseErrorTimeout, setAutoCloseErrorTimeout] = useState(null);
    
    useEffect( () => {
        getData()
    }, [])

    const sendRequest = async () => {
        try{
            const body = {
                "name": name,
                "telephone": telephone,
                "address": address,
                "businessname": businessName,
                "location": getLocationCode(location)
            }
            
            axios.defaults.headers.common['Authorization'] = getUserToken()
            const response = await axios.put(API_BASE_URL + "/usersUpdate", body);
            
            if (response.status === 200) {
                setSuccessMessage("Dados atualizados com sucesso");
                setSuccessAlertOpen(true);
                setAutoCloseSuccessTimeout(
                    setTimeout(() => setSuccessAlertOpen(false), 5000)
                );
            }
            } catch (error) {
            console.log(error);
            setErrorMessage("Erro ao salvar os dados");
            setErrorAlertOpen(true);
            setAutoCloseErrorTimeout(
                setTimeout(() => setErrorAlertOpen(false), 5000)
            );
        }
    }

    const getData = async () => {

        try{
            const user = getUser()
            const token = getUserToken()

            axios.defaults.headers.common['Authorization'] = token

            const response = await axios.get(API_BASE_URL + "/users/" + user.id);
            setData(response.data[0])

            setTelephone(response.data[0].telephone)
            setAdress(response.data[0].address)
            setName(response.data[0].name)
            setBusinessName(response.data[0].businessname)
            setLocation(response.data[0].location.namearea)

        }catch(error){
            console.log(error)
            alert("Erro ao buscar os dados")
            setErrorAlertOpen(true);
            setAutoCloseErrorTimeout(
                setTimeout(() => setErrorAlertOpen(false), 5000)
            );
        }
        
    }

    const theme = useTheme(); 
    
    const locations = [
        'Norte',
        'Sul',
        'Leste',
        'Oeste'
    ];
    
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6} sx={{ marginBottom: theme.spacing('-20px') }}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        disabled
                        id="document"
                        label="CNPJ"
                        name="document"
                        autoComplete="cnpj"
                        autoFocus
                        style={{ backgroundColor: 'white' }}
                        value= {data.document || ''}
                    />
                </Grid>
                <Grid item xs={6} sx={{ marginBottom: theme.spacing('-20px') }}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        disabled
                        id="email"
                        label="@email.com"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        style={{ backgroundColor: 'white' }}
                        value= {data.email || ''}
                    />
                </Grid>
                <Grid item xs={6} sx={{ marginBottom: theme.spacing('-20px') }}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        name="telefone"
                        label="Telefone"
                        id="telefone"
                        required
                        style={{ backgroundColor: 'white' }}
                        value= {telephone || ''}
                        onChange={(value) => setTelephone(value.currentTarget.value)}
                    />
                </Grid>
                <Grid item xs={6} sx={{ marginBottom: theme.spacing('-20px') }}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        name="endereco"
                        label="Endereço"
                        id="endereco"
                        required
                        style={{ backgroundColor: 'white' }}
                        value= {address || ''}
                        onChange={(value) => setAdress(value.currentTarget.value)}
                    />
                </Grid>
                <Grid item xs={6} sx={{ marginBottom: theme.spacing('-20px') }}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        name="rSocial"
                        label="Razão Social"
                        id="rSocial"
                        required
                        style={{ backgroundColor: 'white' }}
                        value= {name || ''}
                        onChange={(value) => setName(value.currentTarget.value)}
                    />
                </Grid>
                <Grid item xs={6} sx={{ marginBottom: theme.spacing('-20px') }}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        name="nFantasia"
                        label="Nome Fantasia"
                        id="nFantasia"
                        required
                        style={{ backgroundColor: 'white' }}
                        value= {businessName || ''}
                        onChange={(value) => setBusinessName(value.currentTarget.value)}
                    />
                </Grid>
                <Grid item xs={6} sx={{ marginBottom: theme.spacing('-20px') }}>
                    <Autocomplete
                        name="location"
                        id="location"
                        value={location || ''}
                        options={locations}
                        onChange={(value) => setLocation(value.target.outerText)}
                        isOptionEqualToValue={(option, value) => option === value}
                        style={{ backgroundColor: 'white', marginTop: '15px' }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Região"
                            variant="outlined"
                            color="success"
                            required
                            fullWidth
                        />
                        )}
                        renderOption={(props, option, { selected }) => (
                        <li {...props} style={{ fontWeight: selected ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular }}>
                            {option}
                        </li>
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#0E681D' }}
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
    )
}