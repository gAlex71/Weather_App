const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

const apikey = '3265874a2c77ae4a04bb96236a642d2f'

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

async function getWeatherBycity(city){
    const response = await fetch(url(city), {
        origin: 'cors'
    })
    const respData = await response.json()

    addWeatherToPage(respData)

    // console.log(respData, KtoC(respData.main.temp));
}

function addWeatherToPage(data){
    const temp = KtoC(data.main.temp)

    const weather = document.createElement('div')
    weather.classList.add('weather')

    weather.innerHTML = `
        <h2>
            <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"/>
             ${temp}C
        </h2>
        <small>${data.weather[0].main}</small>
    `

    main.innerHTML = ''
    main.appendChild(weather)
}

function KtoC(K){
    // return (K - 273.15).toFixed(2)
    return Math.floor(K - 273.15)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const city = search.value

    if(city){
        getWeatherBycity(city)
    }
})