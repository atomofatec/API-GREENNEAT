import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

function SubTitle(props) {
  return (
    <Typography component="h5" variant="h8" color="#0E681D" fontFamily="'Century Gothic', Futura, sans-serif" gutterBottom>
      {props.children}
    </Typography>
  );
}

SubTitle.propTypes = {
  children: PropTypes.node,
};

export default SubTitle;