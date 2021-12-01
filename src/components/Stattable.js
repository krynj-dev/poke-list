import React from 'react';
import { Table } from 'react-bootstrap';
import '../App.css';

class Stattable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pokemon: undefined}
    }

    render() {
        return(
            <div>
                {this.get_pokemon_name()}
                <Table variant="dark">
                    <thead>
                        <tr>
                            <th>Stat</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.get_pokemon_stats()}
                    </tbody>
                </Table>
            </div>
        )
    }

    componentDidMount() {
        if (this.props.pokeID !== "" || this.props.pokeID !== undefined) {
            const Pokedex = require("pokeapi-js-wrapper");
            const P = new Pokedex.Pokedex({
                timeout: 5 * 1000,
                cacheImages: true
            });
            // Get Pokemon Stats
            console.log(this.props.pokeID);
            P.getPokemonByName(this.props.pokeID)
            .then((res) => {
                console.log(res);
                this.setState({pokemon: res});
            }, (error) => {console.error(error)});
        }
        // console.log("STATTABLE: "+this.props.pokeID)
    }

    componentDidUpdate(prevProps, prevState) {
        Object.entries(this.props).forEach(([key, val]) =>
          prevProps[key] !== val && console.log(`Prop '${key}' changed`)
        );
        if (this.state) {
          Object.entries(this.state).forEach(([key, val]) =>
            prevState[key] !== val && console.log(`State '${key}' changed`)
          );
        }
      }

    get_pokemon_stats() {
        if (this.state.pokemon) {
            return(this.state.pokemon.stats.map((val, idx) => {
                return(<tr key={idx}>
                    <td>{val.stat.name}</td>
                    <td>{val.base_stat}</td>
                </tr>)
            }))
        }
        else{
            return <tr><th></th><th></th></tr>
        }
    }

    get_pokemon_name() {
        if (this.state.pokemon) {
            return(this.state.pokemon.name)
        }
        return " "
    }
}

export default Stattable;