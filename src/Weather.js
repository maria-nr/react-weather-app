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
      <input
        type="search"
        placeholder="Write your city"
        onChange={changeCity}
      />
      <input type="submit" placeholder="Search" />
    </form>
  );

  if (message) {
    return (
      <div>
        {form}
        <br />
        <Container >
    <Row className="country">
    <Col><h1>{weather.name}</h1></Col>
    </Row>
    <Row>
    
    <Col><img src={weather.icon} alt={weather.description} /></Col>
  </Row>
  <div className="temp">
  <Row >
  
  <h3>Temperature:</h3> {Math.round(weather.temperature)} ºC </Row>
  <br />
    <Row><h3>Humidity:{" "} </h3> {weather.humidity} % </Row>  <br />
    <Row><h3>Description: </h3>{" "} {weather.description} </Row>  <br />
    <Row><h3>wind: </h3>{weather.wind}km/h </Row>
    </div>
</Container>
      </div>
    );
  } else {
    return form;
  }
}
