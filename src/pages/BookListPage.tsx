import * as React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';
import {
	useNavigate 
} from "react-router-dom";
import Container from '@mui/material/Container';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import styles from './book-list.module.scss'
import AppBar from '../components/AppBar';

function truncateString(str:string, maxLength:number=20) { 
	if (str.length > maxLength) { 
			return str.substring(0, maxLength - 3) + '...'; 
	} 
	return str; 
} 

function BookItem({id}: {id:number}) {
	const navigate = useNavigate();

	const goBook = (event: any) => {
			return navigate(`/book/${id}`)
	}

	return (
		<>
		<div className={styles['book-item']} onClick={goBook}>
			<div className={styles['book-img']}>
				<img src='https://img0.baidu.com/it/u=3194659325,3532417802&fm=253&fmt=auto&app=138&f=JPEG?w=512&h=500' />
			</div>
			<div className={styles['book-info']}>
				<h1>{truncateString('book title base style book info long test', 35)}</h1>
				<h2>author: lyh<i>2024-02-29</i></h2>
				<p>{truncateString('Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet', 63)}</p>
			</div>
		</div>
		</>
	)
}

export default function CategoryPage() {
	const navigate = useNavigate();

	return (
		<>
		<AppBar onClick={() => {return navigate('/')}} title='某某分类' icon={<ArrowBackIosIcon />} />
		<Container maxWidth="sm" style={{marginTop: 16}}>
			<Grid container spacing={1}>
				{
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(function (it) { return (
					<Grid xs={12}>
						<BookItem id={it} />
					</Grid>
					)})
				}
			</Grid>
		</Container>
		</>
	)
}