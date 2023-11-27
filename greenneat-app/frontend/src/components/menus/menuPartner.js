import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PaidIcon from '@mui/icons-material/Paid';
import Typography from '@mui/material/Typography';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WalletIcon from '@mui/icons-material/Wallet';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    {/*<ListItemButton component={Link} to="/dashboard-cooperativo" sx={{ color: 'white', height: '4rem' }}>
      <ListItemIcon>
        <BarChartIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '18px', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Dashbord
          </Typography>
        }
      />
    </ListItemButton>*/}
    <ListItemButton component={Link} to="/carteira-cooperativo" sx={{ color: 'white', height: '4rem' }}>
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
    </ListItemButton>
    <ListItemButton
      component={Link}
      to="/solicitacoes-coleta-cooperativo"
      sx={{ color: "white" }}
    >
      <ListItemIcon>
        <CalendarTodayIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '18px', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Solicitações
          </Typography>
        }
      />
    </ListItemButton>
    <ListItemButton component={Link} to="/transacao-oleo" sx={{ color: 'white', height: '4rem' }}>
      <ListItemIcon>
        <TrackChangesIcon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="body2" style={{ fontSize: '18px', fontFamily: "'Century Gothic', Futura, sans-serif" }}>
            Movimentação
          </Typography>
        }
      />
    </ListItemButton>
  </React.Fragment>
);
