import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import styles from './CardDialog.module.css';

import Draggable from 'react-draggable';

interface FormDialogProps {
	handleSubmit: (event: React.FormEvent<HTMLFormElement>, topic: string, note: string) => void;
	card: {
		topic: string;
		note: string;
		id: string;
	}
}

export default function FormDialog({ handleSubmit, card }: FormDialogProps) {

	const [topic, setTopic] = React.useState('');
	const [note, setNote] = React.useState('');

	const [open, setOpen] = React.useState(false)
	const [dragging, setDragging] = React.useState(false)

	const handleStart = () => {
		setDragging(true);
	};

	const handleStop = () => {
		setTimeout(function () { setDragging(false) }, 500);
		if (!dragging) {
			setOpen(!open);
		}
	};

	const handleClickOpen = () => {
		if (!dragging) {
			setOpen(true);
		}

	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmitForm = (event) => {
		setOpen(false);
		handleSubmit(event, topic, note);
		setTopic('');
		setNote('');
	}



	return (
		<div className={styles.container}>
			<Draggable onDrag={handleStart} onStop={handleStop} >
				<div className={styles.notes} onClick={handleClickOpen}>
					<p className={styles.topic}>{card.topic}</p>
				</div>
			</Draggable >
			<Dialog
				open={open}
				onClose={handleClose}
				sx={{
					width: '800px',
					color: 'white',
				}}
			>
				<DialogTitle>{card.topic}</DialogTitle>
				<DialogContent>
					<p className={styles.note}>{card.note}</p>

				</DialogContent>
				<DialogActions>
					<Button onClick={handleSubmitForm}>Comment</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}