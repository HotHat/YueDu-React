import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import BtmNav from './BtmNav'
import AppBar from './AppBar'
import './style.scss'

function ShowContent({nav}: {nav: number}) {
  let body = null;
  if (nav == 0) {
    body = <h1>content 1 test</h1>
  } else if (nav == 1) {
    body =  <h1>content 2 test</h1>
  } else if (nav == 2) {
    body = <h1>content 3 test</h1>
  }

  return (
    <div className='content'>
      <Container maxWidth={false} fixed={false}>
        {body}
      </Container>
    </div>
  )
}

export default function App() {
  const [bottomNav, setBottomNav] = React.useState(0);


  return (
    <Container maxWidth="sm" style={{'paddingLeft': 0, 'paddingRight': 0}}>
        <AppBar />

        <ShowContent nav={bottomNav} />

        <BtmNav setValue={setBottomNav} value={bottomNav} />
    </Container>
  );
}
