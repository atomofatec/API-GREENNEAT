import { Button, Grid, TextField } from "@mui/material";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function RegisterSupplierForm() {
    const navigate = useNavigate();
    const handleClickButton = () =>{
        const createdat = new Date().toLocaleString(); 
        const updatedat = new Date().toLocaleString();
        const type = "supplier";
        const balance = 0;
        const cpf = 0;
        axios.post("http://localhost:3001/registerSupplier", 
        {   cnpj: values.cnpj, 
            cpf: cpf,
            email: values.email, 
            password: values.password, 
            telefone: values.telefone, 
            bairro: values.bairro, 
            endereco: values.endereco, 
            numero: values.numero, 
            rSocial: values.rSocial, 
            nFantasia: values.nFantasia,
            createdat: createdat,
            updatedat: updatedat,
            type: type,
            balance: balance

    }).then(
        (response) => {
            alert("Cadastro realizado com sucesso!")
            navigate("/");
        }
    )
 }


    const [values, setValues] = useState({ 
        cnpj: 0, 
        email: '', 
        password: '', 
        telefone: 0, 
        bairro: '', 
        endereco: '', 
        numero: 0, 
        rSocial: '', 
        nFantasia: '' 
    });

const handleChangeValues = (event) => { 
    const { name, value } = event.target; 
    setValues(prevValues => ({ 
      ...prevValues, 
      [name]: value 
    })); 
  };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
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
                        onChange={handleChangeValues}
                    />
                </Grid>
                <Grid item xs={12}>
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
                        onChange={handleChangeValues}
                    />
                </Grid>
                <Grid item xs={12}>
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
                        onChange={handleChangeValues}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        name="telefone"
                        label="Telefone"
                        id="telefone"
                        required
                        style={{ backgroundColor: 'white' }}
                        onChange={handleChangeValues}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        name="bairro"
                        label="Bairro"
                        id="bairro"
                        required
                        style={{ backgroundColor: 'white' }}
                        onChange={handleChangeValues}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        name="endereco"
                        label="Endereço"
                        id="endereco"
                        required
                        style={{ backgroundColor: 'white' }}
                        onChange={handleChangeValues}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        name="numero"
                        label="Número"
                        id="numero"
                        required
                        style={{ backgroundColor: 'white' }}
                        onChange={handleChangeValues}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        name="rSocial"
                        label="Razão Social"
                        id="rSocial"
                        required
                        style={{ backgroundColor: 'white' }}
                        onChange={handleChangeValues}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        name="nFantasia"
                        label="Nome Fantasia"
                        id="nFantasia"
                        required
                        style={{ backgroundColor: 'white' }}
                        onChange={handleChangeValues}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#136935' }}
                        onClick={handleClickButton}
                    >
                        Cadastrar
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}