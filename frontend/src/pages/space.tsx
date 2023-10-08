import styles from './space.module.css';
import Draggable from 'react-draggable';
import FormDialog from './FormDialog';
import { useState } from 'react';

export default function Space() {

	interface Note {
		topic: string;
		note: string;
		id: string;
	}

	const [notes, setNotes] = useState<Array<Note>>([]);

	// const cards = [
	// 	{
	// 		topic: 'hello',
	// 		note: 'world',
	// 		id: crypto.randomUUID()
	// 	},
	// 	{
	// 		topic: 'hello',
	// 		note: 'world',
	// 		id: crypto.randomUUID()
	// 	},
	// 	{
	// 		topic: 'hello',
	// 		note: 'world',
	// 		id: crypto.randomUUID()
	// 	}
	// ];

	function handleSubmit(event: React.FormEvent<HTMLFormElement>, topic: string, note: string) {
		event.preventDefault();
		setNotes([...notes, {
			topic: topic,
			note: note,
			id: crypto.randomUUID()
		}]);
	}

	return (
		<>

			<div>
				<h1>Space</h1>
				{
					notes.map((card) => (
						<Draggable key={card.id}>
							<div className={styles.notes}>
								<p>{card.topic}</p>
								<p>{card.note}</p>
							</div>
						</Draggable >
					))
				}
			</div >
			<FormDialog handleSubmit={handleSubmit} />
		</>
	)
}
