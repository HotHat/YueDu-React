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
						分类
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Container maxWidth="sm">
			<Grid container spacing={1}>
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
		</Container>
		</>
	)
}