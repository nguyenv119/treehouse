import styles from './Header.module.css'

export default function Header() {
	return (
		<>
			<div className={styles.header}>
				<div className={styles.container}>
					<nav>
						<ul id="sidemenu">
							<li><a href="#header">Home</a></li>
							<li><a href="#Info">Info</a></li>
							<li><a href="#QBoard">Question Board</a></li>
							<li><a href="#contact">Help</a></li>
						</ul>
					</nav>
				</div>
			</div>
		</>
	)
}