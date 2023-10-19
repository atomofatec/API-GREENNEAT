import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function NovaTransButton({ onClick, style }) {
  const buttonStyles = {
    backgroundColor: '#136935',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const iconStyles = {
    marginRight: '0.2rem',
    marginTop: '0.3rem',
    marginBottom: '0.3rem',
  };

  return (
    <Button variant="contained" color="success" sx={buttonStyles} onClick={onClick} style={style}>
      <AddIcon sx={iconStyles} />
      Nova Transação
    </Button>
  );
}

export default NovaTransButton;
