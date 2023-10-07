import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [filtro, setFiltro] = React.useState('');

  const handleChange = (event) => {
    setFiltro(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: "25%" }} size="small">
        <InputLabel id="demo-simple-select-label">Filtrar...</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filtro}
          label="Filtrar"
          onChange={handleChange}
          color="success"
        >
          <MenuItem value={10}>Tipo</MenuItem>
          <MenuItem value={20}>Valor</MenuItem>
          <MenuItem value={30}>Região</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}