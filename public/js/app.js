console.log('Client Side JS File is successfully loaded')



const weatherForm =   document.querySelector('form')
const search =   document.querySelector('input')
const messageOne =   document.querySelector('#message-1')
const messageTwo =   document.querySelector('#message-2')
messageOne.textContent = ''

weatherForm.addEventListener('submit', (event)=> {
    event.preventDefault()
    const location = search.value
   // console.log(location)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location)
    .then(res => res.json())
    .then((data)=> {
    if(data.error){
        messageOne.textContent = data.error;
     //   console.log(data.error)
    }else{

        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast
        // console.log('Location',data.location)
        // console.log('Forecast',data.forecast)
    }
})

})