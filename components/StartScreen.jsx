import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className='Start'><h1>Palavra Secreta</h1>
    <p>Clique no botão abaixo para jogar.</p>
    <button onClick={startGame}>Jogar</button>
    </div>
  )
}

export default StartScreen;