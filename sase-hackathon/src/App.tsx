
import Card from './components/card'
import Header from './components/header'
import './App.css'


function App() {

	return (
		<>
			<Header />
			<div className="hero">
				<div className="container">
					<h1 className="logo">Ubelong</h1>
					<p>A space where you feel safe</p>
					<p>Join a safe space</p>
				</div>

			</div>
			<Card />
		</>
	)
}

export default App
