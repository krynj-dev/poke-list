import logo from './logo.svg';
import './App.css';
import Poketable from './components/Poketable';
import Berrytable from './components/Berrytable';
import React from 'react';
import Stattable from './components/Stattable';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.statsRef = React.createRef();

    this.state = {selected_pokemon: " "};

    this.change_this_state = this.change_this_state.bind(this);
  }

  render() {
    console.log(this.state);
    console.log("THIS STATE IS: "+this.state.selected_pokemon);
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-dashboard">
            <div className="App-pokemon"><Poketable targetRef={this.change_this_state}/></div>
            <div className="App-berry"><Berrytable/></div>
            <div className="App-stats"><Stattable key={this.state.selected_pokemon} pokeID={this.state.selected_pokemon}/></div>
          </div>
        </header>
      </div>
    );
  }

  change_this_state(id) {
    this.setState({selected_pokemon: id});
  }
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
