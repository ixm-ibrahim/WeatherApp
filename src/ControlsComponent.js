import { FormItem, DefaultWeatherState, DefaultWeatherControls, formReducer } from "./Controls.js"
import { useState, useEffect, useReducer } from "react";

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

const useHandleControls = () => {
    const [weatherControls, setWeatherControls] = useState({...DefaultWeatherControls});

    const handleChange = (e) => {
        //console.log(e.target.name);
        //console.log(e.target.value);
        //console.log(e.target.options);
        setWeatherControls((prev) => ({...prev, [e.target.name]: {...prev[e.target.name], value:e.target.value}}));
    };

    return [weatherControls, setWeatherControls, handleChange];
}

const useHandleState = (setWeatherControls) => {
    const [weatherState, dispatch] = useReducer(formReducer, DefaultWeatherState)

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
     
    return [ weatherState, dispatch ];
}

export const ControlsComponent = () => {
    const [weatherControls, setWeatherControls, handleChange] = useHandleControls()
    const [weatherState, dispatch] = useHandleState(setWeatherControls);

    return (
        <>
            <h2>Controls</h2>
            <form>
                <FormItem data={weatherState.location} handleChange={(e) => dispatch({
                    type: "select",
                    payload: { name: e.target.name, value: e.target.value }
                })} />
                <FormItem data={weatherState.window} handleChange={(e) => dispatch({
                    type: "checkbox",
                    payload: { name: e.target.name, value: e.target.value }
                })} />
                <FormItem data={weatherState.current} handleChange={(e) => dispatch({
                    type: "checkbox",
                    payload: { name: e.target.name, value: e.target.value }
                })} />
                <FormItem data={weatherState.time} handleChange={(e) => dispatch({
                    type: "time",
                    payload: { name: e.target.name, value: e.target.value, slider: e.target.slider }
                })} />
                <FormItem data={weatherState.date} handleChange={(e) => dispatch({
                    type: "date",
                    payload: { name: e.target.name, value: e.target.value, slider: e.target.slider }
                })} />
                <FormItem data={weatherState.latitude} handleChange={(e) => dispatch({
                    type: "number",
                    payload: { name: e.target.name, value: e.target.value }
                })} />
                <FormItem data={weatherState.longtitude} handleChange={(e) => dispatch({
                    type: "number",
                    payload: { name: e.target.name, value: e.target.value }
                })} />
                <FormItem data={weatherState.preset} handleChange={(e) => dispatch({
                    type: "select",
                    payload: { name: e.target.name, value: e.target.value }
                })} />
                <FormItem data={weatherControls.sun} handleChange={handleChange} />
                <FormItem data={weatherControls.clouds} handleChange={handleChange} />
                <FormItem data={weatherControls.precipitation_type} handleChange={handleChange} />
                <FormItem data={weatherControls.precipitation} handleChange={handleChange} />
                <FormItem data={weatherControls.lightning} handleChange={handleChange} />
                <FormItem data={weatherControls.wind} handleChange={handleChange} />
            </form>
        </>
    );
}