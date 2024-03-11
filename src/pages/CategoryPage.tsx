import * as React from 'react';
import Button from '@mui/material/Button';
import Loading from '../components/Loading';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import {
	useNavigate 
} from "react-router-dom";
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CategoryPage() {
	const navigate = useNavigate();

	const categoryList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(function (it) { return {
		id: it, title:"分类" + it
	}});
	// [
	// 	{id: 1, title:"分类1"},
	// 	{id: 2, title:"分类2"},
	// 	{id: 3, title:"分类3"},
	// 	{id: 4, title:"分类4"},
	// 	{id: 5, title:"分类5"},
	// 	{id: 6, title:"分类6"},
	// ]

	return (
		<>
		<Container maxWidth="sm" style={{marginTop: 16}}>
			<Grid container spacing={1}>
				{
					categoryList.map((it) => {
							return <Grid xs={6}><Button style={{width:'100%'}} variant="text" onClick={()=> navigate(`/book/list/${it.id}`) }>{it.title}</Button></Grid>
					})
				}
				</Grid>
		</Container>
		</>
	)
}