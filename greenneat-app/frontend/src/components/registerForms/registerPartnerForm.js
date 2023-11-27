import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function RegisterPartnerForm() {
    const [selectedOption, setSelectedOption] = useState('cpf'); // estado para armezenar escolha (cpf ou cnpj)

    // função de escolha
    const toggleOption = (option) => {
        setSelectedOption(option);
    };

    const formatCPF = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 11);
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
        if (match) {
            return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
        }
        return cleaned;
    };

    const formatCNPJ = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 14);
        const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
        if (match) {
            return `${match[1]}.${match[2]}.${match[3]}/${match[4]}-${match[5]}`;
        }
        return cleaned;
    };

    const formatPhone = (value) => {
        const cleaned = value.replace(/\D/g, '').slice(0, 11);
        const match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
        }
        return cleaned;
    };  

    const handleInputNumberChange = (event) => {
        event.target.value = event.target.value.replace(/\D/g, '');
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        let formattedValue = inputValue;
    
        if (e.target.name === 'telefone') {
            formattedValue = formatPhone(inputValue);
        } else if (selectedOption === 'cpf') {
            formattedValue = formatCPF(inputValue);
        } else if (selectedOption === 'cnpj') {
            formattedValue = formatCNPJ(inputValue);
        }
    
        e.target.value = formattedValue;
    };

    return (
        <>
            {/* campos comuns (aparecem em cnpj e cpf) */}
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        id="document"
                        label={selectedOption === 'cpf' ? 'CPF' : 'CNPJ'}
                        name="document"
                        autoComplete={selectedOption === 'cpf' ? 'cpf' : 'cnpj'}
                        required
                        autoFocus
                        style={{ backgroundColor: 'white' }}
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
                        sx={{ mt: 3, mb: 2, backgroundColor: '#0E681D' }}
                    >
                        Cadastrar
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
