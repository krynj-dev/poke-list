import logo from './logo.svg';
import './App.css';
import Poketable from './components/Poketable';
import Berrytable from './components/Berrytable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-dashboard">
          <div className="App-pokemon"><Poketable/></div>
          <div className="App-berry"><Berrytable/></div>
        </div>
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
