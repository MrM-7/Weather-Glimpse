import React, { useEffect, useState } from "react";
import WeatherCard from "./weatherCard";

const Weather = () => {

    const [searchValue, setSearchValue] = useState("Dehradun");
    const [cityInfo, setCityInfo] = useState({});

    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

            const res = await fetch(url);
            const data = await res.json();

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const cityDetails = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            }

            setCityInfo(cityDetails);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWeatherInfo();
    }, []);

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search" placeholder="search..." autoFocus id="search" className="searchTerm" value={searchValue} onChange={(event) => {setSearchValue(event.target.value)}}/>

                    <button className="searchButton" type="button" onClick={() => {getWeatherInfo()}}>Search</button>
                </div>
            </div>

            <WeatherCard cityInfo={cityInfo}/>
        </>
    )
}

export default Weather;