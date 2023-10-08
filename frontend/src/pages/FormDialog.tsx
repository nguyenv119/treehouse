import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import styles from './FormDialog.module.css';
export default function FormDialog() {
	const [open, setOpen] = React.useState(false);
	const [topic, setTopic] = React.useState('');
	const [note, setNote] = React.useState('');


	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={styles.container}>
			<Button variant="contained" onClick={handleClickOpen}>
				Write a note
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>What is on your mind?</DialogTitle>
				<DialogContent>
					{/* <DialogContentText>
						Topic (optional)
					</DialogContentText> */}
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Topic (optional)"
						fullWidth
						variant="standard"
					/>
					{/* <DialogContentText>

					</DialogContentText> */}
					<TextField
						autoFocus
						margin="dense"
						label="Note"
						fullWidth
						variant="standard"
						id="filled-multiline-static"
						multiline
						rows={2}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleClose}>Post</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}