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
import AppBar from './AppBar'
import './style.scss'
import axios from 'axios';
import useContainerScroll from './useContainerScroll'
import IndexPage from './pages/IndexPage'
import BookPage from './pages/BookPage'

function Article({chapters}: any) {
  let content = []
  for (let [index, val] of chapters.entries()) {
      let key = 'chapter-' +(index+1);
      console.log(key)
      content.push(<Chapter key={key} title={val.title} content={val.content} />)
  }
  return (
    <>
    {content}
    </>
  )
}

function Chapter({title, content}: any) {
  let body = []
  for (let [index, val] of content.entries()) {
      let key = 'p-' +(index+1);
      console.log(key)
      body.push(<p key={key}>{val}</p>)
  }
  return (
    <>
    <h2>{title}</h2>
    {body}
    </>
  )
}

type ChapterType = {
  title: string,
  content: Array<string>
}

function ArticleShow({page = 0}) {
  let [chapterList, setChapterList] = React.useState<Array<ChapterType>>([])
  // let [isLoading, setLoading] = React.useState(false)
  const [loading, setLoading] = React.useState(false);
  let loadingRef = React.useRef(false)
  const { reachBottom, setReachBottom } = useContainerScroll('.article-show');

  let chapter = {
    title: '这里是很长的标题哦~~1111',
    content: [
      '帮助兵哥净化掉堕落圣杯的污染后，兄弟俩坐在冰窟中，张元清讲诉起复活后的经历，从三道山娘娘庙的佘灵隧道开始，一直讲到杀死星辰之主，开启第三大区。 如果是以前的张元清，肯定添油加醋，为自己的经历添加一些奇幻色彩，比如棺中苏醒的三道山娘娘，被他魅力折服，甘愿当一个护道者，只为太阳之主将来能垂青一二。 比如大名鼎鼎钱公子，初见他时，便瞧出他是人中龙凤，当即提出要桃园结义，做他的天使投资人。 又比如艳名远播的花公子，在见到他之后，就哭着跪下说：我今天才知道什么是撩妹高手，我大开眼界，大开眼界，公若不弃，钧愿拜为义父。 黄公子说：滚，他是我的义父！',
      '等等。',
      '但公正威严的太阳之主，实事求是，不添油不加醋，平铺直叙。 即便如此，兵哥仍是听的大为震撼，感慨道：“你的这次经历，可比魔君时期精彩多了。嗯，朋友也多了。不过嘛……” 他皱起眉头说：“你的那些风流债，怎么办？” 太阳之主言简意赅的回复：“纳入后宫。” 是因为你那半年来的频率和长度有没征服他们吗。',
    ]
  }

  let fetchNextPage = () => {
    if (!loadingRef.current ) {
      loadingRef.current = true
      // pageNum += 1;
      // .... fetch page data ...
      axios.get('https://api.npms.io/v2/search?q=react')
      .then((response) => {
        console.log('resp loading: ', loadingRef.current)
        setChapterList([
          ...chapterList,
          chapter
        ])
        console.log(chapterList)
      }).finally(() => {
        // setLoading(false)
        loadingRef.current = false
        // important
        setReachBottom(false)

        console.log('finally loading: ', loadingRef.current)
      })
    }
  }

  React.useEffect(() => {
    console.log('Article Show component did mount!!!');
    if ((reachBottom && !loadingRef.current) || chapterList.length == 0) {
      fetchNextPage();

      return () => {
        console.log('Article Show component unmount!!!');
      }
    }

  }, [reachBottom])
  

  return <Article chapters={chapterList} />
}


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
        <AppBar setState={setDrawerState} />

      <div className='content' id='scrollContent'>
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
          style={bottomNav !== 1 ? {display: 'none'} : {}}
        >
          <ArticleShow /> 
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

        <BtmNav onChange={onNavChange} value={bottomNav} />
        
    </Container>
    </>
  );
}
