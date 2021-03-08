import React, { useState } from "react";
import axios from "axios";
import './App.css';
import {Col, Row, Container} from "react-bootstrap";
import "./Weather.css";




export default function Weather() {
  const [city, setCity] = useState("");
  const [message, setMessage] = useState(false);
  const [weather, setWeather] = useState("");

  function displayWeather(response) {
    setMessage(true);
    setWeather({
      name:city,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "c522524629fe11fe83aebe5bb3814efa";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayWeather);
  }

  function changeCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input className="form-control"
        type="search"
        placeholder="Write your city"
        onChange={changeCity}
      />
      <button variant="info" type="submit" className="btn btn-info" placeholder="Search"> Search</button> 
        
    </form>
  );
  if (message) {
    return (
      <div >
        {form}
        <br />
   <h1 className="details">{weather.name}</h1>
    <Col><img src={weather.icon} alt={weather.description} /></Col>
  <Container className="temp" >
  <div >
  <Row >
  <h3>Temperature: {Math.round(weather.temperature)} ºC</h3>  </Row>
  <br />
    <Row><h3>Humidity:{" "}{weather.humidity} %</h3> </Row>  <br />
    <Row><h3>Description: {weather.description} </h3>  </Row>  <br />
    <Row><h3>Wind: {weather.wind}km/h </h3></Row>
    </div>
</Container>
      </div>
    );
  } else {
    return form
    }
}
