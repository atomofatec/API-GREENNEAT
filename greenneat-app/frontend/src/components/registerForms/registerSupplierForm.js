import { Button, Grid, TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material/styles';

export default function RegisterSupplierForm(props) {
    const locations = [
        'Norte',
        'Sul',
        'Leste',
        'Oeste'
    ];

    const theme = useTheme(); 
    
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        id="document"
                        label="CNPJ"
                        name="document"
                        autoComplete="cnpj"
                        required
                        autoFocus
                        style={{ backgroundColor: 'white' }}
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
                <Grid item xs={12}>
                <Autocomplete
                    name="location"
                    id="location"
                    value={props.location}
                    options={locations}
                    onChange={props.onChange}
                    isOptionEqualToValue={(option, value) => option === value}
                    style={{ backgroundColor: 'white' }}
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
                        sx={{ mt: 3, mb: 2, backgroundColor: '#136935' }}
                    >
                        Cadastrar
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}