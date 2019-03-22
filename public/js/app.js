const weatherForm = document.querySelector('form')
const query = document.querySelector('input')
const errorMessage = document.getElementById('errorMessage')
const messageTwo = document.getElementById('weatherMessage')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() //prevent refresh
    const location = query.value

    errorMessage.textContent = 'Loading ...'
    messageTwo.textContent = ''

    const searchQuery = 'http://localhost:3000/weather?search=' + location

    fetch(searchQuery).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error
            } else {
                errorMessage.textContent = 'Weather in: ' + data.location
                messageTwo.textContent = 'The Temperature for now is: ' + data.temperature
            }

        })
    })
})
