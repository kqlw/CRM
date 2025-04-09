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
        
    });
}


window.addEventListener('load', function() {
    
    let applicationsTable_data = this.document.getElementsByClassName("applicationsTable_data")

    applicationAddEventOnClick(applicationsTable_data)

    console.log(applicationsTable_data);

});



let getApplication_btnCancel = document.getElementById("getApplication_btnCancel")
let getApplication = document.getElementById("getApplication")

getApplication_btnCancel.onclick = function()
{
    getApplication.hidden = true
}