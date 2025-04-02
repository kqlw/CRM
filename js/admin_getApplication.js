function dateFormatter(d)
{
    const date = new Date(d);

    const options = {
    day: 'numeric',       // день числами (12)
    month: 'long',        // месяц полностью (марта)
    year: 'numeric',      // год (2025)
    hour: '2-digit',      // часы (06)
    minute: '2-digit',    // минуты (00)
    timeZone: 'UTC'       // указываем UTC,
    }
    
    const formatter = new Intl.DateTimeFormat('ru-RU', options);

    return formatter.format(date)
};

let getApplication = document.getElementById("getApplication")

let getApplication_btnSave = document.getElementById("getApplication_btnSave")

let getApplication_btnCancel = document.getElementById("getApplication_btnCancel")

let btn_findApplication = document.getElementById("btn_findApplication")

// ------------------------------------------------
let application_ID = document.getElementById("application_ID")

let application_PhoneNumber = document.getElementById("application_PhoneNumber")

let application_status = document.getElementById("application_status")

let application_dateStart = document.getElementById("application_dateStart")

let application_dateEnd = document.getElementById("application_dateEnd")

let application_communicationMethod = document.getElementById("application_communicationMethod")

let application_contact = document.getElementById("application_contact")

let application_question = document.getElementById("application_question")

let application_answer = document.getElementById("application_answer")
// ------------------------------------------------



let inputArea_applicationID = document.getElementById("inputArea_applicationID")



btn_findApplication.onclick = function()
{
    url = `http://127.0.0.1:8000/application?id=${inputArea_applicationID.value}`
    

    fetch(url).then(r => {
        return r.json()
    }).then(answer => {
        getApplication.hidden = false
        console.log(answer);
        let getData = answer.data

        application_ID.value = getData.id
        application_status.value = getData.status
        
        application_PhoneNumber.value = getData.phoneNumber

        application_dateStart.value = dateFormatter(getData.dateStart)
        application_dateEnd.value = dateFormatter(getData.dateEnd)
        
        application_communicationMethod.value = getData.communicationMethod
        application_contact.value = getData.contact
        
        application_question.value = getData.question
        application_answer.value = getData.answer
    })

}

getApplication_btnSave.onclick = function()
{

    url = `http://127.0.0.1:8000/application`

    data = {
        "id" : application_ID.value,
        "answer" : application_answer.value,
        "status" : application_status.value,
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
    
    getApplication.hidden = true

}


getApplication_btnCancel.onclick = function()
{
    getApplication.hidden = true
}