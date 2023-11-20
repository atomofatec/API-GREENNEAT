import { Button, Grid, TextField} from "@mui/material";

export default function RegisterPartnerForm() {

    return (
        <>
            <Grid spacing={0}>
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
                        style={{ backgroundColor: 'white', width: '38vw' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                        sx={{ mt: 3, mb: 2, backgroundColor: '#0E681D', width:'38vw'  }}
                    >
                        Enviar
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
