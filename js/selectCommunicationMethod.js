
let inputArea = Array.from( document.getElementsByClassName('inputArea_txt') )


function select_communicationMethod(selctedMethod)
{
    inputArea.forEach(element =>
    {
        element.disabled = true 
    })

    console.log(selctedMethod)
    selctedMethod.disabled = false
}

let radio_communicationMethod_phone = document.getElementById('radio_communicationMethod_phone')

let radio_communicationMethod_sms = document.getElementById('radio_communicationMethod_sms')

let radio_communicationMethod_email = document.getElementById('radio_communicationMethod_email')



let inputArea_communicationMethod_phone = document.getElementById('inputArea_communicationMethod_phone')

let inputArea_communicationMethod_sms = document.getElementById('inputArea_communicationMethod_sms')

let inputArea_communicationMethod_email = document.getElementById('inputArea_communicationMethod_email')



radio_communicationMethod_phone.onclick = function(){select_communicationMethod(inputArea_communicationMethod_phone)}

radio_communicationMethod_sms.onclick = function(){select_communicationMethod(inputArea_communicationMethod_sms)}

radio_communicationMethod_email.onclick = function(){select_communicationMethod(inputArea_communicationMethod_email)}


