import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function CarteiraCoopSolForm( props ) {
  

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
        value={props.valor}
        onChange={props.onChange}
      />
    </>
  );
}

export default CarteiraCoopSolForm;