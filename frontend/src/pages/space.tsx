import styles from './space.module.css';
import Draggable from 'react-draggable';
import FormDialog from './FormDialog';

export default function Space() {
	return (
		<>

			<div>
				<h1>Space</h1>
				<Draggable >
					<div className={styles.notes}>
						hey
					</div>
				</Draggable >
				<Draggable >
					<div className={styles.notes}>
						hey
					</div>
				</Draggable >
				<Draggable >
					<div className={styles.notes}>
						hey
					</div>
				</Draggable >
			</div >
			<FormDialog />
		</>
	)
}
