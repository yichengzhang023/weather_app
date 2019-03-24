const weatherForm = document.querySelector('form')
const query = document.querySelector('input')
const errorMessage = document.getElementById('errorMessage')
const messageTwo = document.getElementById('weatherMessage')

const getDate = () =>{
    var date = new Date()
    document.getElementById("date").innerHTML = date.toString()
}

const changeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1)
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
                errorMessage.textContent = 'Weather in: ' + changeFirstLetter(data.location)
                messageTwo.textContent = 'The Temperature for now is: ' + data.temperature + ' '+String.fromCharCode(176) + 'C'
            }

        })
    })
})