import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material/styles';

const names = [
  'Óleo Virgem',
  'Óleo Usado',
];

function SolicitarEstabForm({ style }) {
  const [valor, setValor] = useState("");

  const handleValorChange = (event) => {
    const input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, "").replace(/^0+/, "");
    setValor(numericValue || "0");
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

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
        style={{ backgroundColor: 'white', marginBottom: '25px' }}
        value={valor}
        onChange={handleValorChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">ml</InputAdornment>,
        }}
      />
      <Autocomplete
        id="demo-single-chip"
        value={personName}
        onChange={(event, newValue) => {
          setPersonName(newValue);
        }}
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
