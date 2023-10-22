import { Button, Grid, TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export default function ProfileCoopForm(props) {

    const theme = useTheme(); 
    
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
                    />
                </Grid>
                <Grid item xs={6} sx={{ marginBottom: theme.spacing('-20px') }}>
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
                    />
                </Grid>
                <Grid item xs={6} sx={{ marginBottom: theme.spacing('-20px') }}>
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
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#0E681D' }}
                    >
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
