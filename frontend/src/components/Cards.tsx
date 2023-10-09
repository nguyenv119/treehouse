import styles from './Cards.module.css';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';
import { BiSolidBed } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import { GiSuitcase } from 'react-icons/gi';
import { BsQuestionLg } from 'react-icons/bs';

export default function Cards() {
	const navigate = useNavigate();

	function handleClick(name: string) {
		navigate(`/space/${name}`);
	}

	return (
		<>
			<div id='spaces'>
				<div className={styles.container} id="services">
					<h1 className={styles.title}>Welcome to our TreeHouses</h1>
					<div className={styles.serviceList}>
						<div className={styles.box1} onClick={() => navigate(`/space/classes`)}>
							<h2><FaGraduationCap className="icon" /> Classes</h2>
							<p>"Anyone else not understand anything from CS1101 today? It feels like I am the only one not getting it."</p>
							<a href="">Reply</a>
						</div>
						<div className={styles.box2} onClick={() => navigate(`/space/dorm`)}>
							<h2><BiSolidBed className="icon" /> Dorm Life</h2>
							<p>"Am I falling behind when my roommate is already in Calc 4 while I'm still working on Calc 1?"</p>
							<a href="">Reply</a>
						</div>
						<div className={styles.box3} onClick={() => navigate(`/space/family`)}>
							<h2><AiFillHome className="icon" /> Family</h2>
							<p>"My sister always gets better grades than me, which makes me feel like my parents are more proud of her than they are of me, and I wonder if I'm just not as smart as her."</p>
							<a href="">Reply</a>
						</div>
						<div className={styles.box4} onClick={() => navigate(`/space/social`)}>
							<h2><FaUserFriends className="icon" /> Social</h2>
							<p>"It's the first week of school, and I already see people with so many friends, but I feel like I don't know anyone."</p>
							<a href="">Reply</a>
						</div>
						<div className={styles.box5} onClick={() => navigate(`/space/jobs`)}>
							<h2><GiSuitcase className="icon" /> Jobs/Internships</h2>
							<p>"I see everyone getting internships and jobs on LinkedIn, but I haven't even gotten an interview yet."</p>
							<a href="">Reply</a>
						</div>
						<div className={styles.box6} onClick={() => navigate(`/space/other`)}>
							<h2><BsQuestionLg className="icon" /> Other</h2>
							<p>""</p>
							<a href="">Reply</a>
						</div>

					</div>
				</div>
			</div >
		</>
	)
}