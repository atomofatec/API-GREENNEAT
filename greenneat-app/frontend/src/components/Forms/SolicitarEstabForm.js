import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material/styles';

const names = [
  'Óleo Virgem',
  'Óleo Usado',
];

function SolicitarEstabForm(props) {

  const theme = useTheme();
  const [personName, setPersonName] = React.useState('');

  return (
    <>
      <TextField
        margin="normal"
        color="success"
        fullWidth
        disabled
        id="parceiroCooperativo"
        label="Parceiro Cooperativo"
        name="parceiroCooperativo"
        autoComplete="parceiroCooperativo"
        autoFocus
        style={{ backgroundColor: 'white' }}
      />
      <TextField
        margin="normal"
        color="success"
        fullWidth
        id="quantidade"
        label="Quantidade"
        name="quantidade"
        autoComplete="valor"
        required
        autoFocus
        style={{ backgroundColor: 'white' }}
        value={props.quantity}
        onChange={props.quantityChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">L</InputAdornment>,
        }}
      />
      <TextField
        margin="normal"
        color="success"
        fullWidth
        id="value"
        label="Valor"
        name="value"
        autoComplete="value"
        required
        autoFocus
        style={{ backgroundColor: 'white', marginBottom: '25px' }}
        value={props.value}
        onChange={props.valueChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">R$</InputAdornment>,
        }}
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
    </>
  );
}

export default SolicitarEstabForm;
