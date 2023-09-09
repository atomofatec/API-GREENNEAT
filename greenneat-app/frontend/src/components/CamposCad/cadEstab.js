import { TextField } from "@mui/material";

export default function CadEstab() {
    return (
        <>
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
            />
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
        </>
    )
}