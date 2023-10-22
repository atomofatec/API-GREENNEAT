import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

function CarteiraCoopEnvForm(props) {

  return (
    <>
      <TextField
        margin="normal"
        color="success"
        fullWidth
        required
        id="cnpj"
        label="CNPJ"
        name="cnpj"
        autoComplete="cnpj"
        autoFocus
        style={{ backgroundColor: 'white' }}
        value={props.cnpj}
        onChange={props.onChangeCnpj}
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
        onChange={props.onChangeValor}
        InputProps={{
          endAdornment: <InputAdornment position="end">R$</InputAdornment>,
        }}
      />
    </>
  );
}

export default CarteiraCoopEnvForm;
