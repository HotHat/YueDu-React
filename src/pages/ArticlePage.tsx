
import * as React from 'react';
import useContainerScroll from '../useContainerScroll'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import AppBar from '../components/AppBar'
import MenuIcon from '@mui/icons-material/Menu';
import styles from './article.module.scss'
import XYPullUp from '../components/PullToRefresh';
// import Tloader from '../components/react-touch-loader';
// import ScrollView from 'react-fast-scroll';



function Article({chapters}: any) {
  
  return (
    <>
      {chapters && chapters.map((it: ChapterType, index:number) => {
        return <Chapter key={index} title={it.title} content={it.content} />
      })}
    </>
  )
}

function Chapter({title, content}: any) {
  let body = []
  for (let [index, val] of content.entries()) {
      let key = 'p-' +(index+1);
      // console.log(key)
      body.push(<p key={key}>{val}</p>)
  }
  return (
    <li>
    <h2>{title}</h2>
    {body}
    </li>
  )
}

type ChapterType = {
  title: string,
  content: Array<string>
}

function sleepAsync(fun: () => void, sec: number) {
  return new Promise((resolve) => {
      setTimeout(() => {
          fun()
          resolve(true)
      }, sec * 1000)
  })
}

export default function ArticlePage() {

	const {bookId, chapterId} = useParams();

  let [chapterList, setChapterList] = React.useState<Array<ChapterType>>([])
  // let [isLoading, setLoading] = React.useState(false)
  const [loading, setLoading] = React.useState(false);
  let loadingRef = React.useRef(false)
  let parentClass = '#scroll-content';
  // const { reachBottom, setReachBottom } = useContainerScroll(parentClass);
  // const [ reachBottom, setReachBottom ] = React.useState(false);
  const [drawerState, setDrawerState] = React.useState(false)
  // const [isPullUpLoad, setPullUpLoad] = React.useState(false)
  const scrollRef = React.useRef(null)

  // usePullToRefresh(scrollRef, () => {console.log('pull to refresh action')})

  let chapter = {
    title: '这里是很长的标题哦~~1111',
    content: [
      '帮助兵哥净化掉堕落圣杯的污染后，兄弟俩坐在冰窟中，张元清讲诉起复活后的经历，从三道山娘娘庙的佘灵隧道开始，一直讲到杀死星辰之主，开启第三大区。 如果是以前的张元清，肯定添油加醋，为自己的经历添加一些奇幻色彩，比如棺中苏醒的三道山娘娘，被他魅力折服，甘愿当一个护道者，只为太阳之主将来能垂青一二。 比如大名鼎鼎钱公子，初见他时，便瞧出他是人中龙凤，当即提出要桃园结义，做他的天使投资人。 又比如艳名远播的花公子，在见到他之后，就哭着跪下说：我今天才知道什么是撩妹高手，我大开眼界，大开眼界，公若不弃，钧愿拜为义父。 黄公子说：滚，他是我的义父！',
      '等等。',
      // '但公正威严的太阳之主，实事求是，不添油不加醋，平铺直叙。 即便如此，兵哥仍是听的大为震撼，感慨道：“你的这次经历，可比魔君时期精彩多了。嗯，朋友也多了。不过嘛……” 他皱起眉头说：“你的那些风流债，怎么办？” 太阳之主言简意赅的回复：“纳入后宫。” 是因为你那半年来的频率和长度有没征服他们吗。',
    ]
  }

  let fetchNextPage = () => {
      // setPullUpLoad(true)
      console.log('better scroll pull up~~~ event trigger')
      sleepAsync(() => {
        setChapterList((old) => [
          ...old,
          chapter
        ])

        // bs.finishPullUp()
        // setPullUpLoad(false)
      }, 3)
      // axios.get('https://api.npms.io/v2/search?q=react')
      // .then((response) => {
      //   console.log('bs resp loading: ', loadingRef.current)
      //   console.log('bf request', chapterList)
      //   setChapterList((old) => [
      //     ...old,
      //     chapter
      //   ])
      //   console.log(chapterList)
      // }).finally(() => {

      //   console.log('bs finally loading: ', loadingRef.current)
      //   bs.finishPullUp()
      //   bs.refresh()
      //   setPullUpLoad(false)
      // })
  }

	// const onArticleClick = (event: Event) => {
    // console.log('article content click')
  // }

  // let bs = new BetterScroll('#scroll-content', {pullUpLoad: true})

  React.useEffect(() => {
      console.log('init~~~~~~~~~~~~')
      fetchNextPage()
      // fetchNextPage()
      // fetchNextPage()



      // fetchNextPage()
      // setTimeout(() => {
      //   console.log('scroll ref', scrollRef.current)
      //   bs = new BScroll(scrollRef.current, {
      //     pullUpLoad: {threshold: 64}, 
      //   })
    
      // bs.on('pullingUp', () => {
      //   console.log('do pulling up action')
      //   fetchNextPage()
      //   // bs.finishPullUp()
      //   bs.refresh()
      // })

  }, [])


  React.useEffect(() => {
      console.log('chapter list update', chapterList)

  }, [chapterList])
  let refresh = () =>{
    return new Promise((resolve: any) => {
      setTimeout(() => {
        setChapterList([])  

        fetchNextPage();

        resolve();
   
      }, 100);
    })
  } 

  let loadMore = () =>{
    return new Promise((resolve: any) => {
      setTimeout(() => {

        fetchNextPage();

        resolve(true);
   
      }, 100);
    })
  } 
  

  return (<>
	<SwipeableDrawer 
         anchor={'left'}
         onClose={()=>setDrawerState(false)}
         onOpen={()=>setDrawerState(true)}
         open={drawerState}
        >
	</SwipeableDrawer >
	<AppBar onClick={() => {setDrawerState(true)} } icon={<MenuIcon />} title={'某某书'} /> 
  <div className={styles['pull-wrapper']} >

    <XYPullUp onTrigger={loadMore} >
      
          <ul className={styles["pull-list"]}>
            <Article chapters={chapterList} />
          </ul>
    </XYPullUp>

  </div>

	</>)
}