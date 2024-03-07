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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CategoryPage() {
	const navigate = useNavigate();

	return (
		<>
		<Grid container spacing={0.5}>
			<Grid xs={6}>
				<Item>xs=6</Item>
			</Grid>
			<Grid xs={6}>
				<Item>xs=6</Item>
			</Grid>
			<Grid xs={6}>
				<Item>xs=6</Item>
			</Grid>
			<Grid xs={6}>
				<Item>xs=6</Item>
			</Grid>
		</Grid>
		<Button onClick={() => {return navigate('/')}} >Click</Button>
		</>
	)
}