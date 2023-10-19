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

  const [preco, setPreco] = useState("");

  const handlePrecoChange = (event) => {
    const input = event.target.value;
  
    // Remove all non-numeric and non-decimal point characters except for the first one
    const cleanedValue = input.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
  
    // Ensure there's at most one decimal point
    const decimalCount = (cleanedValue.match(/\./g) || []).length;
    if (decimalCount > 1) {
      return;
    }
  
    // Set the preco state with the cleaned value
    setPreco(cleanedValue);
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
        value={props.quantity}
        onChange={props.quantityChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">ml</InputAdornment>,
        }}
      />
      <TextField
        margin="normal"
        color="success"
        fullWidth
        id="preco"
        label="Preço"
        name="preco"
        autoComplete="preco"
        required
        autoFocus
        style={{ backgroundColor: 'white', marginBottom: '25px' }}
        value={preco}
        onChange={handlePrecoChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }}
      />
      <Autocomplete
        id="demo-single-chip"
        value={props.oilType}
        onChange={props.typeChange}
        options={names}
        style={{ backgroundColor: 'white', marginBottom: '10px' }}
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
        id="value"
        label="Valor"
        name="value"
        autoComplete="value"
        autoFocus
        style={{ backgroundColor: 'white' }}
        value={props.value}
        onChange={props.valueChange}
      />
    </>
  );
}

export default SolicitarEstabForm;
