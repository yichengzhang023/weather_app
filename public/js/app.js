const weatherForm = document.querySelector('form')
const query = document.querySelector('input')
const errorMessage = document.getElementById('errorMessage')
const messageTwo = document.getElementById('weatherMessage')
const weathericon = {
    "clear-day": "far fa-sun",
    'clear-night': "far fa-moon",
    'rain': "fas fa-umbrella",
    'snow': "far fa-snowfake",
    "sleet": "fas fa-cloud-rain",
    "wind": "fas fa-wind",
    "fog": "fas fa-smog",
    "cloudy": "fas fa-cloud",
    "partly-cloudy-day": "fas fa-cloud-sun",
    "partly-cloudy-night": "fas fa-cloud-moon",
    "hail": "fas fa-icicles",
    "thunderstorm": "fas fa-bolt",
    "tornado": "fas fa-house-damage"
}



const convertLocation = (string) => {
    const location = string.split(',')[0]
    return location.charAt(0).toUpperCase() + location.slice(1)
}

const convertPercentage = (float) => {
    return Math.round(float * 100, 2)

}

const uvIndexColor = (uvIndex) => {
    switch (true) {
        case uvIndex >= 0 && uvIndex < 3:
            break;
        case uvIndex >= 3 && uvIndex < 6:
            document.getElementById("uv").style = "background-color: #f7df0c"
            break;
        case uvIndex >= 6 && uvIndex < 8:
            document.getElementById("uv").style = "background-color: #FF9800"
            break;
        case uvIndex >= 8 && uvIndex < 11:
            document.getElementById("uv").style = "background-color: #F44336"
            break;
        default:
            document.getElementById("uv").style = "background-color: #7e1390"
            break;
    }
}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() //prevent refresh
    const location = query.value

    errorMessage.textContent = 'Loading ...'
    messageTwo.textContent = ''

    const searchQuery = '/weather?search=' + location

    fetch(searchQuery).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMessage.textContent = changeFirstLetter(data.error)
            } else {
                if (document.getElementById('noticeBox')) {
                    document.getElementById('noticeBox').remove()
                }
                document.getElementById("detail").style.visibility = "visible"
                errorMessage.textContent = convertLocation(data.summary) + ' in ' + convertLocation(data.location)
                messageTwo.textContent = 'The Temperature for now is: ' + data.temperature + ' ' + String.fromCharCode(176) + 'C'
                document.getElementById("loc").textContent = data.location
                document.getElementById("uv").textContent = data.uvIndex
                document.getElementById("icon").className = weathericon[data.icon]
                document.getElementById("hum").textContent = convertPercentage(data.humidity) + "%"
                document.getElementById("rain").textContent = convertPercentage(data.probability_to_rain) + "%"
                uvIndexColor(data.uvIndex)
            }

        })
    })
})