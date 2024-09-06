import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [temp, settemp] = useState(27)
  const [city, setCity] = useState('Islamabad')
  const [data, setdata] = useState('')
  const [deg, setdeg] = useState('C')
  const [Humidity, setHumidity] = useState('99')
  const [VISIBLITY, setVISIBLITY] = useState('8')
  const [Air, setAir] = useState('100')
  const [cloud, setCloud] = useState('34')
  const [wind, setWind] = useState('2')
  const Ref = useRef(false)
  const degRef = useRef()

  useEffect(() => {
    if (Ref.current === false) {
      console.log('data')
      temperature()
      Ref.current = true
    }

  }, [])

  const temperature = async () => {

    let cit = 'islamabad'
    if (data != '') {
      setCity(data)
      cit = data
      console.log(data)
    }

    const url = 'http://api.weatherapi.com/v1/current.json?key=44799cc8ee164e0f9a462428240509&q=' + cit;
    const options = {
      method: 'GET',
      headers: {

      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      degRef.current = result
      if (result.error) {
        setCity(result.error.message)
        console.log('err')
      }

      if (deg == 'C') {
        settemp(result.current.temp_c)
      }
      else if (deg == 'F') {
        settemp(result.current.temp_f)
      }
      setCity(result.location.name)
      setHumidity(result.current.humidity)
      setVISIBLITY(result.current.vis_km)
      setAir(result.current.pressure_mb)
      setWind(result.current.wind_mph)
      setCloud(result.current.cloud)

    } catch (error) {
      console.error(error);

    }
  }

  const onChange = (e) => {
    setdata(e.target.value)
  }

  const handleDegree = () => {
    if (deg == 'C') {
      setdeg('F')
      settemp(degRef.current.current.temp_f)
    }
    else {
      setdeg('C')
      settemp(degRef.current.current.temp_c)
    }
  }

  return (
    <>

      <div className="App ">
        <nav>
          <div className="logo">
            <img src="src\assets\logo.svg" alt="" />
            <h1>Weather</h1>
          </div>
          <div className="day">
            <span className='today'>Today</span>
            <span>Tommorow</span>
          </div>
        </nav>
        <main>
          <div className='m-button'>
            <span>&deg;C</span>
            <label className="switch-button" htmlFor="switch">
              <div className="switch-outer">
                <input id="switch" type="checkbox" />
                <div onClick={handleDegree} className="button">
                  <span className="button-toggle"></span>
                  <span className="button-indicator"></span>
                </div>
              </div>
            </label>
            <span>&deg;F</span>
          </div>

          <div className="search">
            <img src="src\assets\search.svg" alt="img" />
            <input onChange={(e) => { onChange(e) }} type="text" name="data" id="" value={data} placeholder='Search location' />
            <button onClick={temperature}>Search</button>
          </div>
          <div className="output">
            <div className='location'>
              <h1>{city}</h1>
              <img src="src\assets\location.svg" alt="" />
            </div>
            <div className="temperature">
              <img className='temp' src="src\assets\temperature.svg" alt="" />
              <span>{temp}&deg;{deg}</span>
              <img src="src\assets\cloud.svg" alt="" />
            </div>
            <div className="m-info">
              <div className="hum">
                <span>Humidity</span>
                <span>{Humidity}%</span>
              </div>
              <div className="visi">
                <span>VISIBLITY</span>
                <span>{VISIBLITY}Km</span>
              </div>
              <div className="air">
                <span>Air Pressure</span>
                <span>{Air}Pa</span>
              </div>
              <div className="wind">
                <span>Wind</span>
                <span>{wind}mph</span>
              </div>
              <div className="wind">
                <span>Clouds</span>
                <span>{cloud}%</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
