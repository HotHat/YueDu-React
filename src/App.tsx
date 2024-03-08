import * as React from 'react';
import Container from '@mui/material/Container';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import BtmNav from './BtmNav'
import AppBar from './components/AppBar'
import './style.scss'
import axios from 'axios';
import IndexPage from './pages/IndexPage'
import BookPage from './pages/BookPage'
import categoryPage from './pages/CategoryPage'
import MenuIcon from '@mui/icons-material/Menu';
import CategoryPage from './pages/CategoryPage';



interface NavPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

function NavPanel(props: NavPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      // hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={value !== index ? {display: 'none'} : {}}
    >
      {value === index && ( 
        <>
        {children}
        </>
      )
      }
    </div>
  );
}

function ShowContent({nav}: {nav: React.MutableRefObject<number>}) {
  let indexPage = React.useMemo(() => <IndexPage />, [])
  let articlePage = React.useMemo(() => <ArticleShow page={0} />, [])
  let bookPage = React.useMemo(() => <BookPage />, [])

  return (
    <div className='content' id='scrollContent'>
      <NavPanel value={nav.current} index={0}>
        {indexPage}
      </NavPanel>

      <NavPanel value={nav.current} index={1}>
        {articlePage}
      </NavPanel>

      <NavPanel value={nav.current} index={2}>
        {bookPage}
      </NavPanel>

    </div>
  )
}

export default function App() {
  const navIdex = 0;
  const [bottomNav, setBottomNav] = React.useState(navIdex);
  const [drawerState, setDrawerState] = React.useState(false)
  const btnNavRef = React.useRef(navIdex)
  const [showBarNav, setShowBarNav] = React.useState(true)
  const showBarNavRef = React.useRef(true)
  const [contentClass, setContentClass] = React.useState('content')


  const toggleDrawer = (open: boolean) => (event: any) => {
      setDrawerState(open)
  }

  const list = () => (
    <Box
      sx={{ width: 'auto'}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const onNavChange = (val: number) => {
    setBottomNav(val);
    btnNavRef.current = val
  }



  React.useEffect(() => {
      
    console.log('effect show bar nav', showBarNavRef.current, showBarNav)

  }, [showBarNav])

  const onMenuClick = (event: any) => {
    setDrawerState(true)
  }

  return (
    <>
    <SwipeableDrawer 
         anchor={'left'}
         onClose={toggleDrawer(false)}
         onOpen={toggleDrawer(true)}
         open={drawerState}
        >
        {list()}
    </SwipeableDrawer >
    <Container maxWidth="sm" style={{'paddingLeft': 0, 'paddingRight': 0}}>
        {showBarNavRef.current && <AppBar onClick={onMenuClick} icon={<MenuIcon />} title={'index'} /> }

        <div className={contentClass} id='scrollContent'>
          <div
            role="tabpanel"
            // hidden={value !== index}
            id={`simple-tabpanel-0`}
            className={'simple-tabpanel'}
            aria-labelledby={`simple-tab-0`}
            style={bottomNav !== 0 ? {display: 'none'} : {}}
          >
          <IndexPage /> 
        </div>

        <div
          role="tabpanel"
          // hidden={value !== index}
          id={`simple-tabpanel-1`}
          className={'simple-tabpanel article-show'}
          aria-labelledby={`simple-tab-1`}
          style={{
            display: bottomNav !== 1 ? 'none' : 'block'
          }}
        >
          <CategoryPage /> 
        </div>


        <div
          role="tabpanel"
          // hidden={value !== index}
          id={`simple-tabpanel-2`}
          className={'simple-tabpanel'}
          aria-labelledby={`simple-tab-2`}
          style={bottomNav !== 2 ? {display: 'none'} : {}}
        >
          <BookPage /> 
        </div>
      </div>

        {showBarNavRef.current && <BtmNav onChange={onNavChange} value={bottomNav} /> }
        
    </Container>
    </>
  );
}
