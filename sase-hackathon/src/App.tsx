
import Card from './components/Card'
import Header from './components/Header'
import './App.css'
import { HiArrowSmDown } from 'react-icons/hi'
import videoFile from './assests/Swing.mp4';

function App() {

	const scrollToElement = (hash) => {
		const element = document.querySelector(`h2[data-id='${hash}']`);

		if (element) {
			const { top } = element.getBoundingClientRect();
			const { marginTop } = window.getComputedStyle(element);
			const y = top + window.scrollY - parseInt(marginTop);
			window.scrollTo({ top: y, behavior: "smooth" });
		}
	}


	return (
		<>
			<Header />
			<div className="hero">
				<div className="container">
					<h1 className="logo">UBelong</h1>
					<p>A space where you feel safe</p>

				</div>
				<button className="arrowContainer">
					<p>Join a safe space</p>
					<HiArrowSmDown className="arrow" />
				</button>

				<video className="hero-video" autoPlay loop muted>
					<source src={videoFile} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>
			<Card />
		</>
	)
}

export default App
