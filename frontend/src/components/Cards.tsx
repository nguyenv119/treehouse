import styles from './Cards.module.css';
import { useNavigate } from 'react-router-dom';

export default function Cards() {
	const navigate = useNavigate();

	function handleClick() {
		navigate('/space/1');
	}

	return (
		<>
			<div id='spaces'>
				<div className={styles.container} id="services">
					<h1 className={styles.title}>Welcome to Spaces :)</h1>
					<div className={styles.serviceList}>
						<div className={styles.box1} onClick={handleClick}>
							{/* <i className="fa-solid fa-car"></i> */}
							<h2>Topic</h2>
							<p>Question</p>
							<a href="">Reply</a>
						</div>
						<div className={styles.box2}>
							{/* <i className="fa-solid fa-car"></i> */}
							<h2>Topic</h2>
							<p>Question</p>
							<a href="">Reply</a>
						</div>
						<div className={styles.box3}>
							{/* <i className="fa-solid fa-car"></i> */}
							<h2>Topic</h2>
							<p>Question</p>
							<a href="">Reply</a>
						</div>
						<div className={styles.box4}>
							{/* <i className="fa-solid fa-car"></i> */}
							<h2>Topic</h2>
							<p>Question</p>
							<a href="">Reply</a>
						</div>
						<div className={styles.box5}>
							{/* <i className="fa-solid fa-car"></i> */}
							<h2>Topic</h2>
							<p>Question</p>
							<a href="">Reply</a>
						</div>
						<div className={styles.box6}>
							{/* <i className="fa-solid fa-car"></i> */}
							<h2>Topic</h2>
							<p>Question</p>
							<a href="">Reply</a>
						</div>

					</div>
				</div>
			</div>
		</>
	)
}