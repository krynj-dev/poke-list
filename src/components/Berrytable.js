import React from 'react';
import '../App.css';

class Berrytable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {berrylist: [], failed: []}
    }

    render() {
        // console.log(this.state.pokelist);
        return(
            <div>({this.state.berrylist.length})
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.get_berry_list()}
                    </tbody>
                </table>
            </div>
        )
    }

    componentDidMount() {
        const Pokedex = require("pokeapi-js-wrapper");
        const P = new Pokedex.Pokedex({
            timeout: 5 * 1000
        });
        let list = []
        P.getBerriesList().then((res) => {
            console.log(res);
            res.results.forEach(element => {
                P.getBerryByName(element.name)
                .then((response) => {
                    list.push(response)
                    this.setState({berrylist: list})
                })
            });
        });
    }

    get_berry_list() {
        console.log(this.state)
        if(this.state.berrylist !== undefined) {
            return(this.state.berrylist.map((val, idx) => {
                return(<tr key={idx}>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                </tr>
                );
            }))
        }
        return <tr></tr>
    }
}

export default Berrytable;