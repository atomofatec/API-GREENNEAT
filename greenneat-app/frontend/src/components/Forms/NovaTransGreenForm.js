import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

function NovaTransGreenForm(props) {
  
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
        value={props.cnpj}
        onChange={props.cnpjChange}
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
        value={props.valor}
        onChange={props.valueChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">R$</InputAdornment>,
        }}
      />
    </>
  );
}

export default NovaTransGreenForm;
