import styles from './space.module.css';
import Draggable from 'react-draggable';
import FormDialog from './FormDialog';
// import CardDialog from './CardDialog';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';
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
						{id != 'DORMLIFE' ? <Link to='/space/dormlife' className={styles.link}>Dorm Life</Link> : null}
						{id != 'FAMILY' ? <Link to='/space/family' className={styles.link}>Family</Link> : null}
						{id != 'SOCIAL' ? <Link to='/space/social' className={styles.link}>Social</Link> : null}
						{id != 'JOBS' ? <Link to='/space/jobs' className={styles.link}>Jobs</Link> : null}
						{id != 'OTHER' ? <Link to='/space/other' className={styles.link}>Other</Link> : null}
						<Link to='/' className={styles.linkHome}>Home</Link>
					</ul>

				</nav>
			</div>
		</>
	)
}

export default function Space() {

	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const getRandomPosition = (max) => {
			return Math.floor(Math.random() * max);
		};

		const randomX = getRandomPosition(window.innerWidth - 400); // Adjust width
		const randomY = getRandomPosition(window.innerHeight - 100); // Adjust height
		// console.log(randomX, randomY)
		setPosition({ x: randomX, y: randomY });
	}, []);

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
			// console.log(answer)
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

	const [reply, setReply] = useState('');
	const [comments, setComments] = useState('');

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>, topic: string, note: string) {
		event.preventDefault();

		const noteBullyingDetected = await isMean(note);
		const replyBullyingDetected = await isMean(reply);
		const commentsBullyingDetected = await isMean(comments);

		if (noteBullyingDetected || replyBullyingDetected || commentsBullyingDetected) {
			toast.error('The content you entered is considered bullying or mean. Please refrain from such content.');
		} else {
			setNotes([...notes, {
				topic: topic,
				note: note,
				reply: reply,
				comments: comments,
				id: crypto.randomUUID()
			}]);
			setReply('');
			setComments('');
		}
	}

	const [open, setOpen] = useState(false)
	const [dragging, setDragging] = useState(false)

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

	const handleClose = async (event) => {
		event.preventDefault();
	
		const replyBullyingDetected = await isMean(reply);
		const commentsBullyingDetected = await isMean(comments);

		console.log(replyBullyingDetected, commentsBullyingDetected);
	
		if (replyBullyingDetected || commentsBullyingDetected) {
			toast.error('The content you entered in the reply or comments is considered bullying or mean. Please refrain from such content.');
		} else {
			setOpen(false);
			setReply('');
			setComments('');
		}
	};
	

	return (
		<>
			<NavBar id={id} />
			<div>
				<ToastContainer />
				{
					notes.map((card) => (
						<div key={card.id} >
							{
							open ? (
								<div className={styles.popup} onClick={handleClose}>
									<div className={styles.popupContainer}>
										<p className={styles.note}>{card.note}</p>
										<div>
											<p>Reply</p>
											<textarea
												className={styles.textarea}
												name="Reply"
												rows="6"
												placeholder="Your Reply"
												value={reply}
												onChange={e => setReply(e.target.value)}
												onClick={(event) => event.stopPropagation()}
											/>
											<p>Comments</p>
											<textarea
												className={styles.textarea}
												name="Comments"
												rows="6"
												placeholder="Comments"
												value={comments}
												onChange={e => setComments(e.target.value)}
												onClick={(event) => event.stopPropagation()}
											/>
											{/* Modify this button: */}
											<button onClick={() => handleSubmit(event, card.topic, card.note)} className={styles.niceButton}>Submit</button>
										</div>
									</div>
								</div>
							) : (
								<Draggable onDrag={handleStart} onStop={handleStop} defaultPosition={position}>
									<div className={styles.notes} onClick={handleClickOpen}>
										<p className={styles.topic}>{card.topic}</p>
									</div>
								</Draggable>
							)
						}
						</div>
					))
				}
			</div>
			<FormDialog handleSubmit={handleSubmit} />
		</>
	);
}
