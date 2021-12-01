import React from 'react';
import { Form, Table } from 'react-bootstrap';
import '../App.css';

class Poketable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pokelist: [], filter: ""}
    }

    render() {
        // console.log(this.state.pokelist);
        return(
            <div>
                <Form.Control type="text" onChange={(e) => this.textBoxChanged(e)} />
                <Table striped bordered hover variant="dark">
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
                </Table>
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
            const sorted_pokelist = [].concat(this.state.pokelist.results).filter(val => val.name.includes(this.state.filter));
            // sorted_pokelist.sort((a, b) => a.id > b.id ? 1 : -1 );
            return(sorted_pokelist.map((val, idx) => {
                // console.log(val.url.split("/"));
                let poke_id = val.url.split("/").at(-2);
                return(<tr key={idx} onClick={(row) => this.show_pokemon_stats(row, poke_id)}>
                    <td><img src={this.get_pokemon_front_sprite(poke_id)} /></td>
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

    textBoxChanged(event) {
        event.preventDefault();
        console.log(event.target.value); // The text contained in the box
        this.setState({filter: event.target.value.toLowerCase()});
    }

    show_pokemon_stats(row, id) {
        console.log(this.props);
        // const target = this.props.targetRef.current;
        // target.setState({id: id});
        this.props.targetRef(id);
    }
}

export default Poketable;