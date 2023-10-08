import styles from './space.module.css';
import Draggable from 'react-draggable';
import FormDialog from './FormDialog';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

export default function Space() {

	/** Determines if a message is mean or not */
	async function isMean(content: string) {
		try {
			const response = await axios.post('https://api.openai.com/v1/chat/completions', {
				model: "gpt-3.5-turbo",
				messages: [
					{"role": "user", "content": `Is the following content bullying or mean? Account for passive aggressiveness & sarcasm, & any type of mean content. Answer with only either 'yes' or 'no', in lower case - no full stops: "${content}"`}
				]
			}, {
				headers: {
					'Authorization': `Bearer ${(import.meta.env.VITE_OPENAI_API_KEY as string)}`,
					'Content-Type': 'application/json'
				}
			});
		
			/** Process the response to get the answer */
			const answer = response.data.choices[0].message.content.trim().toLowerCase();
			console.log(answer)
			return answer === "yes";
		} catch (error) {
			console.error('Error calling the API:', error.response ? error.response.data : error);
			return false;  
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
		console.log("Bullying is " + bullyingDetected)
	  
		if (bullyingDetected) {
		  toast.error('The content you entered is considered bullying or mean. Please refrain from such content.');
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
				<ToastContainer />
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
