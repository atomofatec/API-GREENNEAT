import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function CarteiraCoopSolForm({ style }) {
  const [valor, setValor] = useState("");

  const handleValorChange = (event) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, "").replace(/^0+/, "");
    setValor(numericValue || "0");
  };

  return (
    <>
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
      <TextField
        margin="normal"
        color="success"
        fullWidth
        id="number"
        label="Valor"
        name="number"
        autoComplete="valor"
        required
        autoFocus
        style={{ backgroundColor: 'white' }}
        value={valor}
        onChange={handleValorChange}
      />
    </>
  );
}

export default CarteiraCoopSolForm;
