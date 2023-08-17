export const PRECIPITATION_TYPES = [
    { key: 0, name: "Rain" },
    { key: 1, name: "Snow" },
    { key: 2, name: "Hail" },
];

export const DefaultWeatherControls = {
    sun: {name: "sun", label: "Solar Visibility", type: "number", value: 100, step: .01, min: 0, max: 100},
    clouds: {name: "clouds", label: "Cloud Cover", type: "number", value: 0, step: .01, min: 0, max: 100},
    precipitation_type: {name: "precipitation_type", label: "Precipitation Type", type: "select", value: 0, collection: PRECIPITATION_TYPES},
    precipitation: {name: "precipitation", label: "Precipitation", type: "number", value: 0, step: .01, min: 0, max: 100},
    lightning: {name: "lightning", label: "Lightning Strikes", type: "number", value: 0, step: 1, min: 0, max: 100},
    wind: {name: "wind", label: "Wind Speed", type: "number", value: 0, step: .01, min: 0, max: 100},
}


export const WEATHER_PRESETS = [
    { key: 0, name: "Sunny", weather_controls: {...DefaultWeatherControls,
        wind: {...DefaultWeatherControls.wind, value: 5}}
    },
    { key: 1, name: "Cloudy", weather_controls: {...DefaultWeatherControls,
        clouds: {...DefaultWeatherControls.clouds, value: 40},
        wind: {...DefaultWeatherControls.wind, value: 10}}
    },
    { key: 2, name: "Dark Clouds", weather_controls: {...DefaultWeatherControls,
        clouds: {...DefaultWeatherControls.clouds, value: 80},
        wind: {...DefaultWeatherControls.wind, value: 30}}
    },
    { key: 3, name: "Rainy", weather_controls: {...DefaultWeatherControls,
        precipitation: {...DefaultWeatherControls.precipitation, value: 50},
        wind: {...DefaultWeatherControls.wind, value: 20}}
    },
    { key: 4, name: "Thunderstorm", weather_controls: {...DefaultWeatherControls,
        clouds: {...DefaultWeatherControls.clouds, value: 90},
        precipitation: {...DefaultWeatherControls.precipitation, value: 60},
        lightning: {...DefaultWeatherControls.lightning, value: 10},
        wind: {...DefaultWeatherControls.wind, value: 40}}
    },
    { key: 5, name: "Snowy", weather_controls: {...DefaultWeatherControls,
        clouds: {...DefaultWeatherControls.clouds, value: 70},
        precipitation: {...DefaultWeatherControls.precipitation, value: 40},
        precipitation_type: {...DefaultWeatherControls.precipitation_type, value: 1},
        wind: {...DefaultWeatherControls.wind, value: 15}}
    },
    { key: 6, name: "Hail", weather_controls: {...DefaultWeatherControls,
        clouds: {...DefaultWeatherControls.clouds, value: 80},
        precipitation: {...DefaultWeatherControls.precipitation, value: 40},
        precipitation_type: {...DefaultWeatherControls.precipitation_type, value: 2},
        wind: {...DefaultWeatherControls.wind, value: 25}}
    },
    { key: 7, name: "Windy", weather_controls: {...DefaultWeatherControls,
        clouds: {...DefaultWeatherControls.clouds, value: 25},
        wind: {...DefaultWeatherControls.wind, value: 25}}
    },
];

export const GEO_LOCATIONS = [
    { key: 0, name: "Mountain" },
    { key: 1, name: "Beach" },
    { key: 2, name: "Ocean" },
    { key: 3, name: "Countryside" },
    { key: 4, name: "Forest" },
    { key: 5, name: "Desert" },
    { key: 6, name: "City" },
];

export const DefaultWeatherState = {
    location: {name: "location", label: "Location", type: "select", value: 0, collection: GEO_LOCATIONS},
    window: {name: "window", label: "Glass Window", type: "checkbox", value: true},
    current: {name: "current", label: "Current Weather", type: "checkbox", value: true},
    preset: {name: "preset", label: "Weather Presets", type: "select", value: 0, collection: WEATHER_PRESETS},
    time: {name: "time", label: "Time of Day", type: "time", value: "12:00:00", slider: 12, step: .001, min: 0, max: 24},
    date: {name: "date", label: "Day of Year", type: "date", value: "2023-09-23", slider: 266, step: 1, min: 1, max: 365},
    latitude: {name: "latitude", label: "Latitude", type: "number", value: 0, step: 1, min: -90, max: 90},
    longtitude: {name: "longtitude", label: "Longtitude", type: "number", value: 0, step: 1, min: -180, max: 180},
};


export function FormItem({data, handleChange}) {
    //console.log(data);
    switch (data.type) {
        case "select":
            return (
                <>
                <label htmlFor={data.name}>{data.label}</label>
                <select id={data.name} name={data.name} value={data.value} onChange={handleChange}>
                    {/*Object.entries(data.collection).map((item) => (
                        <option key={item[0]} value={item[1]}>{item[1]}</option>
                    ))*/
                    data.collection.map((item) => (
                        <option key={item.key} value={item.key}>{item.name}</option>
                    ))}
                </select>
                </>
            );
        case "checkbox":
            return (
                <>
                    <label htmlFor={data.name}>{data.label}</label>
                    <input type={data.type} id={data.name} name={data.name} checked={data.value} onChange={handleChange} />
                </>
            );
        case "number":
        {
            const {label, ...inputProps} = data;    // has an extra "slider" and "step" options 
            const {type, ...sliderProps} = inputProps;
            return (
                <>
                    <label htmlFor={data.name}>{data.label}</label>
                    <input id={data.name} {...inputProps} onChange={handleChange} />
                    <input type="range" id={type} {...sliderProps} onChange={handleChange} />
                </>
            );
        }
        // time/date
        default:
        {
            //console.log(data);
            return (
                <>
                    <label htmlFor={data.name}>{data.label}</label>
                    <input id={data.name} name={data.name} type={data.type} value={data.value} onChange={handleChange} />
                    <input type="range" id={data.type} name={data.name} value={data.slider} step={data.step} min={data.min} max={data.max} onChange={handleChange} />
                </>
            );
        }
    }
}

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

export const formReducer = (state, action) => {
    switch (action.type)
    {
        case "checkbox":
            return {
                ...state,
                [action.payload.name]: {
                    ...state[action.payload.name],
                    value: !state[action.payload.name].value
                }
            }
        case "time":
            // slider input
            if (action.payload.value.split(":").length == 1)
                return {
                    ...state,
                    [action.payload.name]: {
                        ...state[action.payload.name],
                        value: timeFloatToString(action.payload.value),
                        slider: action.payload.value
                    }
                }
            // normal input
            return {
                ...state,
                [action.payload.name]: {
                    ...state[action.payload.name],
                    value: action.payload.value,
                    slider: timeStringToFloat(action.payload.value)
                }
            }
        case "date":
            // slider input
            if (action.payload.value.split("-").length == 1)
                return {
                    ...state,
                    [action.payload.name]: {
                        ...state[action.payload.name],
                        value: dateIntToString(action.payload.value, state.date.value.split('-')[0]),
                        slider: action.payload.value
                    }
                }
            // normal input
            return {
                ...state,
                [action.payload.name]: {
                    ...state[action.payload.name],
                    value: action.payload.value,
                    slider: dateStringToInt(action.payload.value)
                }
            }
        default: // select, number, and number slider
            return {
                ...state,
                [action.payload.name]: {
                    ...state[action.payload.name],
                    value: action.payload.value,
                }
            }
    }
};