import { useState } from 'react';

function FlightData() {

    const axios = require('axios').default;

    

    const [flights, updateFlights] = useState([]) //flights from aviation api 

    const [input, updateInput] = useState({ 
        airline: '',
        flightNumber: ''
    }) //user search input 

    const {airline, flightNumber} = input

    let data 

    let userInput 

    async function getFlight() {

        const url = process.env.REACT_APP_URL + process.env.REACT_APP_API_KEY + `&flight_number=${flightNumber}` + `&airline=${airline}`
        
        try {
          console.log(airline, flightNumber)
          const response = await axios.get(url);    
          data = response.data.data  
          console.log(data)  
          const flight = data.filter(x => { return x.flight.number === flightNumber && x.airline.name === airline})  
          updateFlights(flight) 
          
        } catch (error) { 
          console.error(error);  
        }
    
    }

    const onChange = (e) => {    
        updateInput(   
            (prevState) => ({    
                ...prevState, //<- This line creates a copy of the formData variable called 'prevState'. 
                [e.target.name]: e.target.value, //<- This line gets the name of the input tag from the input event and sets 
                //it to the value of the input. For example if I type 'John@gmail.com' in the name input, this line 
                //would effectively read: email: "John@gmail.com". This overides the value for email in the state object.
            })    
        )
    }




  return (
    <div id="flights">Enter Your Information 

        <form >
            <input type="text" name="airline" onChange={onChange} value={airline} placeholder='Airline' />    
            <input type="text" name="flightNumber" onChange={onChange} value={flightNumber} placeholder='Flight Number' />    
        </form>  
        <button id="btn"  onClick={() => getFlight()}>Get Flight</button>    
        
        {flights && flights.map(x => <div id="flight-wrapper">
            
        <h3> Airline: {x.airline.name}</h3>

        <h3> Flight Number: {x.flight.number}</h3>
        
        <h3> Status: {x.flight_status}</h3> 

        <h3> Departs from: {x.departure.airport}</h3>

        <h3> Arrives at: {x.arrival.airport}</h3>

        <h3> Terminal: {x.departure.terminal}</h3>

        <h3> Gate: {x.departure.gate}</h3>

        
        
        </div>)}  
    </div>  
    
  )
}

export default FlightData