import styles from './space.module.css';
import Draggable from 'react-draggable';
import FormDialog from './FormDialog';
import axios from 'axios';
import { useState } from 'react';

export default function Space() {

	/** Determines if a message is mean or not */
	async function isMean(content: string) {
		try {
			const response = await axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', {
				model: "gpt-3.5-turbo",
				prompt: `Is the following content bullying or mean? Answer yes or no: "${content}"`,
				max_tokens: 10,
			}, {
				headers: {
					'Authorization': `Bearer ${(import.meta.env.VITE_OPENAI_API_KEY as string)}`,
					'Content-Type': 'application/json'
				}
				
			});
		
			/** Process the response to get the answer */
			const answer = response.data.choices[0].text.trim().toLowerCase();
			console.log(answer, content)
			return answer === "yes";
		} catch (error) {
			console.error('Error calling the API', error);
			return false;  // Default to not bullying if there's an error
		}
	}

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

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>, topic: string, note: string) {
		event.preventDefault();
	  
		const bullyingDetected = await isMean(note);
		console.log(bullyingDetected)
	  
		if (bullyingDetected) {
		  alert('The content you entered is considered bullying or mean. Please refrain from such content.');
		} else {
		  setNotes([...notes, {
			topic: topic,
			note: note,
			id: crypto.randomUUID()
		  }]);
		}
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
