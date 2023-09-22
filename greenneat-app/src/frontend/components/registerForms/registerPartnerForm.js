import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPartnerForm() {
    const [selectedOption, setSelectedOption] = useState('cpf'); // estado para armezenar escolha (cpf ou cnpj)

    // função de escolha
    const toggleOption = (option) => {
        setSelectedOption(option);
    };

    const navigate = useNavigate();
    const handleClickButton = () =>{
        const createdat = new Date().toLocaleString(); 
        const updatedat = new Date().toLocaleString();
        const type = "partner";
        const balance = 0;
        axios.post("http://localhost:3001/registerSupplier", 
        {   cnpj: values.cnpj || null, 
            cpf: values.cpf || null, 
            email: values.email, 
            password: values.password, 
            telefone: values.telefone, 
            bairro: values.bairro || null, 
            endereco: values.endereco || null, 
            numero: values.numero || null, 
            rSocial: values.rSocial || null, 
            nFantasia: values.nFantasia || null,
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
        cpf: 0, 
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
            {/* campos comuns (aparecem em cnpj e cpf) */}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        id="cpf"
                        label="CPF"
                        name="cpf"
                        autoComplete="cpf"
                        required
                        autoFocus
                        onChange={handleChangeValues}
                        style={{ backgroundColor: 'white', display: selectedOption === 'cpf' ? 'block' : 'none' }}
                    />
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
                        onChange={handleChangeValues}
                        style={{ backgroundColor: 'white', display: selectedOption === 'cnpj' ? 'block' : 'none' }}
                    />
                    {/* botão que altera de cpf para cnpj */}
                    <Typography
                        variant="body2"
                        color="#3B8F5C"
                        style={{ cursor: 'pointer' }}
                        onClick={() => toggleOption(selectedOption === 'cpf' ? 'cnpj' : 'cpf')}
                    >
                        {/* alterna o texto para ficar coerente de acordo com a opção já selecionada */}
                        {selectedOption === 'cpf' ? 'Entrar com CNPJ' : 'Entrar com CPF'}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        name="email"
                        label="E-mail"
                        id="email"
                        autoComplete="email"
                        required
                        onChange={handleChangeValues}
                        style={{ backgroundColor: 'white' }}
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
                        onChange={handleChangeValues}
                        style={{ backgroundColor: 'white' }}
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
                        onChange={handleChangeValues}
                        style={{ backgroundColor: 'white' }}
                    />
                </Grid>
                {selectedOption === 'cnpj' && (
                    <>
                        {/* campos que só aparecem quando seleciona cnpj */}
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                color="success"
                                fullWidth
                                name="bairro"
                                label="Bairro"
                                id="bairro"
                                required
                                onChange={handleChangeValues}
                                style={{ backgroundColor: 'white' }}
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
                                onChange={handleChangeValues}
                                style={{ backgroundColor: 'white' }}
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
                                onChange={handleChangeValues}
                                style={{ backgroundColor: 'white' }}
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
                                onChange={handleChangeValues}
                                style={{ backgroundColor: 'white' }}
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
                                onChange={handleChangeValues}
                                style={{ backgroundColor: 'white' }}
                            />
                        </Grid>
                    </>
                )}
                <Grid item xs={12}>
                    <Button
                        type="submit"
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
    );
}
