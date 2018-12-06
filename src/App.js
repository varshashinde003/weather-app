import React, { Component } from 'react';
import './App.css';
import Title from './components/Title';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = 'abe66c8f415cce080ff8d5181e021245';
class App extends Component {
  state = {
    temperature: '',
    city: '',
    country: '',
    humidity: '',
    description: '',
    error: ''
  }
  getWeather = async (e) => {
    try {
      e.preventDefault();
      const city = e.target.city.value;
      const country = e.target.country.value;
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      if (city && country) {
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: ''
        });
      } else {
        this.setState({
          temperature: '',
          city: '',
          country: '',
          humidity: '',
          description: '',
          error: 'Please enter values.'
        });
      }
    } catch (ex) {
      console.log(ex)
    }
  }
  render() {
    const { temperature, city, country, humidity, description, error } = this.state;
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-5 title-container">
                <Title />
              </div>
              <div className="col-xs-7 form-container">
                <Form getWeather={this.getWeather} />
                <Weather temperature={temperature} city={city} country={country} humidity={humidity} description={description} error={error} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
