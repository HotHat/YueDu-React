import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './loading.scss'


export default function Loading({isLoading}: {isLoading: boolean}) {

	return (
		<>
		<div className='loading'>
				<Box sx={{position: "absolute", top: "50%", left: "50%"}}>
					<CircularProgress />
				</Box>
		</div>
		</>
	)

}