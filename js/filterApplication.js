

let inputArea_applicationDateFrom = document.getElementById("inputArea_applicationDateFrom")

let inputArea_applicationDateTo = document.getElementById("inputArea_applicationDateTo")

let inputArea_applicationStatus = document.getElementById("inputArea_applicationStatus")

let btn_filterApplication = document.getElementById("btn_filterApplication")

let table_application = document.getElementById("table_application")

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


btn_filterApplication.onclick = function()
{
    url = `http://127.0.0.1:8000/admin/lk/application_filter?dateFrom=${inputArea_applicationDateFrom.value}&dateTo=${inputArea_applicationDateTo.value}&status=${inputArea_applicationStatus.value}`

    
    fetch(url, {}).then(response => {
        return response.json()
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
            <tr>
                <td>${el.id}</td>
                <td>${dateFormatter(el.dateStart)}</td>
                <td>${dateFormatter(el.dateEnd)}</td>
                <td>${applicationStatus}</td>

            </tr>
            `

            
        });
    })

     
    // console.log(inputArea_applicationDateFrom.value);
    

}
