import React from 'react';
import '../App.css';

class Poketable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pokelist: []}
    }

    render() {
        // console.log(this.state.pokelist);
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Sprite</th>
                            <th>Pokedex No.</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.get_pokemon_list()}
                    </tbody>
                </table>
            </div>
        )
    }

    componentDidMount() {
        const Pokedex = require("pokeapi-js-wrapper");
        const P = new Pokedex.Pokedex({
            timeout: 5 * 1000,
            cacheImages: true
        });
        console.log(P);
        let list = P.getPokemonsList()
        .then((res) => {
            console.log(res);
            this.setState({pokelist: res});
        }, (error) => {console.error(error)});
    }

    get_pokemon_list() {
        if (this.state.pokelist.results !== undefined) {
            const sorted_pokelist = [].concat(this.state.pokelist.results);
            // sorted_pokelist.sort((a, b) => a.id > b.id ? 1 : -1 );
            return(sorted_pokelist.map((val, idx) => {
                return(<tr key={idx}>
                    <td><img src={this.get_pokemon_front_sprite(idx+1)} /></td>
                    <td>{idx+1}</td>
                    <td>{val.name}</td>
                </tr>
                );
            }))
        }
        return <tr><td>DONE</td></tr>
    }

    get_pokemon_front_sprite(id) {
        return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+id+".png"
    }
}

export default Poketable;