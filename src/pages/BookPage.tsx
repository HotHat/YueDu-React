import * as React from 'react';
import Button from '@mui/material/Button';
import Loading from '../components/Loading';
import axios from 'axios';

export default function BookPage() {
	const [isLoading, setLoading] = React.useState(true)

	React.useEffect(() => {
		axios.get('https://api.npms.io/v2/search?q=react')
		.then((response) => {

		}).finally(() => {
			setLoading(false)
		})

  }, [])

	return (
		<>

		<Loading isLoading={isLoading} />

		<div className='book-img'>
			<img style={{height:350, width: "100%"}} src="https://t7.baidu.com/it/u=91673060,7145840&fm=193&f=GIF" />
		</div>
		<div style={{padding: "0 16px"}}>		
			<h1 style={{marginBottom: 0}}>This is Title</h1>
			<h4 style={{marginTop: 0, textAlign: "right"}}>update time</h4>
			<p>
			This is book description, a long desc
			</p>
			<Button variant="contained">开始阅读</Button>
		</div>

		</>
	)
}