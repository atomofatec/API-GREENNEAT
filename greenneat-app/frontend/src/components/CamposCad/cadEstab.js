import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

export default function CadEstab() {
    const [values, setValues] = useState({
        cnpj: '',
        email: '',
        password: '',
        telefone: '',
        bairro: '',
        endereco: '',
        numero: '',
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

    console.log(values)

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
                        value={values.cnpj}
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
                        value={values.email}
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
                        value={values.password}
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
                        value={values.telefone}
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
                        value={values.bairro}
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
                        value={values.endereco}
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
                        value={values.numero}
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
                        value={values.rSocial}
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
                        value={values.nFantasia}
                        onChange={handleChangeValues}
                    />
                </Grid>
            </Grid>
        </>
    )
}