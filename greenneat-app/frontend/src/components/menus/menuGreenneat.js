import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BalanceIcon from '@mui/icons-material/Balance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Typography from '@mui/material/Typography';
import HistoryIcon from '@mui/icons-material/History';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/dashboard-greenneat" sx={{ color: 'white', height: '4rem' }}>
      <ListItemIcon>
        <BarChartIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '18px', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Dashboard
          </Typography>
        }
      />
    </ListItemButton>
    <ListItemButton component={Link} to="/usuarios-greenneat" sx={{ color: 'white', height: '4rem' }}>
      <ListItemIcon>
        <PeopleAltIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '18px', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Usuários
          </Typography>
        }
      />
    </ListItemButton>
    <ListItemButton component={Link} to="/comparador-Greenneat" sx={{ color: 'white', height: '4rem' }}>
      <ListItemIcon>
        <BalanceIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '18px', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Comparador
          </Typography>
        }
      />
    </ListItemButton>
    <ListItemButton component={Link} to="/transacoes-greenneat" sx={{ color: 'white', height: '4rem' }}>
      <ListItemIcon>
        <ReceiptIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '18px', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Transações 
          </Typography>
        }
      />
    </ListItemButton>
    <ListItemButton component={Link} to="/historico-movimentacao" sx={{ color: 'white', height: '4rem' }}>
      <ListItemIcon>
        <HistoryIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '18px', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Histórico
          </Typography>
        }
      />
    </ListItemButton>
  </React.Fragment>
);
