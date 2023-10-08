import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import styles from './FormDialog.module.css';

interface FormDialogProps {
	handleSubmit: (event: React.FormEvent<HTMLFormElement>, topic: string, note: string) => void;
}

export default function FormDialog({ handleSubmit }: FormDialogProps) {
	const [open, setOpen] = React.useState(false);
	const [topic, setTopic] = React.useState('');
	const [note, setNote] = React.useState('');


	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmitForm = (event) => {
		setOpen(false);
		handleSubmit(event, topic, note);
	}

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
						value={topic}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setTopic(event.target.value);
						}}
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
						value={note}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setNote(event.target.value);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmitForm}>Post</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}