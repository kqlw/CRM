function applicationAddEventOnClick(applicationsTable_data) 
{
    Array.from(applicationsTable_data).forEach(el => {
        
        el.onclick = function()
        {
            let applicationID = el.firstElementChild.textContent
          
            let application_ID = document.getElementById("application_ID")
            let application_PhoneNumber = document.getElementById("application_PhoneNumber")
            let application_status = document.getElementById("application_status")
            let application_dateStart = document.getElementById("application_dateStart")
            let application_dateEnd = document.getElementById("application_dateEnd")
            let application_communicationMethod = document.getElementById("application_communicationMethod")
            let application_contact = document.getElementById("application_contact")
            let application_question = document.getElementById("form_application_question")
            let application_answer = document.getElementById("application_answer")


            url = `http://127.0.0.1:8000/application?id=${applicationID}`
        
    
            fetch(url).then(r => {
                return r.json()
            }).then(answer => {

                console.log(answer);
                
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
                if(getData.status == "open")
                {
                    application_answer.hidden = true    
                }
                else
                {
                    application_answer.hidden = false    
                    application_answer.value = getData.answer
                }            
            })
        }
        
    });
}


let hidden_PhoneNumber = document.getElementById("hidden_PhoneNumber")
let btn_CrateApplication = document.getElementById("btn_CrateApplication")


let communicationMethod = document.getElementsByName("communicationMethod")
let application_question = document.getElementById("application_question")

let table_application = document.getElementById("table_application")

btn_CrateApplication.onclick = function()
{
    let url = "http://127.0.0.1:8000/application/create"

    const csrftoken = getCookie('csrftoken');

    let contact
    let selectedCommunicationMethod



    console.log(communicationMethod);
    
    
    communicationMethod.forEach(el => {
        if(el.checked)
        {
            if(el.id == "radio_communicationMethod_phone")
            {   
                contact = document.getElementById("inputArea_communicationMethod_phone").value 
                selectedCommunicationMethod= "Телефон"
            }
            else if(el.id == "radio_communicationMethod_sms")
            {
                contact = document.getElementById("inputArea_communicationMethod_sms").value 
                selectedCommunicationMethod= "SMS"
            }
            else if(el.id == "radio_communicationMethod_email")
            {
                contact = document.getElementById("inputArea_communicationMethod_email").value 
                selectedCommunicationMethod= "email"
            }
        }
        
        
    })

    console.log(selectedCommunicationMethod, contact);

    let data = 
    {
        phoneNumber: hidden_PhoneNumber.value,
        question: application_question.value,
        communicationMethod: selectedCommunicationMethod,
        contact: contact
    }
    
    
    
    fetch(url, {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json;charset=utf-8',
            'X-CSRFToken': csrftoken
        },

        body: JSON.stringify(data)

    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();

    }).then(responseData => {
        table_application.innerHTML = `
        <table class="table" id = "table_application">
            <tr>
                <th class="table_head">ID</th>
                <th class="table_head">Дата начала</th>
                <th class="table_head">Дата окончания</th>
                <th class="table_head">Статус</th>
            </tr>

        </table>
        `
        let applicationStatus
        responseData.data.forEach(el => {

            if(el.status == "open") {applicationStatus = "открыта"}
            else {applicationStatus = "закрыта"}


            table_application.innerHTML +=
            `
            <tr class="applicationsTable_data"> 
                <td>${el.id}</td>
                <td>${dateFormatter(el.dateStart)}</td>
                <td>${dateFormatter(el.dateEnd)}</td>
                <td>${applicationStatus}</td>

            </tr>
            ` 
        })

        applicationAddEventOnClick(table_application)
    }) 
}


       
