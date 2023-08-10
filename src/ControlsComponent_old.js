import { FormItem, DefaultWeatherState, DefaultWeatherControls } from "./Controls.js"
import { useState, useEffect } from "react";

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

const useHandleControls = () => {
    const [weatherControls, setWeatherControls] = useState({...DefaultWeatherControls});

    const handleChangeControls = (e) => {
        //console.log(e.target.name);
        //console.log(e.target.value);
        //console.log(e.target.options);
        setWeatherControls((prev) => ({...prev, [e.target.name]: {...prev[e.target.name], value:e.target.value}}));
    };

    return [weatherControls, setWeatherControls, handleChangeControls];
}

const useHandleState = (setWeatherControls) => {
    const [weatherState, setWeatherState] = useState({...DefaultWeatherState});

    function timeStringToFloat(time) {
        var hoursMinutes = time.split(/[.:]/);
        var hours = parseInt(hoursMinutes[0], 10);
        var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
        return hours + minutes / 60;
    }
    function timeFloatToString(time) {
        time %= 24; //deals with 24:00 case
        var hours = (Math.floor(time) % 24).toString().padStart(2, '0');
        var minutes = Math.floor((time - hours) * 60).toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    function dateStringToInt(dateString) {
        const [y, m, d] = dateString.split('-');
        var date = new Date(parseInt(y), parseInt(m)-1, parseInt(d));
        var start = new Date(date.getFullYear(), 0, 0);
        var diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000); // in milliseconds?
        var oneDay = 1000 * 60 * 60 * 24; // in milliseconds
        var day = Math.floor(diff / oneDay);
        return day;
    }
    function dateIntToString(day, year) {
        return new Date(year, 0, day).toLocaleDateString('en-CA'); // format in yyyy-mm-dd
    }

    const handleChangeState = (e) => {
        //console.log(e.target.name);
        //console.log(e.target.value);
        //console.log(e.target.type);
        //console.log(weatherState[e.target.name].type);
        //console.log(e.target.options?.selectedIndex);
        switch (e.target.type)
        {
            case "checkbox":
                setWeatherState((prev) => ({...prev, [e.target.name]: {...prev[e.target.name], value: !prev[e.target.name].value}}));
                break;
            case "time":
                setWeatherState((prev) => ({...prev, [e.target.name]: {...prev[e.target.name], value: e.target.value, slider: timeStringToFloat(e.target.value)}}));
                break;
            case "date":
                setWeatherState((prev) => ({...prev, [e.target.name]: {...prev[e.target.name], value: e.target.value, slider: dateStringToInt(e.target.value)}}));
                break;
            case "range":
                if (e.target.id === "time")
                    setWeatherState((prev) => ({...prev, [e.target.name]: {...prev[e.target.name], value: timeFloatToString(e.target.value), slider: e.target.value}}))
                else if (e.target.id === "date")
                    setWeatherState((prev) => ({...prev, [e.target.name]: {...prev[e.target.name], value: dateIntToString(e.target.value, weatherState.date.value.split('-')[0]), slider: e.target.value}})) // weird bug when doing new Date(...) when it is january 1, it decrements the year...
                else // number
                    setWeatherState((prev) => ({...prev, [e.target.name]: {...prev[e.target.name], value:e.target.value}}));
                break;
            default: // select and number
                setWeatherState((prev) => ({...prev, [e.target.name]: {...prev[e.target.name], value:e.target.value}}));
                // modify all weather controls to match the preset - this won't work because setState is asynchronous, so setWeatherControls will set it to the settings before they are changed
                //if (e.target.name === "preset") { setWeatherControls({...weatherState.preset.collection[weatherState.preset.value].weather_controls}); }s
        }
            
    };

    // if "Current Weather" becomes checked, update the weather controls
    useEffect(() => {
        if (weatherState.current.value === true)
        {
            // API call
            setWeatherControls({...DefaultWeatherControls}); // placeholder
        }
    }, [weatherState.current.value]);
    // when the weather preset changes, modify the weather controls
    useEffect(() => {
        setWeatherControls({...weatherState.preset.collection[weatherState.preset.value].weather_controls});
        weatherState.current.value = false;
    }, [weatherState.preset.value]);
     
    return [ weatherState, setWeatherState, handleChangeState ];
}

export const ControlsComponent = () => {
    const [weatherControls, setWeatherControls, handleChangeControls] = useHandleControls()
    const [weatherState, setWeatherState, handleChangeState] = useHandleState(setWeatherControls);

    return (
        <>
            <h2>Controls</h2>
            <form>
                <FormItem data={weatherState.location} handleChange={handleChangeState} />
                <FormItem data={weatherState.window} handleChange={handleChangeState} />
                <FormItem data={weatherState.current} handleChange={handleChangeState} />
                <FormItem data={weatherState.time} handleChange={handleChangeState} />
                <FormItem data={weatherState.date} handleChange={handleChangeState} />
                <FormItem data={weatherState.latitude} handleChange={handleChangeState} />
                <FormItem data={weatherState.longtitude} handleChange={handleChangeState} />
                <FormItem data={weatherState.preset} handleChange={handleChangeState} />
                <FormItem data={weatherControls.sun} handleChange={handleChangeControls} />
                <FormItem data={weatherControls.clouds} handleChange={handleChangeControls} />
                <FormItem data={weatherControls.precipitation_type} handleChange={handleChangeControls} />
                <FormItem data={weatherControls.precipitation} handleChange={handleChangeControls} />
                <FormItem data={weatherControls.lightning} handleChange={handleChangeControls} />
                <FormItem data={weatherControls.wind} handleChange={handleChangeControls} />
            </form>
        </>
    );
}