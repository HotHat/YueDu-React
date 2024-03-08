import * as React from 'react';
import Button from '@mui/material/Button';
import Loading from '../components/Loading';
import axios from 'axios';
import {
	useNavigate, useParams
} from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import AppBar from '../components/AppBar'

export default function BookPage() {
	const navigate = useNavigate();
	const {bookId} = useParams();
	const [isLoading, setLoading] = React.useState(true)


	React.useEffect(() => {
		console.log('book id:', bookId)
		axios.get('https://api.npms.io/v2/search?q=react')
		.then((response) => {

		}).finally(() => {
			setLoading(false)
		})

  }, [])

	return (
		<>

		<Loading isLoading={isLoading} />

		<AppBar onClick={() => {return navigate(-1)}} title='详情' icon={<ArrowBackIosIcon />} />

		<div className='book-img'>
			<img style={{height:350, width: "100%"}} src="https://t7.baidu.com/it/u=91673060,7145840&fm=193&f=GIF" />
		</div>
		<div style={{padding: "0 16px"}}>		
			<h1 style={{marginBottom: 0}}>This is Title</h1>
			<h4 style={{marginTop: 0, textAlign: "right"}}>update time</h4>
			<p>
			This is book description, a long desc
			</p>
			<Button variant="contained" onClick={() => {
				console.log('reading button click');
				return navigate(`/book/article/${bookId}/1`)
			}}>开始阅读</Button>
		</div>

		</>
	)
}