/* Global Variables */

const generate = document.getElementById('generate');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const name = document.getElementById('name');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const APIkey = '&appid=2541334ceee047e0ef4f56ad571b0505&units=imperial';
const baseUrl ='https://api.openweathermap.org/data/2.5/weather?zip=';
const d = new Date();
const newDate = (d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear();

//EventListener for the generate button to take input
generate.addEventListener('click', getData);

const getWeatherData = async (url = '', data = {})=>{
  //fetching weather data from openweatherAPI
  const fullData = await fetch(url);
  const request = await fullData.json();
  return request;
}

//posting data to the local server
const postData = async ( url = '', data = {})=>{
//posting the data to our local server
    const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    //in case of a wrong inputted zipcode as the API retuns an empty object not an error
    if(newData.cod === '404'){
          alert(` please, make sure that your zip code is an exisitng one.`);
    } else {
          updateUI(newData);
  }
  }catch(error) {
  console.log("error", error);
  }
}

//fetching data from the local server
const fetchData = async ( url = '' , data = {})=>{
    const response = await fetch(url);
    try {
      const newData = await response.json();
/*      console.log(newData);
      //in case of a wrong inputted zipcode as the API retuns an empty object not an error
      if(newData.cod === '404'){
            alert(` please, make sure that your zip code is an exisitng one.`);
      } else {
            updateUI(newData);
    }*/
    }catch(error) {
    console.log("error", error);
    }
}

//setuo to fecth the data
function getData(){
  const fullUrl = baseUrl + zip.value + APIkey;
  getWeatherData(fullUrl).then((data)=>postData('http://localhost:8000/data',data)).then(fetchData('http://localhost:8000/all'));
}

//updating the UI dynamically
function updateUI(data){
  console.log(data);
  name.innerHTML = `Location: ${data.name},${data.sys.country}`;
  temp.innerHTML = `Temperature: ${((data.main.temp-32) * (5/9)).toFixed(2)}°C`;
  date.innerHTML = `Date: ${newDate}`;
  content.innerText = `Extra Details:  Weather: ${data.weather[0].description}
  Humidity: ${data.main.humidity}%
  Pressure: ${data.main.pressure}Pa`;
}
