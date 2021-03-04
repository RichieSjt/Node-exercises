const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const responseOneMessage = document.querySelector('#response')
const responseTwoMessage = document.querySelector('#error')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = search.value
    const url = 'http://localhost:3000/weather?address=' + encodeURI(location)
    
    responseOneMessage.textContent = 'Loading...'
    responseTwoMessage.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                return responseOneMessage.textContent = data.error
            }
            responseOneMessage.textContent = data.location
            responseTwoMessage.textContent = data.forecast  
        })
    })

})