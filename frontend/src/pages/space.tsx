import styles from './space.module.css';
import Draggable from 'react-draggable';
import FormDialog from './FormDialog';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';


function NavBar({ id }) {

	const [sidebar, setSidebar] = useState(false);
	id = id.toUpperCase()

	function toggleSideBar() {
		setSidebar(!sidebar);
	}


	const sidebarStyle = sidebar ? styles.sidebarPage : styles.sidebarPageHidden;
	const burgerStyle = sidebar ? styles.burger : styles.burgerHidden;
	const lineTopStyle = sidebar ? styles.lineTop : styles.line;
	const lineBottomStyle = sidebar ? styles.lineBottom : styles.line;
	return (
		<>
			<button className={burgerStyle} onClick={toggleSideBar}>
				<div className={lineTopStyle}></div>
				<div className={lineBottomStyle}></div>
			</button>
			<h1 className={styles.title}>{id}</h1>

			<div className={sidebarStyle}>
				<nav>
					<ul className={styles.navbarPage}>
						{id != 'CLASSES' ? <Link to='/space/classes' className={styles.link}>Classes</Link> : null}
						{id != 'ROOMMATES' ? <Link to='/space/dormlife' className={styles.link}>Dorm Life</Link> : null}
						{id != 'FAMILY' ? <Link to='/space/family' className={styles.link}>Family</Link> : null}
						{id != 'SOCIAL' ? <Link to='/space/social' className={styles.link}>Social</Link> : null}
						{id != 'JOBS' ? <Link to='/space/jobs' className={styles.link}>Jobs</Link> : null}
						{id != 'OTHER' ? <Link to='/space/other' className={styles.link}>Other</Link> : null}

					</ul>

				</nav>
			</div>
		</>
	)
}

export default function Space() {

	/** Determines if a message is mean or not */
	async function isMean(content: string) {
		try {
			const response = await axios.post('https://api.openai.com/v1/chat/completions', {
				model: "gpt-3.5-turbo",
				messages: [
					{ "role": "user", "content": `Is the following content bullying or mean? Account for passive aggressiveness & sarcasm, & any type of mean content. Answer with only either 'yes' or 'no', in lower case - no full stops: "${content}"` }
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
	const { id } = useParams();




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
			<NavBar id={id} />
			<div>
				<ToastContainer />
				{
					notes.map((card) => (
						<Draggable key={card.id}>
							<div className={styles.notes}>
								<p className={styles.topic}>{card.topic}</p>
								<p className={styles.note}>{card.note}</p>
							</div>
						</Draggable >
					))
				}
			</div >
			<FormDialog handleSubmit={handleSubmit} />
		</>
	)
}
