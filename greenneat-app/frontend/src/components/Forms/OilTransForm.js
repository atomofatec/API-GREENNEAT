import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const names = [
  'Óleo Virgem',
  'Óleo Usado',
];

function OilTransForm(props) {
  const theme = useTheme();
  
  return (
    <>
      <TextField
        margin="normal"
        color="success"
        fullWidth
        required
        id="valor"
        label="Valor"
        name="valor"
        autoComplete="valor"
        autoFocus
        style={{ backgroundColor: 'white' }}
        value={props.valor}
        onChange={props.valorChange}
      />
      <Autocomplete
        id="demo-single-chip"
        value={props.oilType}
        onChange={props.typeChange}
        options={names}
        isOptionEqualToValue={(option, value) => option === value}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tipo"
            variant="outlined"
            color="success"
            required
            fullWidth
          />
        )}
        renderOption={(props, option, { selected }) => (
          <li {...props} style={{ fontWeight: selected ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular }}>
            {option}
          </li>
        )}
      />
      <TextField
        margin="normal"
        color="success"
        fullWidth
        required
        id="quantidade"
        label="Quantidade"
        name="quantidade"
        autoComplete="quantidade"
        autoFocus
        style={{ backgroundColor: 'white' }}
        value={props.quantidade}
        onChange={props.quantidadeChange}
      />
    </>
  );
}

export default OilTransForm;
