import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import BtmNav from './BtmNav'
import AppBar from './AppBar'
import './style.scss'

export default function App() {
  const [bottomNav, setBottomNav] = React.useState(0);


  return (
    <Container maxWidth="sm" style={{'paddingLeft': 0, 'paddingRight': 0}}>
        <AppBar />
        <div className="content">

        </div>
        <BtmNav setValue={setBottomNav} value={bottomNav} />
    </Container>
  );
}
