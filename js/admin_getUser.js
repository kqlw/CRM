function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

let getUser = document.getElementById("getUser")

let getUser_btn_save = document.getElementById("getUser_btn_save")
let getUser_btn_cancel = document.getElementById("getUser_btn_cancel")



let inputArea_userPhone = document.getElementById("inputArea_userPhone")

let btn_findUser = document.getElementById("btn_findUser")



// ===================

let getData_surname = document.getElementById("getData_surname")
let getData_name = document.getElementById("getData_name")
let getData_patronymic = document.getElementById("getData_patronymic")
let getData_birthday = document.getElementById("getData_birthday")
let getData_passportSeries = document.getElementById("getData_passportSeries")
let getData_passportNumber = document.getElementById("getData_passportNumber")
let getData_tariff = document.getElementById("getData_tariff")



// ===================


let url = ""



btn_findUser.onclick = function()
{
    url = `http://127.0.0.1:8000/admin/lk/find_user?phoneNumber=${inputArea_userPhone.value}`
    console.log(inputArea_userPhone.value);
    
    fetch(url).then(response => {
        return response.json()
    }).then(responseData => {
        console.log(responseData);
        getUser.hidden = false
        
        getData_surname.value = responseData.data.surname
        getData_name.value = responseData.data.name
        getData_patronymic.value = responseData.data.patronymic
        getData_birthday.value = responseData.data.birthday
        getData_passportSeries.value = responseData.data.passportSeries
        getData_passportNumber.value = responseData.data.passportNumber

        getData_tariff.innerHTML = 
        `
        <option value="${responseData.data.current_tariff.id}">${responseData.data.current_tariff.name}</option>
        `

        responseData.data.allTariffs.forEach(el => {
            getData_tariff.innerHTML += 
        `
        <option value="${el.id}">${el.name}</option>
        `
        });


    })
}



getUser_btn_save.onclick = function()
{

    url = `http://127.0.0.1:8000/admin/lk/find_user?phoneNumber=${inputArea_userPhone.value}`

    data = {
        "phoneNumber": inputArea_userPhone.value,
        "surname": getData_surname.value,
        "name": getData_name.value,
        "patronymic": getData_patronymic.value,
        "birthday": getData_birthday.value,
        "passportSeries": getData_passportSeries.value,
        "passportNumber": getData_passportNumber.value,

        "current_tariff":getData_tariff.value,
    }
    const csrftoken = getCookie('csrftoken');

    fetch(url, {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRFToken': csrftoken
        },

        body: JSON.stringify(data)

    })


    getUser.hidden = true
}

getUser_btn_cancel.onclick = function()
{
    getUser.hidden = true
}