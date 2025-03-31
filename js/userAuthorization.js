function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


let sms_password = 0

let btn_GetPassword = document.getElementById('btn_GetPassword')
let phoneNumber = document.getElementById('phoneNumber')



btn_GetPassword.onclick = function()
{
    sms_password = Math.floor( Math.random()*1000000) 
    alert(sms_password)
    console.log(sms_password)
}


let btn_authorization = document.getElementById('btn_authorization')
let inputArea_password = document.getElementById('inputArea_password')


btn_authorization.onclick = function()
{
    input_password =  inputArea_password.value

    if(input_password == sms_password && phoneNumber.value != '7')
    {
        const currentUrl = "http://127.0.0.1:8000/";

        const csrftoken = getCookie('csrftoken');

        fetch(currentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber.value
            })
        }).then(response => {
            if (response.ok)
            {
                window.location.href = "http://127.0.0.1:8000/lk"
            }
        })
        
    }
    else
    {
        alert("Неврно введён номер телефона(+7XXXXXXXXXX) или пароль!")
    }
}