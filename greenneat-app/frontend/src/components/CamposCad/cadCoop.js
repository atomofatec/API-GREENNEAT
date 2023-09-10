import { Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function CadCoop() {
    const [selectedOption, setSelectedOption] = useState('cpf'); // estado para armezenar escolha (cpf ou cnpj)

    // função de escolha
    const toggleOption = (option) => {
        setSelectedOption(option);
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
                                name="endereco"
                                label="Endereço"
                                id="endereco"
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
            </Grid>
        </>
    );
}
