import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BalanceIcon from '@mui/icons-material/Balance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="#" sx={{ color: 'white' }}>
      <ListItemIcon>
        <BarChartIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '1rem', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Dashbord
          </Typography>
        }
      />
    </ListItemButton>
    <ListItemButton component={Link} to="#" sx={{ color: 'white' }}>
      <ListItemIcon>
        <PeopleAltIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '1rem', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Usuários
          </Typography>
        }
      />
    </ListItemButton>
    <ListItemButton component={Link} to="#" sx={{ color: 'white' }}>
      <ListItemIcon>
        <BalanceIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '1rem', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Comparador
          </Typography>
        }
      />
    </ListItemButton>
    <ListItemButton component={Link} to="#" sx={{ color: 'white' }}>
      <ListItemIcon>
        <ReceiptIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '1rem', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Transações
          </Typography>
        }
      />
    </ListItemButton>
  </React.Fragment>
);
