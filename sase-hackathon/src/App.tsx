
import Card from './components/card'
import Header from './components/header'
import './App.css'
import { HiArrowSmDown } from 'react-icons/hi'

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
			</div>
			<Card />
		</>
	)
}

export default App
