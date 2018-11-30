import React, { Component } from 'react';
// import './App.css';
import axios from 'axios';

class Pets extends Component {
    constructor() {
        super();
        this.state = {
            pets: []
        }
        // console.log('It worked');
    }

    getAnimals = () => {
        const apiKey = '6d092bf1a0565b78d624c7da781eca63'
        axios.get({
            url: 'https://api.petfinder.com/pet.getRandom',
            dataResponse: 'json',
            params: {
                key: apiKey,
                // queryParam: 'value',
                format: 'json'
            }
        }).then((res) => {
            console.log(res);
        })
    }

    render() {
        return(
            <div>
                <h2>Shelters!</h2>

            </div>
        )
    }
}

export default Pets;