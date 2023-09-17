import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function NovaTransGreenForm({ style }) {
  const [cnpj, setCnpj] = useState("");
  const [valor, setValor] = useState("");

  const handleCnpjChange = (event) => {
    let input = event.target.value;
    
    input = input.replace(/[^0-9]/g, "");
    
    if (input.length > 14) {
      input = input.slice(0, 14);
    }

    setCnpj(input);
  };

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
        required
        id="cnpj"
        label="CNPJ ou CPF"
        name="cnpj"
        autoComplete="cnpj"
        autoFocus
        style={{ backgroundColor: 'white' }}
        value={cnpj}
        onChange={handleCnpjChange}
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

export default NovaTransGreenForm;
