
import Card from './components/card'
import Header from './components/header'
import './App.css'
import { HiArrowSmDown } from 'react-icons/hi'
import videoFile from './assests/Swing.mp4';

function App() {

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
