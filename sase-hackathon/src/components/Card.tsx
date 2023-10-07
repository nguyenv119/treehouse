import styles from './Card.module.css'

export default function Card() {
	return (
		<>
			<div className={styles.container}>

				<div className={styles.serviceList}>

					<div className={styles.box1}>
						{/* <i className="fa-solid fa-car"></i> */}
						<h2>Topic</h2>
						<p>Question</p>
						<a href="">Reply</a>
					</div>
					<div className={styles.box1}>
						{/* <i className="fa-solid fa-car"></i> */}
						<h2>Topic</h2>
						<p>Question</p>
						<a href="">Reply</a>
					</div>
					<div className={styles.box1}>
						{/* <i className="fa-solid fa-car"></i> */}
						<h2>Topic</h2>
						<p>Question</p>
						<a href="">Reply</a>
					</div>
					<div className={styles.box1}>
						{/* <i className="fa-solid fa-car"></i> */}
						<h2>Topic</h2>
						<p>Question</p>
						<a href="">Reply</a>
					</div>


				</div>
			</div>
		</>
	)
}