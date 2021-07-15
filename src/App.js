import logo from './logo.svg';
import './App.css';
import Poketable from './components/Poketable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Poketable />
      </header>
    </div>
  );
}

async function get_it() {
  const Pokedex = require("pokeapi-js-wrapper")
  const P = new Pokedex.Pokedex()
  console.log(P)
  // try to get all pokemon
  let poke_list = []
  try {
    for (let i=1; i < 700; i++) {
      await P.getPokemonByName(i)
      .then(function(response) {
        poke_list.push(response)
      })
    }
  } catch (error) {
    console.error(error)
  }
  console.log(poke_list);
  return(<div>Hi</div>)
}



export default App;
