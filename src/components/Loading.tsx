import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './loading.module.scss'


export default function Loading({isLoading}: {isLoading: boolean}) {

	return (
		<>
		{isLoading &&
		<div className={styles.loading}>
				<Box sx={{position: "absolute", top: "50%", left: "50%"}}>
					<CircularProgress />
				</Box>
		</div>
		}
		</>
	)

}