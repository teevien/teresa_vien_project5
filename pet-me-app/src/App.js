import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Qs from 'qs';

// COMPONENTS
import Title from './Title';
import Overlay from './Overlay';
import Error from './Error';

const apiKey = '6d092bf1a0565b78d624c7da781eca63'
const url = 'http://api.petfinder.com/'
const findShelterURL = url + 'shelter.find'
const getBreedURL = url + 'shelter.getPets'


class App extends Component {
  constructor() {
    super();
    this.state={
      shelter: [],
      input: '',
      pets: [],
    }
  }

  // FUNCTION THAT CAPTURES THE VALUE OF ONCHANGE AND THEN UPDATES THE STATE
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }) 
  }

  // FUNCTION THAT MAKES THE AXIOS CALL TO GRAB SHELTERS WITH WHATEVER POSTAL CODE USER TYPES
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log('it worked!')
    axios({
      url: 'https://proxy.hackeryou.com',
      dataResponse: 'json',
      method: 'GET',
      paramsSerializer: function (params) {
        return Qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      },
      params: {
        reqUrl: findShelterURL,
        params: {
          key: apiKey,
          format: 'json',
          output: 'basic',
          location: this.state.input,
          count: 9,
        },
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false
      }
      // ONCE AXIOS CALL FINISH THEN UPDATE STATE SHELTER WITH THE RESULTS OF AXIOS CALL
    }).then((res) => {
      res = res.data.petfinder.shelters.shelter
      console.log(res);
      this.setState({
        shelter: res,
        input: ''
      })
    }); 
  }

  // FUNCTION THAT CAPTURES VALUE OF THE CLICKED BUTTONS SHELTER ID AND MAKES AXIOS CALL TO GRAB PETS
  handleClick = (e) => {
    this.setState({
      [e.target.name]: [e.target.value]
    })
    axios({
      url: 'https://proxy.hackeryou.com',
      dataResponse: 'json',
      method: 'GET',
      paramsSerializer: function (params) {
        return Qs.stringify(params, 
          {
          arrayFormat: 'brackets'
        })
      },
      params: {
        reqUrl: getBreedURL,
        params: {
          key: apiKey,
          format: 'json',
          output: 'basic',
          id: e.target.value, // shows ID OF THAT SPECIFIC SHELTER
          count: 100,
        },
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false
      }
      // GRAB PETS AND THEN UPDATE THE STATE WITH THE NEW ARRAY
    }).then((res) => {
      res = res.data.petfinder.pets.pet
      console.log(res);
      this.setState({
        pets: res,
      })
    })
   
  }

  // RENDER THESE COMPONENTS ON THE PAGE IN JSX
  render() {
    return (
      <div className="App">
      
      <header>
        <Title /> 
  
        <form action="" onSubmit={this.handleSubmit}>
            <p>See your nearest shelters by typing your postal code!</p>
          <label htmlFor="input"></label>
          <input type="text" name="input" id="userInput" onChange={this.handleChange} value={this.state.input} placeholder="Postal Code"/>
          <label htmlFor="submit"></label>
          <input type="submit"  id="submit" value="Find Shelters" />
        </form>
        
       
          {/* THIS WILL MAP THROUGH EACH ARRAY ITEM IN SHELTER AND DiSPLAY THEM IN HTML */}
          <div id="shelters">
            {this.state.shelter.map(shelter => {
              return (
                <div className="displayShelters">
                  <li>{shelter.name.$t}</li>
                  <p>{shelter.city.$t}</p>
                  <button onClick={this.handleClick} name="shelterid" value={shelter.id.$t} >Look At Pets!</button>
                </div>
                  )
                })
                }
          </div>
      </header>

        {/* THIS WILL MAP THROUGH THE PETS ARRAY AND DISPLAY THEM */} 
        <div id="pets" className="arrow">
      
          {this.state.pets.map(pet => {
              let photo = typeof pet.media.photos == 'undefined'
                ?  <Error />
                : <img src={pet.media.photos.photo[2].$t} alt={pet.breeds.breed.$t} />;

              return(
                <div className="displayPets">
                  <h2>{pet.name.$t}</h2> 
                  
                  <div className="petImg"> 
                    {photo}              
                    <Overlay 
                      mix={pet.mix.$t}
                      age={pet.age.$t}
                      sex={pet.sex.$t}
                      email={pet.contact.email.$t}
                      phone={pet.contact.phone.$t}
                    />
                  </div>

                </div>
              )
              }) 
            }
            
        </div>
</div>

    );
  }
}

export default App;
