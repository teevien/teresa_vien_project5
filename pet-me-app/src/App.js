import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Qs from 'qs';


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
          count: 7,
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
      console.log(res)
      this.setState({
        pets: res
      })
    })
   
  }

  componentDidMount() {
  
  }   

  // RENDER THESE COMPONENTS ON THE PAGE IN JSX
  render() {
    return (
      <div className="App">

      <header>
        <h1>Pet Me</h1>

        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="input">Search Query</label>
          <input type="text" name="input" id="userInput" onChange={this.handleChange} value={this.state.input}/>
          <input type="submit" />
        </form>
      </header>

          {/* THIS WILL MAP THROUGH EACH ARRAY ITEM IN SHELTER AND DiSPLAY THEM IN HTML */}
          {this.state.shelter.map(shelter => {
            return (
              <div className="displayShelters">
                {/* <ul> */}
                  <li>{shelter.name.$t}</li>
                  <p>{shelter.city.$t}</p>
                  <a href={"mailto:" + shelter.email.$t}>Contact us!</a>
                  <button onClick={this.handleClick} name="shelterid" value={shelter.id.$t}>Choose Breed</button>
                {/* </ul>   */}
              </div>
            )
          })
        }
          {/* THIS WILL MAP THROUGH THE PETS ARRAY AND DISPLAY THEM */}
          {this.state.pets.map(pet => {
            return(
              <section>
                <div className="displayPets">
                  <div class="pet">
                    <h2>{pet.name.$t}</h2>
                    <img src={pet.media.photos.photo[1].$t} alt={pet.breeds.breed.$t}/>
                  </div>
                </div>
              </section>
            )
          })
        }
    
      </div>
    );
  }
}

export default App;



// handleClick = (e) => {
  //       this.setState({
  //         shelterid: '',
  //       })  
  //   axios({
  //     url: 'https://proxy.hackeryou.com',
  //     dataResponse: 'json',
  //     method: 'GET',
  //     paramsSerializer: function (params) {
  //       return Qs.stringify(params, {
  //         arrayFormat: 'brackets'
  //       })
  //     },
  //     params: {
  //       reqUrl: getPetsURL,
  //       params: {
  //         key: apiKey,
  //         format: 'json',
  //         output: 'basic',
  //         shelterid: this.state.shelterid,
  //         count: 25,
  //       },
  //       proxyHeaders: {
  //         'header_params': 'value'
  //       },
  //       xmlToJSON: false
  //     }

  //   }).then((res) => {
  //     res = res.data.petfinder.shelters.shelter
  //     console.log(res);

  //     this.setState({
  //       shelter: res,
  //       input: ''
  //     })
  //   }); 
  // }
