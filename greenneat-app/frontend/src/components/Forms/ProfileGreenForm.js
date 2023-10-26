import { Button, Grid, TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export default function ProfileGreenForm(props) {

    const theme = useTheme(); 
    
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        disabled
                        id="greenneat"
                        label="Greenneat"
                        name="greenneat"
                        autoComplete="greenneat"
                        autoFocus
                        style={{ backgroundColor: 'white' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        disabled
                        id="subtitulo"
                        label="Limpeza sustentável"
                        name="subtitulo"
                        autoComplete="subtitulo"
                        autoFocus
                        style={{ backgroundColor: 'white' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        disabled
                        id="email"
                        label="greenneat@email.com"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        style={{ backgroundColor: 'white' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        disabled
                        id="perfil"
                        label="Administrador"
                        name="perfil"
                        autoComplete="perfil"
                        autoFocus
                        style={{ backgroundColor: 'white' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                        disabled
                        sx={{ mt: 3, mb: 2, backgroundColor: '#0E681D' }}
                    >
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
