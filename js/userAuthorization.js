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

    if(input_password == sms_password && phoneNumber.value != '+7')
    {
        console.log(true)
        // window.location.href = "http://127.0.0.1:8000/lk"
    }
    else
    {
        alert("Неврно введён номер телефона(+7XXXXXXXXXX) или пароль!")
    }
}