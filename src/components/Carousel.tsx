import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

export default function Index(props: any)
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
						src: "https://t7.baidu.com/it/u=4198287529,2774471735&fm=193&f=GIF"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
						src: "https://t7.baidu.com/it/u=1956604245,3662848045&fm=193&f=GIF"
        }
    ]

    return (
        <Carousel
					PrevIcon={null}
					NextIcon={null}
					animation={'slide'}
					swipe={true}
					interval={10000}
					duration={1500}
				>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props: any)
{
    return (
				<a>
					<img src={props.item.src} style={{height: 350}} />
					<h2 style={{marginTop:-40}}>{props.item.name}</h2>
				</a>
			)
}