import { Button, Grid, TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import axios from "axios";
import {API_BASE_URL} from "../../../env.js";
import { getLocationCode, getUser, getUserToken } from "../../utils/util.js";

export default function ProfileCoopForm(props) {

    const theme = useTheme(); 

    const [data, setData] = useState("");
    const [telephone, setTelephone] = useState("");
    const [address, setAdress] = useState("");
    const [name, setName] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [location, setLocation] = useState("");
    
    useEffect( () => {
        getData()
    }, [])

    const sendRequest = async () => {
        try{
            const user = getUser()
            const token = getUserToken()
            
            axios.defaults.headers.common['Authorization'] = token
            const response = await axios.put(API_BASE_URL + `/users/${user.id}/update`, user);
            
            if (response.status = 200)
                alert("Dados atualizados com sucesso")
            

        }catch(error){
            console.log(error)
            alert("Erro ao salvar os dados")
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
            setName(response.data[0].name)
            setAdress(null)
            setBusinessName(null)
            setName(null)

        }catch(error){
            console.log(error)
            alert("Erro ao buscar os dados")
        }
        
    }
    
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
                        label="CPF / CNPJ"
                        name="document"
                        autoComplete="cpf"
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
        </>
    )
}
