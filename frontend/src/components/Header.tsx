import styles from './Header.module.css'
// import { Link } from 'react-router-dom'


export default function Header() {
	return (
		<>
			<div className={styles.header}>
				<div className={styles.container}>
					<nav className={styles.navContainer}>
						<ul id="sidemenu">
							{/* <Link to="#home">Home</Link> */}
							<li><a href="#home" >Home</a></li>
							<li><a href="#spaces">Spaces</a></li>
							<li><a href="#info">Info</a></li>
							<li><a href="#help">Help</a></li>
						</ul>
					</nav>
				</div>
			</div>
		</>
	)
}