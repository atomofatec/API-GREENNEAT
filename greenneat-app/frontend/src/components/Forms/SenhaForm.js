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
                        name="password"
                        label=" Nova senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        required
                        style={{ backgroundColor: 'white' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        margin="normal"
                        color="success"
                        fullWidth
                        name="password"
                        label="Confirmar senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
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
