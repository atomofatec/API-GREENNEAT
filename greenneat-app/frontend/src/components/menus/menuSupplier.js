import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Typography from '@mui/material/Typography';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WalletIcon from '@mui/icons-material/Wallet';
import HistoryIcon from '@mui/icons-material/History';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    {/*<ListItemButton component={Link} to="/carteira-estabelecimento" sx={{ color: 'white', height: '4rem' }}>
      <ListItemIcon>
        <WalletIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '18px', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Carteira
          </Typography>
        }
      />
    </ListItemButton>*/}
    <ListItemButton component={Link} to="/solicitar-estabelecimento" sx={{ color: 'white', height: '4rem' }}>
      <ListItemIcon>
        <CalendarTodayIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '18px', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Solicitar
          </Typography>
        }
      />
    </ListItemButton>
  </React.Fragment>
);
