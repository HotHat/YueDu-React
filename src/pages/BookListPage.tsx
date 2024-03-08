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
import styles from './book-list.module.scss'


function BookItem() {
	return (
		<>
		<div className={styles['book-item']}>
			<div className={styles['book-img']}>
				<img src='https://img0.baidu.com/it/u=3194659325,3532417802&fm=253&fmt=auto&app=138&f=JPEG?w=512&h=500' />
			</div>
			<div className={styles['book-info']}>
				<h1>book title base style book info long test</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
			</div>
		</div>
		</>
	)
}

export default function CategoryPage() {
	const navigate = useNavigate();

	return (
		<>
		<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
						style={{marginRight: 0}}
            sx={{ mr: 2 }}
						onClick={() => {return navigate('/')}}
          >
            <ArrowBackIosIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						某某分类
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Container maxWidth="sm" style={{marginTop: 16}}>
			<Grid container spacing={1}>
				<Grid xs={12}>
					<BookItem />
				</Grid>
				<Grid xs={12}>
					<BookItem />
				</Grid>
				<Grid xs={12}>
					<BookItem />
				</Grid>
				<Grid xs={12}>
					<BookItem />
				</Grid>
			</Grid>
		</Container>
		</>
	)
}