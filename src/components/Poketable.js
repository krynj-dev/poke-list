import React from 'react';
import '../App.css';

class Poketable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pokelist: []}
    }

    render() {
        return(
            <div>Hi ({this.state.pokelist.length})</div>
        )
    }

    componentDidMount() {
        const Pokedex = require("pokeapi-js-wrapper")
        const P = new Pokedex.Pokedex()
        console.log(P)
        // try to get all pokemon
        let poke_list = []
        try {
            for (let i=1; i <= 898; i++) {
                P.getPokemonByName(i)
                .then((response) => {
                    poke_list.push(response)
                    this.setState({pokelist: poke_list});
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export default Poketable;