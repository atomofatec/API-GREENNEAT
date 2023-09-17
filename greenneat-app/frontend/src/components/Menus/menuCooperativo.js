import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PaidIcon from '@mui/icons-material/Paid';
import Typography from '@mui/material/Typography';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WalletIcon from '@mui/icons-material/Wallet';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/dashboard-cooperativo" sx={{ color: 'white' }}>
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
    <ListItemButton component={Link} to="/carteira-cooperativo" sx={{ color: 'white' }}>
      <ListItemIcon>
        <WalletIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '1rem', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Carteira
          </Typography>
        }
      />
    </ListItemButton>
    <ListItemButton component={Link} to="#" sx={{ color: 'white' }}>
      <ListItemIcon>
        <PaidIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '1rem', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Saldo #
          </Typography>
        }
      />
    </ListItemButton>
    <ListItemButton component={Link} to="#" sx={{ color: 'white' }}>
      <ListItemIcon>
        <CalendarTodayIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '1rem', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Solicitar #
          </Typography>
        }
      />
    </ListItemButton>
    <ListItemButton component={Link} to="#" sx={{ color: 'white' }}>
      <ListItemIcon>
        <HistoryIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '1rem', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Histórico #
          </Typography>
        }
      />
    </ListItemButton>
  </React.Fragment>
);
