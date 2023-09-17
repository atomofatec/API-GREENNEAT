import React from 'react';
import Button from '@mui/material/Button';

function EnviarButton({ style }) {
  return (
    <Button
        type="submit"
        fullWidth
        variant="contained"
        color="success"
        size="large"
        sx={{ mt: 3, mb: 2, backgroundColor: '#136935'}}
    >
        Enviar
    </Button>
  );
}

export default EnviarButton;
